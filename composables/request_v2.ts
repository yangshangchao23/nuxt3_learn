// import { ProxyAgent, setGlobalDispatcher } from 'undici'

import log from '~/server/middleware/log'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

// 所有请求代理
// const proxyAgent = new ProxyAgent('http://localhost:3000')
// setGlobalDispatcher(proxyAgent)
// const data = await ofetch("https://icanhazip.com");

let baseURL: string = ''
const createFetchRequest = (
  reqUrl: string,
  method: HttpMethod,
  data?: any,
  reqOpts?: any
) => {
  console.log('createFetchRequest-opts', data, reqOpts)
  const {
    public: { API_BASE_DEV, API_BASE_PROD },
  } = useRuntimeConfig()
  baseURL = process.env.NODE_ENV === 'production' ? API_BASE_PROD : API_BASE_DEV
  return $fetch(reqUrl, {
    method,
    body: data,
    timeout: 3000, // Timeout after 3 seconds
    baseURL,
    // retry: 1, // default for retry is 1 retry. 发生请求错误时，请求重试次数  except for POST, PUT, PATCH, and DELETE methods where ofetch does not retry. If you set a custom value for retry it will always retry for all requests.
    // retryDelay: 500, // default for retryDelay is 0 ms.  发起重试请求 时间间隔
    // 请求拦截器
    async onRequest({ request, options }) {
      // 常用：在这里做修改请求头特殊处理
      options.headers = {
        ...options.headers,
        // Authorization: `Bearer ${yourToken}`,
        'Content-Type': 'application/json',
        token: '',
        'X-Requested-With': 'XMLHttpRequest',
        // ...reqOpts?.headers,
      }
      // options = { ...options, ...reqOpts }
      if (reqOpts) {
        Object.assign(options, reqOpts) // 将 reqOptions 的所有属性合并到 options 中
      }
      // request--> /rest/getSysConfigByKey/server.register.simple 接口文件传的相对url
      // options--> 当前所有请求配置 包括onRequest这些拦截器，就是 reqUrl, 后的{}
      console.log('[fetch request]', request, options)
    },
    // 请求错误拦截器（处理）
    async onRequestError({ request, options, error }) {
      // request--> 请求接口完整（绝对）url  https://chattax.yunhelp.com:883/server/rest/getSysConfigByKey/server.register.simple
      // error--> 一个err对象，断网场景 AbortError: signal is aborted without reason
      // error--> 一个err对象，写错接口路径（特意改/部分）  TypeError: Failed to fetch
      // 以上两种场景直接在request拦截，都不会到response拦截器
      // todo:为什么以上两种场景会触发两次onRequest和onRequestError拦截器？  组件中使用了useAsyncData还是会这样，这是ofetch的特性？
      console.log('[fetch request error]', request, error)
      // 可以在此处添加错误处理逻辑，例如重试请求或显示错误消息
      // 重试请求可以配置 retry属性
      // 由于这里请求错误会触发两次拦截器，提示弹窗会出现两次。有两个方案解决，1.onRequestError拦截器中 加一行代码 拒绝 Promise，避免重复触发  2.$fetch().catch()函数中处理
      ElMessage.error(error.message)
      // error.message--> 断网场景 signal is aborted without reason
      // error.message--> 写错接口路径（特意改/部分） Failed to fetch
      return Promise.reject(new Error(error.message)) // 请求错误提示 方案1：拒绝 Promise，避免重复触发
      // return Promise.reject(new Error('请求有问题！'))

      // 扩展 error是个什么？里面有哪些属性
      // interface FetchError<T = any> extends Error {
      //   type: string  // 错误类型，通常为 "fetch_error"
      //   status: number  //  HTTP 状态码
      //   statusText: string // 状态码对应的文本描述
      //   response?: Response //原始的 Response 对象
      //   data?: T // 服务器返回的错误数据（如果有的话）
      // }
      // 打印经常包含以下信息
      // {
      //   type: 'fetch_error',
      //   status: 404,
      //   statusText: 'Not Found',
      //   response: Response { ... },
      //   data: { error: 'Not found' },
      //   message: 'Not Found'
      // }
    },
    // 响应拦截器
    async onResponse({ request, response, options }) {
      console.log('[fetch response]', request, response)
      // 状态码非200的处理逻辑
      if (response.status !== 200) {
        // 响应错误处理
        handleResponseError(response)
      }
      // 响应成功,返回数据-data结构
      return response
    },
    // 响应错误拦截器（处理）
    async onResponseError({ request, response, options }) {
      console.log('[fetch response error]', request, response)
      // 根据返回的状态码，跳转对应404 403 500 页面
      handleResponseError(response)
    },
  }).catch((error) => {
    // console.log(error, '请求错误啦')
    // console.log('catch-Error类型', typeof error)
    // 请求错误提示方案2：在这里做请求错误处理，比如弹窗提示
    // ElMessage.error(error.message)
    // 扩展：error是个什么？里面有哪些属性
    //error 对象的主要属性
    // message: 错误的描述信息，通常是一个字符串，描述了错误的具体情况。
    // name: 错误的名称，通常为 "FetchError"。
    // type: 错误的类型，可能是 "fetch_error" 或其他类型，具体取决于错误的来源。
    // status: HTTP 状态码（如果适用），例如 404、500 等。
    // statusText: 状态码对应的文本描述，例如 "Not Found"。
    // response: 原始的 Response 对象（如果有的话），可以用于获取更多的响应细节。
    // data: 服务器返回的错误数据（如果有的话）
  })
}

const handleResponseError = (res: any) => {
  console.log('handleResponseError', res)
  // 跳转401需登录
  // router.push(`/login?callback=${route.path}`)
  // 跳转403 404 500页面等逻辑
  // if (res) {
  return
  // }
  // 状态码非403 404 500直接弹窗提示
  ElMessage.error(res.message)
}

export const serviceV2 = {
  get: (reqUrl: string, reqOpts?: any) => {
    return createFetchRequest(reqUrl, 'GET', undefined, reqOpts)
  },
  post: (reqUrl: string, data?: any) => {
    return createFetchRequest(reqUrl, 'POST', data)
  },
  put: (reqUrl: string) => {
    return createFetchRequest(reqUrl, 'PUT')
  },
  delete: (reqUrl: string) => {
    return createFetchRequest(reqUrl, 'DELETE')
  },
}

// 触发对应拦截器的场景时机，状态码的解释
// https://www.perplexity.ai/search/shi-yao-qing-kuang-xia-huo-zhe-JhzYyH57QEG985fAFVBmNQ

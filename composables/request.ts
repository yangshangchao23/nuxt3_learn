// $fetch请求封装--交互
// $fetch 可以根据用户交互进行网络请求。
// useAsyncData 结合 $fetch，提供了更精细的控制。

// import { $fetch } from 'ofetch';
// import { useRuntimeConfig } from '#app';

// $fetch https://nuxt.com.cn/docs/api/utils/dollarfetc
// $fetch基于ofetch库封装 https://github.com/unjs/ofetch
// ofetch 库是基于 Fetch API 构建的，https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

let baseURL: string = ''

if (import.meta.client) {
  const {
    public: { API_BASE_DEV, API_BASE_PROD },
  } = useRuntimeConfig()
  baseURL = process.env.NODE_ENV === 'production' ? API_BASE_PROD : API_BASE_DEV
}

interface RequestOptions {
  customBaseURL?: string
  [key: string]: any
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

// 请求拦截器
function handleRequest(options: RequestOptions) {
  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    token: '',
    'X-Requested-With': 'XMLHttpRequest',
  }
  options.timeout = 60000
  options.baseURL = baseURL
  // console.log(options, 'options--handleRequest')
}

// 响应拦截器
function handleResponse(response: any) {
  if (response.code !== 200) {
    console.log(response, 'response')
    return ElMessage.error(`${response.message}, ${response.data}`)
  }
  if (response.error) {
    throw new Error(response.error.message || '响应错误')
  }
  return response
}

/**
 *
 * @param method
 * @returns
 */

function createFetchRequest(method: HttpMethod) {
  return async function (
    url: string,
    data?: any,
    options: RequestOptions = {}
  ) {
    // const {
    //   public: { API_BASE_DEV, API_BASE_PROD },
    // } = useRuntimeConfig()

    // const baseURL =
    //   process.env.NODE_ENV === 'production' ? API_BASE_PROD : API_BASE_DEV
    // console.log(url, 'url') // /rest/getSysConfigByKey/server.register.simple
    // console.log(options, 'options')

    // 方案1：Node.js 中使用 URL 构造函数可以创建一个新的 URL 对象 new URL(input[, base]),来整合请求url
    // const requestUrl = new URL(url, options.customBaseURL || baseURL).toString()
    // /server被去掉的原因 在 Node.js 中使用 URL 构造函数可以创建一个新的 URL 对象  https://tongyi.aliyun.com/qianwen?st=null&sessionId=25f56d381f5f4744ac77ffbf251cde71
    // console.log(baseURL, 'baseURL') // https://chattax.yunhelp.com:883/server baseURL
    // console.log(requestUrl, 'request') // https://chattax.yunhelp.com:883/rest/getSysConfigByKey/server.register.simple  '/server不见了'

    // 方案2：直接拼接url,来整合请求url
    // 为什么这里的options.baseURL 是undefined,这里的options是以封装的接口传参所定？
    const requestUrl = options.baseURL || baseURL + url
    // console.log(requestUrl, 'requestUrl')

    try {
      handleRequest(options)
      const response = await $fetch(requestUrl, {
        method,
        body: data,
        ...options,
      })
      console.log(options, 'options--$fetchAPI')
      return handleResponse(response)
    } catch (error) {
      console.error('请求错误:', error)
      throw error
    }
  }
}

// 提供 $fetch & HTTP 方法 - 统一管理请求 - 再到组件中使用
export const service = {
  get: createFetchRequest('GET'),
  post: createFetchRequest('POST'),
  put: createFetchRequest('PUT'),
  delete: createFetchRequest('DELETE'),
}

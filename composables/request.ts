// $fetch请求封装--交互
// $fetch 可以根据用户交互进行网络请求。
// useAsyncData 结合 $fetch，提供了更精细的控制。

// import { $fetch } from 'ofetch';
// import { useRuntimeConfig } from '#app';

const {
  public: { API_BASE_DEV, API_BASE_PROD },
} = useRuntimeConfig()
const baseURL =
  process.env.NODE_ENV === 'production' ? API_BASE_PROD : API_BASE_DEV

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
  console.log(options, 'options--handleRequest')
}

// 响应拦截器
function handleResponse(response: any) {
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
    console.log(url, 'url') // /rest/getSysConfigByKey/server.register.simple
    console.log(options, 'options')

    // 方案1：Node.js 中使用 URL 构造函数可以创建一个新的 URL 对象 new URL(input[, base]),来整合请求url
    // const requestUrl = new URL(url, options.customBaseURL || baseURL).toString()
    // /server被去掉的原因 在 Node.js 中使用 URL 构造函数可以创建一个新的 URL 对象  https://tongyi.aliyun.com/qianwen?st=null&sessionId=25f56d381f5f4744ac77ffbf251cde71
    console.log(baseURL, 'baseURL') // https://chattax.yunhelp.com:883/server baseURL
    // console.log(requestUrl, 'request') // https://chattax.yunhelp.com:883/rest/getSysConfigByKey/server.register.simple  '/server不见了'

    // 方案2：直接拼接url,来整合请求url
    const requestUrl = options.customBaseURL || baseURL + url

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

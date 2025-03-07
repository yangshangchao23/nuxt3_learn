import type { FetchResponse } from 'ofetch'
// import Message from '@/components/Message' // 自定义封装的message

export interface ResOptions<T> {
  code: number
  data: T
  msg: string
}

/**
 * 定义request response 错误类型
 */
export enum ResponseStatusCodes {
  SUCCESS = 200,
  TOKEN_EXPIRATION = 401,
  CUSTOM = 4096,
  ERROR = 500,
}

/**
 * message全局提示信息
 * @param text
 */
const err = (text: string) => {
  // Message.error({
  //   text: text,
  //   duration: 1500,
  // })
  ElMessage.error(text)
}

/**
 * 清除登录信息
 */
const clearLoginInfo = () => {
  // storeToRefs(useAuthStore()).token.value = '';
}

/**
 * 处理请求错误
 * @param response
 */
const handleFail = <T>(
  response: FetchResponse<ResOptions<T>> & FetchResponse<ResponseType>
) => {
  err('网络服务异常，请重新加载或联系客服')
  return Promise.reject(new Error('网络服务异常，请重新加载或联系客服'))
}

/**
 * 处理请求异常
 * @param response
 */
const handleResponse = <T>(
  response: FetchResponse<ResOptions<T>> & FetchResponse<ResponseType>
): any => {
  // 500错误
  if (response._data?.code === ResponseStatusCodes.ERROR) {
    err('网络服务异常，请重新加载或联系客服')
    return Promise.reject(new Error('网络服务异常，请重新加载或联系客服'))
  }
  // 401
  if (response._data?.code === ResponseStatusCodes.TOKEN_EXPIRATION) {
    clearLoginInfo()
    return Promise.reject(new Error('登录失效，请重新登录'))
  }
  // 后端自定义错误
  if (response._data?.code === ResponseStatusCodes.CUSTOM) {
    err(response._data.msg)
    return Promise.reject(new Error(response._data.msg))
  }
}

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  // console.log(runtimeConfig, 'defineNuxtPlugin')
  const {
    public: { API_BASE_DEV, API_BASE_PROD },
  } = runtimeConfig
  const baseURL =
    process.env.NODE_ENV === 'production' ? API_BASE_PROD : API_BASE_DEV

  const myFetch = $fetch.create({
    // 请求拦截器
    onRequest({ options }) {
      options.baseURL = baseURL
      options.headers = new Headers(options.headers)
      // token.value && options.headers.set('token', token.value);
      options.headers.set('platform', '11')
      options.headers.set('c-fronted', 'c-fronted-identify')
      options.headers.set('X-Requested-With', 'XMLHttpRequest')
      options.headers.set('Content-type', 'application/json')
    },
    // 响应拦截
    onResponse({ response }): any {
      // console.log(response, 'onResponse-myfetch1111')

      // console.log(response._data, 'onResponse-myfetch')
      // 在这里判断错误
      if (response.status !== ResponseStatusCodes.SUCCESS) {
        return handleFail(response)
      }
      // 成功返回
      // 成功返回

      if (response._data?.code === ResponseStatusCodes.SUCCESS) {
        response._data = response._data.data
        // console.log('hrere', response._data)
      } else {
        // console.log('here')

        return handleResponse(response)
      }
    },
    // 错误处理
    onResponseError({ response }) {
      return handleFail(response)
    },
  })
  return {
    provide: { myFetch },
  }
})

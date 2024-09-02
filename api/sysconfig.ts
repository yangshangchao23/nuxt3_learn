import { service } from '~/composables/request'

// 是否开启简易注册模式(true启用登录注册版本2)
export const getRegisterSimple = () => {
  // 方案1： const requestUrl = new URL(url, options.customBaseURL || baseURL).toString()
  // return service.get('/server/rest/getSysConfigByKey/server.register.simple')
  // 下面这样写/server会被去掉
  // return service.get('rest/getSysConfigByKey/server.register.simple')
  // 因为 request.ts的请求URL
  // const requestUrl = new URL(url, options.customBaseURL || baseURL).toString()
  // 所以要这样写才正确
  // return service.get('server/rest/getSysConfigByKey/server.register.simple')

  // 方案2：直接拼接url,来整合请求url
  //  const requestUrl = baseURL + url
  return service.get('/rest/getSysConfigByKey/server.register.simple')
}

// 判断机器人id是否存在
export const doLoginRest = (params: any) => {
  return service.post('/rest/login', { ...params, clientType: '1' })
}

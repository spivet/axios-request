import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestConfig, ResData } from './types'
import resIntercept from './interceptor/response'
import reqIntercept from './interceptor/request'

const defaultConfig: RequestConfig = {
  baseURL: '/',
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  messager(msg: string) {
    console.log(msg)
  }
}
class Request {
  instance: AxiosInstance

  constructor(config: RequestConfig = defaultConfig) {
    this.instance = axios.create(config)
    reqIntercept(this.instance)
    resIntercept(this.instance)
  }

  get(url: string, params?: any, config?: RequestConfig) {
    return this.instance.get<string, ResData>(url, {
      params,
      ...config
    })
  }
  post(url: string, data?: any, config?: RequestConfig) {
    return this.instance.post<string, ResData>(url, data, config)
  }
}

export default Request

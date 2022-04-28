import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { RequestConfig } from './types'
import resIntercept from './interceptor/response'
import reqIntercept from './interceptor/request'

const defaultConfig: RequestConfig = {
  baseURL: '/',
  timeout: 30 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
}
class Request {
  instance: AxiosInstance
  // private messager(msg: string): void

  constructor(config: RequestConfig = defaultConfig) {
    this.instance = axios.create(config)
    // this.messager = config.messager || 
    reqIntercept(this.instance)
    resIntercept(this.instance)
  }
  // private _message() {
  //   this.messager()
  // }
  get(url: string, config: RequestConfig) {
    return this.instance.get(url, config)
  }
  post(url: string, config: RequestConfig) {
    return this.instance.post(url, config)
  }
}

export default Request

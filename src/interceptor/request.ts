import type { AxiosInstance } from 'axios'
import type { RequestConfig } from '../types'

function beforeRequest(config: RequestConfig): RequestConfig {
    return config
}

function requestError(err: Error) {
    return Promise.reject(err)
}

export default function reqIntercept(instance: AxiosInstance) {
    instance.interceptors.request.use(
        (config: RequestConfig) => beforeRequest(config),
        (err: Error) => requestError(err)
    )
}
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import type { ResData, RequestConfig } from '../types'
import ResponseStatus from '../status'

function responseSuccess(res: AxiosResponse): any {
    const resData = (res.data) as ResData
    const { onLoginExpired, onResponseError } = (res.config) as RequestConfig
    if (resData.status === ResponseStatus.SUCCESS) {
        return Promise.resolve(resData)
    }
    if (resData.status === ResponseStatus.TOKEN_EXPIRED || resData.status === ResponseStatus.TOKEN_UNAUTHORIZED) {
        // 登录失效
        onLoginExpired && onLoginExpired(resData)
        return Promise.reject()
    }
    // 其它类型错误
    onResponseError && onResponseError(new Error(resData.msg))
    return Promise.reject(new Error(resData.msg))
    
}

function responseError(error: AxiosError) {
    const { onResponseError } = (error.config) as RequestConfig
    console.log('axios-----', error)
    Promise.reject(error)
}

export default function resIntercept(instance: AxiosInstance) {
    instance.interceptors.response.use(
        (res) => responseSuccess(res),
        (err) => responseError(err)
    )
}

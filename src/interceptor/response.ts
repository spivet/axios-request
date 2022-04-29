import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import type { ResData, ResError, RequestConfig} from '../types'
import ResponseStatus from '../status'

function responseSuccess(res: AxiosResponse): any {
    const resData = (res.data) as ResData
    const { messager, onLoginExpired, onResponseError } = (res.config) as RequestConfig
    if (resData.status === ResponseStatus.SUCCESS) {
        return Promise.resolve(resData)
    }
    if (resData.status === ResponseStatus.TOKEN_EXPIRED || resData.status === ResponseStatus.TOKEN_UNAUTHORIZED) {
        // 登录失效
        onLoginExpired?.(resData)
        return Promise.reject(resData)
    }
    // 其它类型错误
    const resError: ResError = new Error(resData.msg)
    resError.data = resData
    onResponseError?.(resError) || messager?.(resError.data.msg)

    return Promise.reject(resError)
    
}

function responseError(error: AxiosError) {
    const { messager, onResponseError } = (error.config) as RequestConfig
    onResponseError?.(error) || messager?.(error.message)
    Promise.reject(error)
}

export default function resIntercept(instance: AxiosInstance) {
    instance.interceptors.response.use(
        (res) => responseSuccess(res),
        (err) => responseError(err)
    )
}

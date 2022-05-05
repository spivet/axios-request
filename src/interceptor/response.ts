import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import type { ResData, ResSuccessError, RequestConfig} from '../types'
import ResponseStatus from '../status'

function createResSuccessError(resData: ResData): ResSuccessError {
    const resError = (new Error(resData.msg)) as ResSuccessError
    resError.data = resData
    return resError
}

function responseSuccess(res: AxiosResponse): any {
    const resData = (res.data) as ResData
    if (resData.status === ResponseStatus.SUCCESS) {
        return Promise.resolve(resData)
    }
    if (resData.status === ResponseStatus.TOKEN_EXPIRED || resData.status === ResponseStatus.TOKEN_UNAUTHORIZED) {
        // 登录失效
        const { onLoginExpired } = (res.config) as RequestConfig
        onLoginExpired?.(resData)
        return Promise.reject(resData)
    }
    // 其它类型错误
    const resError = createResSuccessError(resData)
    const { messager, onResponseError } = (res.config) as RequestConfig
    onResponseError
        ? onResponseError(resError)
        : messager?.(resError.data.msg)

    return Promise.reject(resError)
    
}

function responseFailed(error: AxiosError) {
    const { messager, onResponseError } = (error.config) as RequestConfig
    onResponseError
        ? onResponseError(error)
        : messager?.(error.message)
    return Promise.reject(error)
}

export default function resIntercept(instance: AxiosInstance) {
    instance.interceptors.response.use(
        (res) => responseSuccess(res),
        (err) => responseFailed(err)
    )
}

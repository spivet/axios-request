import type { AxiosRequestConfig } from 'axios'

export interface ResData {
    data: any,
    msg: string,
    status: number
}

export interface RequestConfig extends AxiosRequestConfig {
    messager?(msg: string): void
    onResponseError?(err: Error | ResData): void
    onLoginExpired?(res: ResData): void
}
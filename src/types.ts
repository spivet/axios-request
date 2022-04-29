import type { AxiosRequestConfig, AxiosError } from 'axios'

export interface ResData {
    data: any,
    msg: string,
    status: number
}

export interface ResError extends Error {
    data?: ResData
}

export interface RequestConfig extends AxiosRequestConfig {
    messager?(msg: string): void
    onResponseError?(err: Error | AxiosError | ResData): void
    onLoginExpired?(res: ResData): void
}
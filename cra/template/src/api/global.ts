import { axios } from '@/lib/fetch'
import { GlobalState } from '@/store/global'
import { Pagination } from '@/store/table'

export interface LoginReq {
    phone: string
    smsCode: string
}

export interface LoginRes {
    token: string
}

export type SendSmsReq = Pick<LoginReq, 'phone'>

export interface filterReq extends Omit<Pagination, 'total'> {
    [propName: string]: any
}

export const globalApi = {
    login(payload: LoginReq) {
        return axios.post<LoginRes>('/login', payload)
    },
    sendSms(payload: SendSmsReq) {
        return axios.post('/sms', payload)
    },
    authorize() {
        return axios.get<GlobalState>('/authorize')
    },
    fetchTableDataSource: <T extends unknown>(url: string, params: any) =>
        axios.get<{
            total: number
            data: T[]
        }>(url, {
            params
        })
}

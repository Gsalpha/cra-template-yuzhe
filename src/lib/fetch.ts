import AXIOS from 'axios'
import { getToken } from './index'

export const axios = AXIOS.create({
    baseURL:
        process.env.NODE_ENV === 'development'
            ? process.env.REACT_APP_FETCH_URL
            : '/api',
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
})
axios.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
})
axios.interceptors.response.use(
    res => res,
    error => {
        const { response } = error

        if (response && +response.status === 401) {
            localStorage.removeItem('token')
            if (window.location.pathname !== '/login') {
                window.location.href = '/login'
                return
            }
            return
        }
        if (!response || !response.data || !response.data.message) {
            return Promise.reject({ message: 'Server Internal Error' })
        }
        return Promise.reject({ message: response.data.message })
    }
)

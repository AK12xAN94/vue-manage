import axios from "axios";
import config from '../config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    constructor() {
        this.baseUrl = baseUrl
    }

    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }
    interceptors(instance) {
        //添加请求拦截器
        instance.interceptors.request.use((config) => {
            //请求之前需要做的
            return config
        }, (error) => {
            //对请求错误需要做的
            return Promise.reject(error)
        })

        //添加响应拦截器
        instance.interceptors.response.use((response) => {
            //对响应数据做点什么
            return response
        }, (error) => {
            return Promise.reject(error)
        })
    }

    request(options) {
        const instance = axios.create()
        options = {
            ...this.getInsideConfig(), ...options
        }
        this.interceptors(instance)
        return instance(options)
    }
}

export default new HttpRequest()
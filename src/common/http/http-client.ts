/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved. 
 */

import md5 from "md5";
import qs from "qs";
import { ISet, Set, Type, Logger, EnumUtils, InvalidOperationException } from "uxmid-core";

import { ApplicationContext } from "../../application";

import IHttpRequest from "./http-request";
import IHttpResponse from "./http-response";
import HttpResponseCode from "./http-response-code";
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { globalConfig } from "common/config";

import { formatString } from "utils";

/**
 * 提供请求服务
 */
export default class HttpClient
{
    private _handlers: ISet<(code: number, response: IHttpResponse, request: IHttpRequest) => void | Promise<void>>; // 全局响应拦截器

    private static _instance: HttpClient; // 静态单实例

    /**
     * 获取或设置全局请求配置。
     * @member
     * @returns string
     */
    public options: IHttpRequest =
    {
        // 参数序列化方式("form", "json", "form-data")。
        serializeType: "json",

        // 跨域处理
        withCredentials: false,

        // 超时时间
        timeout: globalConfig.ajaxTimeout,

        // 请求头
        headers:
        {
            ...globalConfig.ajaxCustomHeader
        },

        // 重试次数
        retryCount: 0,

        // 重试间隔
        retryInterval: 10000,

        interceptors:
        {
            request: null,          // 请求拦截器
            response: null          // 相应拦截器
        }
    };

    /**
     * 获取一个列表，包含所有全局响应处理程序(拦截器)。
     * @property
     * @param  {IHttpRequest} request
     */
    public get handlers(): ISet<(code: number, response: IHttpResponse, request: IHttpRequest) => void | Promise<void>>
    {
        if(!this._handlers)
        {
            this._handlers = new Set();
        }

        return this._handlers;
    }

    /**
     * 获取网络请求客户端的单实例。
     * @static
     * @property
     * @returns HttpClient
     */
    public static get instance(): HttpClient
    {
        if(!this._instance)
        {
            this._instance = new HttpClient();
        }
        
        return this._instance;
    }

    /**
     * 发送一个 get 请求。
     * @async
     * @param  {IHttpRequest} request 请求实例。
     * @returns Promise
     */
    public async get(request: IHttpRequest): Promise<any>
    {
        let config = this.getAxiosRequest("get", request);
        let result = await this.send(config);

        return result;
    }
    
    /**
     * 发送一个 post 请求。
     * @async
     * @param  {IHttpRequest} request 请求实例。
     * @returns Promise
     */
    public async post(request: IHttpRequest): Promise<any>
    {
        let config = this.getAxiosRequest("post", request);
        let result = await this.send(config);

        return result;
    }

    /**
     * 发送一个 put 请求。
     * @async
     * @param  {IHttpRequest} request 请求实例。
     * @returns Promise
     */
    public async put(request: IHttpRequest): Promise<any>
    {
        let config = this.getAxiosRequest("put", request);
        let result = await this.send(config);

        return result;
    }

    /**
     * 发送一个 delete 请求。
     * @async
     * @param  {IHttpRequest} request 请求实例。
     * @returns Promise
     */
    public async delete(request: IHttpRequest): Promise<any>
    {
        let config = this.getAxiosRequest("delete", request);
        let result = await this.send(config);

        return result;
    }

    /**
     * 发送一个 patch 请求。
     * @async
     * @param  {IHttpRequest} request 请求实例。
     * @returns Promise
     */
    public async patch(request: IHttpRequest): Promise<any>
    {
        let config = this.getAxiosRequest("patch", request);
        let result = await this.send(config);

        return result;
    }
    
    /**
     * 发送一个文件上传请求。
     * @async
     * @param  {IHttpRequest} request 请求实例。
     * @returns Promise
     */
    public async upload(request: IHttpRequest): Promise<any>
    {
        if(!request.files || Object.keys(request.files).length === 0)
        {
            throw new InvalidOperationException("files is empty...");
        }

        const data = new FormData();

        // append params
        for(let key in request.data)
        {
            if(request.files.hasOwnProperty(key))
            {
                const value = request.files[key];
                data.append(key, value);
            }
        }
        
        // append files
        for(let name in request.files)
        {
            if(request.files.hasOwnProperty(name))
            {
                const file = request.files[name];
                data.append("file", file, file.name);
            }
        }

        request.data = data;

        let config = this.getAxiosRequest("post", request);
        let result = await this.send(config);

        return result;
    }

    /**
     * 获取当前时间戳。
     * @returns number
     */
    private getTimestamp(): number
    {
        return Date.parse(new Date().toString());
    }

    /**
     * 根据请求携带数据生成签名。
     * @param  {Object} data 请求携带的数据。
     * @param  {string} secret 签名的密钥。
     * @param  {number} timestamp 当前时间戳。
     * @returns string
     */
    private getSign(data: Object, secret: string, timestamp: number): string
    {
        data = Object.assign({}, data, { secret: secret, timestamp: timestamp });

        // 排序后的参数键列表
        const keys = Object.keys(data).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

        let buffer = "";

        for(let key of keys)
        {
            let value = data[key];
            let valueString = Type.isArray(value) || Type.isObject(value) ? JSON.stringify(value) : value;

            buffer += `${key}=${valueString}&`;
        }

        // 去掉最后一个 '&' 符号
        buffer = buffer.substring(0, buffer.length - 1);

        return md5(buffer).toUpperCase();
    }
    
    /**
     * 根据指定的请求方式和选项生成一个 Axios 请求实例。
     * @param  {string} method 请求方式，如： 'get', 'post'。
     * @param  {IHttpRequestOptions} option 请求选项。
     * @returns AxiosRequestConfig Axios 请求实例。
     */
    private getAxiosRequest(method: any, request: IHttpRequest): AxiosRequestConfig
    {
        request.data = request.data || {};

        // 生成签名
        let secret = globalConfig.secret;
        let timestamp = this.getTimestamp();
        let sign = this.getSign(request.data, secret, timestamp);

        // 默认携带数据(暂时没有加密 暂时用不到)
        let defaults =
        {
            // secret: secret,
            // timestamp: timestamp,
            // sign: sign
        };

        // 构造url(将url中需要传入参数的地方替换掉)
        let requestUrl = Type.isUndefined(request.urlPath) ?  request.url : formatString(request.url, request.urlPath);

        // 构造url(支持请求中自定义headers)
        let requestHeader = Type.isUndefined(request.headers) ? this.options.headers : Object.assign({}, this.options.headers, request.headers);

        // 构造分页数据
        let requestQuerys = !Type.isUndefined(request.params) && request.params;

        // 构造服务器响应的数据类型。
        let responseType: any = !Type.isUndefined(request.responseType) && request.responseType;

        // 构造服务器响应的数据类型。
        let onUploadProgress: any = !Type.isUndefined(request.onUploadProgress) && request.onUploadProgress;

        // 构造服务器响应的数据类型。
        let onDownloadProgress: any = !Type.isUndefined(request.onDownloadProgress) && request.onDownloadProgress;
        
        // 请求实例
        let config: AxiosRequestConfig =
        {
            url: requestUrl,
            method: method,
            // 支持请求中自定义headers
            headers: requestHeader,
            responseType,
            params: requestQuerys,
            // 不同源请求是否携带凭证
            withCredentials: Type.isUndefined(request.withCredentials) ? this.options.withCredentials : request.withCredentials
        };

        // 若是有做鉴权token , 就给头部带上token
        if(ApplicationContext.current.credential)
        {
            config.headers["Authorization"] = "Bearer " + ApplicationContext.current.credential.credentialId;
        }
        else
        {
            const token = localStorage.getItem("token");
            token && (config.headers["Authorization"] = "Bearer " + token);
        }

        switch(method)
        {
            case "get":
            {
                config.params = Object.assign(request.data, config.params);

                break;
            }
            default:
            {
                let serializeType = !!request.serializeType ? request.serializeType : this.options.serializeType;

                if(serializeType === "form")
                {
                    config.headers["Content-Type"] = "application/x-www-form-urlencoded";

                    // config.data = qs.stringify(Object.assign({}, defaults, request.data), { arrayFormat: "indices" });
                    config.data = qs.stringify(request.data, { arrayFormat: "indices" });
                }
                else if(serializeType === "form-data")
                {
                    config.headers["Content-Type"] = "multipart/form-data";
                    // config.params = defaults;

                    let formData = new FormData();

                    let requestData = Object.assign(request.data);

                    for(let name in requestData)
                    {
                        if(requestData[name])
                        {
                            formData.append(name, request.data[name]);
                        }
                    }
                    
                    let requestFiles = request.files;

                    for(let name in requestFiles)
                    {
                        if(requestFiles[name])
                        {
                            formData.append(name, requestFiles[name]);
                        }
                    }

                    config.data = formData;
                }
                else if(serializeType === "application/x-www-form-urlencoded")
                {
                    config.headers["Content-Type"] = "application/x-www-form-urlencoded";

                    config.data = qs.stringify(request.data);
                }
                else
                {
                    config.headers["Content-Type"] = "application/json";

                    // config.data = Object.assign({}, defaults, request.data);
                    config.data = request.data;
                }

                break;
            }
        }

        // 初始化重试次数
        if(!request.retryCount)
        {
            request.retryCount = this.options.retryCount;
        }

        // 初始化重试间隔
        if(!request.retryInterval)
        {
            request.retryInterval = this.options.retryInterval;
        }

        // 设置上传进度回调函数
        if(Type.isFunction(request.onUploadProgress))
        {
            config.onUploadProgress = onUploadProgress;
        }

        // 设置下载进度回调函数
        if(Type.isFunction(request.onDownloadProgress))
        {
            config.onDownloadProgress = onDownloadProgress;
        }

        // 特意保存原始请求参数
        config["$request"] = request;

        // 请求拦截器
        // let configs = this.options.interceptors.request ? this.options.interceptors.response(config) : config;

        return config;
    }
    
    /**
     * 发送请求。
     * @param  {AxiosRequestConfig} axiosRequest Axios 请求实例。
     * @returns Promise
     */
    private async send(axiosRequest: AxiosRequestConfig): Promise<any>
    {
        return new Promise<any>((resolve, reject) =>
        {
            Axios(axiosRequest).then((axiosResponse: AxiosResponse) =>
            {
                this.onRequestComplete(axiosResponse, axiosRequest).then((content: any) =>
                {
                    resolve(content);
                })
                .catch((error: any) =>
                {
                    reject(error);
                });
            })
            .catch((error: any) =>
            {
                // 特意保存原始请求参数
                let request: IHttpRequest = axiosRequest["$request"];

                let statusCode = error.response ? error.response.status : HttpResponseCode.networkError;

                if(request.retryCount && request.retryCount > 0)
                {
                    // 自动重试处理
                    setTimeout(() =>
                    {
                        request.retryCount --;

                        this.send(axiosRequest).then((content: any) =>
                        {
                            resolve(content);
                        })
                        .catch((error: any) =>
                        {
                            this.onRequestComplete({ status: statusCode, ...error.response }, axiosRequest).catch(error =>
                            {
                                reject(error);
                            });
                        });

                    }, request.retryInterval);
                }
                else
                {
                    this.onRequestComplete({ status: statusCode, ...error.response }, axiosRequest).catch(error =>
                    {
                        reject(error);
                    });
                }
            });
        });
    }
    
    /**
     * 当请求完毕时调用。
     * @param  {IHttpResponse} response 响应对象。
     * @param  {AxiosRequestConfig} axiosRequest Axios 请求实例。
     * @returns Promise
     */
    private async onRequestComplete(axiosResponse: AxiosResponse | any, axiosRequest: AxiosRequestConfig): Promise<any>
    {
        const response: any = this.resolveResponse(axiosResponse, axiosRequest);
        const request = response.request;
        const code = response.code;
        const entry = EnumUtils.getEntry(code, HttpResponseCode);
        
        if(code === HttpResponseCode.success || code === HttpResponseCode.nodata)
        {
            return Promise.resolve(response);
        }
        else
        {
            // 循环遍历处理函数进行处理
            this.handlers.forEach((handler: (code: number, response: IHttpResponse, request: IHttpRequest) => void | Promise<void>) =>
            {
                handler(code, response, request);
            });

            if(code === HttpResponseCode.failure || code === HttpResponseCode.invalidParameter)
            {
                Logger.warn(this, entry && entry.alias, { url: request.url, response, request });

                // 如果只是操作错误，则原封不动将响应返回
                return Promise.reject(Object.assign({ message: response.content.msg }, response.content));
            }
            // else if(code === HttpResponseCode.unauthorized)
            // {
            //     Logger.error(this, entry && entry.alias, { url: request.url, response, request });

            //     // 运维接口比较特殊，权限错误，账号密码错误全是返回403, 故将错误内容不替换，在调用结果中处理。
            //     return Promise.reject(Object.assign({}, response, { message: axiosResponse.data && axiosResponse.data.message }));
            // }
            else
            {
                Logger.error(this, entry && entry.alias, { url: request.url, response, request });

                // 如果是其他错误（如：异常、参数、签名等）则将响应对象的 message 属性替换为友好提示信息
                return Promise.reject(Object.assign({}, response, { message: entry && entry.description }));
            }
        }
    }

    /**
     * 解析 Axios 响应。
     * @param  {AxiosResponse} axiosResponse Axios 响应对象。
     * @param  {AxiosRequestConfig} axiosRequest Axios 请求实例。
     * @returns IHttpResponse HTTP 响应。
     */
    private resolveResponse(axiosResponse: AxiosResponse, axiosRequest: AxiosRequestConfig): IHttpResponse
    {
        const request: IHttpRequest = axiosRequest["$request"];
        const { status: code, data: content = {}, headers = {} } = axiosResponse;
        let extras = {};

        // let data = content.data !== "null" && content.data !== undefined ? content.data : content;
        let data = content.data !== undefined ? content.data : content;

        if(data && typeof data.pages === "number")
        {
            extras =
            {
                current: data.current,
                pages: data.pages,
                size: data.size,
                total: data.total
            };
        }

        const resCode = typeof content.code === "number" ? content.code : code;

        const response: IHttpResponse =
        {
            code: resCode,
            request,
            content: resCode === HttpResponseCode.success ? data : {data, msg: content.msg},
            extras,
            headers
        };

        return response;
    }
}

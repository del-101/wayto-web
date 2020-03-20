/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved. 
 */

/**
 * 表示一次 HTTP 请求的选项。
 * @interface
 * @version 1.0.0
 */
export default interface IHttpRequest
{
    /**
     * 获取或设置请求地址。
     * @member
     * @returns string
     */
    url?: string;
    
    /**
     * 获取或设置请求数据。
     * @member
     * @returns Object
     */
    data?: Object;

    /**
     * 获取或设置url Query参数。
     * @member
     * @returns Object
     */
    params?: Object;
    
    /**
     * 获取或设置需要上传的文件列表。
     * @member
     * @returns Object
     */
    files?: Object;

    /**
     * 获取或设置是否需要进行跨域处理。
     * @member
     * @returns boolean
     */
    withCredentials?: boolean;

    /**
     * 获取或设置参数序列化方式。("form"或"form-data"或"json")。
     * @member
     * @returns string
     */
    serializeType?: "form" | "form-data" | "json" | "application/x-www-form-urlencoded";

    /**
     * 获取或设置表示服务器响应的数据类型。("arraybuffer" | "blob" | "document" | "json" | "text" | "stream")。
     * @member
     * @returns string
     */
    responseType?: "arraybuffer" | "blob" | "document" | "json" | "text" | "stream";

    /**
     * 获取或设置当请求失败时的重试次数。
     * @member
     * @returns number
     */
    retryCount?: number;

    /**
     * 获取或设置当请求超时时间。
     * @member
     * @returns number
     */
    timeout?: number;

    /**
     * 获取或设置当请求失败时的重试间隔(单位：毫秒）。
     * @member
     * @returns number
     */
    retryInterval?: number;
    
    /**
     * 获取或设置上传请求时调用的回掉函数。
     * @member
     * @returns Function
     */
    onUploadProgress?: (progressEvent: any) => void;
    
    /**
     * 获取或设置下载时调用的回掉函数。
     * @member
     * @returns Function
     */
    onDownloadProgress?: (progressEvent: any) => void;
    
    /**
     * 获取或设置请求完成时调用的回掉函数。
     * @member
     * @returns Function
     */
    complete?: Function;

    /**
     * 获取或设置请求完成时调用的拦截器函数。
     * @member
     * @returns any
     */
    interceptors?: any;

    /**
     * 获取或设置请求完成时调用的拦截器函数。
     * @member
     * @returns any
     */
    headers?: any;

    /**
     * 获取或设置构造请求url (将url中需要传入参数的地方替换掉)。
     * @member
     * @returns any
     */
    urlPath?: Object;
}

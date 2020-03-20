/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved. 
 */

import HttpResponseCode from "./http-response-code";
import IHttpRequest from "./http-request";

/**
 * 提供 HTTP 响应的封装。
 * @interface
 * @version 1.0.0
 */
export default interface IHttpResponse
{
    /**
     * 获取或设置本次响应对应的请求实例。
     * @member
     * @returns IHttpRequest
     */
    request?: IHttpRequest;

    /**
     * 获取或设置响应码。
     * @member
     * @returns HttpResponseCode
     */
    code: HttpResponseCode;
    
    /**
     * 获取或设置响应扩展的内容。
     * @member
     * @returns object
     */
    extras?: any;

    /**
     * 获取或设置响应内容。
     * @member
     * @returns any
     */
    content?: any;

    /**
     * 获取或设置响应头内容。
     * @member
     * @returns any
     */
    headers?: any;
}

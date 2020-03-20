/*!
 * Authors:
 *      yyhugh
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved.
 */

import { Injectable } from "uxmid-core";
import ServiceBase from "./service-base";
import IHttpResponse from "src/common/http/http-response";
import IHttpRequest from "src/common/http/http-request";

@Injectable()
export default class SystemService extends ServiceBase
{
    /**
     * 单位树形结构查询，支持按名称模糊匹配
     * @param {object} params
     * @returns {Promise<IHttpResponse>}
     */
    public async findOrgTree(params): Promise<IHttpResponse>
    {
        const { name } = params;
        const response = await this.apis.findOrgTree({
            data:
            {
                name
            }
        });
        return response;
    }
}

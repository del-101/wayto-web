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
export default class PatrolService extends ServiceBase
{
    /**
     * 分页查询巡查列表
     * @param {object} params
     * @returns {Promise<IHttpResponse>}
     */
    public async findPatrol(params): Promise<IHttpResponse>
    {
        const response = await this.apis.findPatrol({
            data: params
        });
        return response;
    }
}

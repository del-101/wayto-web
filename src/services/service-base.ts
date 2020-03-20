/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved. 
 */

import { Application } from "uxmid-core";
import { Store } from "vuex";
import { ICredential } from "models";
import { ApplicationContext } from "../application";

import { apis } from "apis";

import HttpClient from "common/http/http-client";

/**
 * 业务服务基类。
 * @abstract
 * @class
 * @version 1.0.0
 */
export default abstract class ServiceBase
{
    /**
     * 获取应用的 Store 实例。
     * @protected
     * @property
     * @returns Store
     */
    protected get store(): Store<any>
    {
        return this.applicationContext.store;
    }
    
    /**
     * 获取所有数据接口地址。
     * @protected
     * @property
     * @returns apis
     */
    protected get apis(): apis
    {
        return new apis();
    }
    
    /**
     * 获取一个全局 HTTP 客户端实例。
     * @protected
     * @property
     * @returns HttpClient
     */
    protected get http(): HttpClient
    {
        return HttpClient.instance;
    }

    /**
     * 获取当前应用的上下文实例。
     * @protected
     * @property
     * @returns ApplicationContext
     */
    protected get applicationContext(): ApplicationContext
    {
        return Application.context as ApplicationContext;
    }

    /**
     * 获取当前用户的安全凭证。
     * @protected
     * @property
     * @returns Credential
     */
    protected get credential(): ICredential
    {
        return this.applicationContext.credential as ICredential;
    }
}

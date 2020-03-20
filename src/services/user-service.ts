/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved. 
 */

import { Injectable } from "uxmid-core";
import ServiceBase from "./service-base";
import { ICredential, ILoginModel, IUserProfile } from "src/models";
import IHttpResponse from "src/common/http/http-response";

/**
 * 表示用户相关服务。
 * @class
 * @version 1.0.0
 */
@Injectable()
export default class UserService extends ServiceBase
{
    /**
     * 登录
     * @public
     * @async
     * @param {ILoginModel} model
     * @returns {Promise<void>}
     */
    public async login(model: ILoginModel): Promise<void>
    {
        // 登录之前清空上次的凭证
        this.applicationContext.credential = null;

        const result = await this.apis.login
        ({
            serializeType: "application/x-www-form-urlencoded",
            data:
            {
                client_id: "wayto-oauth-client-id",
                client_secret: "wayto-oauth-client-secret",
                grant_type: "password",
                terminal: "web",
                ...model
            }
        });

        const { access_token: credentialId, user }  = result.content;

        const userProfile: IUserProfile =
        {
            id: user.id,
            username: user.userName,
            realname: user.realName,
            mobile: user.mobile,
            orgId: user.orgId,
            filePath: user.filePath
        };

        // 生成凭证实体
        const credential: ICredential =
        {
            userId: user.id,
            credentialId: credentialId,
            user: userProfile
        };

        // 重要: 一定要保存用户凭证至应用上下文中
        this.applicationContext.credential = credential;

        // 更新用户信息至 vuex 中
        this.store.dispatch("user/setProfile", userProfile);
    }

    /**
     * 获取图形验证码
     * @public
     * @async
     * @param {number} uuid
     * @returns {Promise<IHttpResponse>}
     */
    public async getVerifyImg(uuid: number): Promise<IHttpResponse>
    {
        const res = await this.apis.getVerifyImg({
            params:
            {
                uuid: uuid
            },
            responseType: "blob"
        });
        return res;
    }

    /**
     * 获取手机验证码
     * @public
     * @param {object} params
     * @returns {Promise<IHttpResponse>}
     */
    public async findPwdMsgCode(params): Promise<IHttpResponse>
    {
        const { username: userName, mobile } = params;
        const res = await this.apis.findPwdMsgCode({
            urlPath:
            {
                userName,
                mobile
            }
        });
        return res;
    }

    /**
     * 找回密码
     * @public
     * @param {object} params
     * @returns {Promise<IHttpResponse>}
     */
    public async findPassword(params): Promise<IHttpResponse>
    {
        const res = await this.apis.findPassword({
            data: params
        });
        return res;
    }
}

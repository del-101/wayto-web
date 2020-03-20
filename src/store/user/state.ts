/*!
 * Authors:
 *      yyhugh
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved.
 */

import { IUserProfile } from "models/account";

export default class State
{
    /**
     * 获取或设置当前登录用户的信息。
     * @member
     * @returns IUserProfile
     */
    public profile: IUserProfile = null;

    /**
     * 获取或设置当前登录用户的权限信息。
     * @member
     * @returns {Array<any>}
     */
    public authorizedCodes: Array<any> = null;

    /**
     * 用户角色信息。
     * @member
     * @returns {string}
     */
    public role: string = localStorage.getItem("role") || "";
}

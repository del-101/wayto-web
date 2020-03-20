/*!
 * Authors:
 *      yyhugh
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved.
 */

import { Type } from "uxmid-core";
import { MutationTree } from "vuex";
import { ApplicationContext } from "src/application";
import { IUserProfile, ICredential } from "models/account";
import State from "./state";

export function SET_PROFILE(state: State, profile: IUserProfile): void
{
    // 首先将用户信息更新至 vuex 中
    state.profile = profile;

    // 其次将用户信息同步更新至应用程序上下文中
    let credential = ApplicationContext.current.credential as ICredential;

    if(!Type.isEmptyObject(credential))
    {
        credential.user = profile;

        // 一定要重新设置凭证，因为凭证会持久至 LocalStorage 中
        ApplicationContext.current.credential = credential;
    }
}

export function SET_ROLE(state: State, role: string): void
{
    state.role = role;
    localStorage.setItem("role", role);
}

export function LOGOUT(state: State): void
{
    // 清除用户凭证
    ApplicationContext.current.credential = null;
    
    // 重置状态
    state.profile = null;
    state.authorizedCodes = null;
    state.role = null;
    localStorage.removeItem("role");
}

export function SET_AUTHORIZEDCODES(state: State, codes: Array<any>): void
{
    state.authorizedCodes = codes;

    if (!Type.isEmptyObject(codes))
    {
        localStorage.setItem("_authorizedCodes_", JSON.stringify(codes));
    }
}

export default <MutationTree<State>>
{
    SET_PROFILE,
    SET_ROLE,
    LOGOUT,
    SET_AUTHORIZEDCODES
};

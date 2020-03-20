/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved. 
 */

import { ICredential } from "uxmid-core";
import IUserProfile from "./user-profile";

/**
 * 表示一个安全凭证模型的定义。
 * @interface
 * @version 1.0.0
 */
export default interface IICredential extends ICredential
{
    /**
     * 获取安全凭证对应的用户对象。
     * @member
     * @returns IUserProfile
     */
    user: IUserProfile;
    
    /**
     * 获取安全凭证
     * @member
     * @returns string
     */
    credentialId: string;
}

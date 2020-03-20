/*!
 * Authors:
 *      yyhugh
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved.
 */

/**
 * 表示一个找回密码模型的定义。
 * @interface
 * @version 1.0.0
 */
export default interface IFindPsdModel
{
    /**
     * 获取或设置用户名。
     * @member
     * @returns string
     */
    username: string;

    /**
     * 手机号。
     * @member
     * @returns string
     */
    mobile: string;

    /**
     * 短信验证码。
     * @member
     * @returns string
     */
    code: string;

    /**
     * 新密码。
     * @member
     * @returns string
     */
    newPwd: string;

    /**
     * 确认新密码。
     * @member
     * @returns string
     */
    confirmPassword: string;
}

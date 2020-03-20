/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved. 
 */

/**
 * 表示一个登录模型的定义。
 * @interface
 * @version 1.0.0
 */
export default interface ILoginModel
{
    /**
     * 获取验证码随机数
     * @member
     * @returns string
     */
    vc_uuid?: number;

    /**
     * 图形验证码开关
     * @member
     * @returns string
     */
    auth_type?: string | null;

    /**
     * 是否需要后台验证验证码
     * @member
     * @returns boolean
     */
    isVerifyCode: boolean;

    /**
     * 图形验证码
     * @member
     * @returns string
     */
    verifyCode?: string;
    /**
     * 公司代号
     * @member
     * @returns string
     */
    factoryname?: string;

    /**
     * 获取或设置用户名。
     * @member
     * @returns string
     */
    username: string;
    
    /**
     * 获取或设置密码。
     * @member
     * @returns string
     */
    password: string;

    /**
     * 模块。
     * @member
     * @returns string
     */
    namespace?: string;
    
    /**
     * 获取或设置是否记住密码。
     * @member
     * @returns boolean
     */
    rememberPassword?: boolean;

    /**
     * 终端来源
     * @member
     * @returns string
     */
    terminal?: string;
}

/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved. 
 */

/**
 * 表示一个用户模型的定义。
 * @interface
 * @version 1.0.0
 */
export default interface IUserProfile
{
    /**
     * 获取或设置用户编号。
     * @member
     * @returns number
     */
    id?: number;

    /**
     * 获取或设置现居地址。
     * @member
     * @returns string
     */
    address?: string;

    /**
     * 获取或设置用户的生日。
     * @member
     * @returns string
     */
    birthday?: string | Date;

    /**
     * 获取或设置身份证的信息。
     * @member
     * @returns any
     */
    cardNo?: string;

    /**
     * 获取或设置文化程度。
     * @member
     * @returns any
     */
    degreeEducation?: string;

    /**
     * 获取或设置部门Id。
     * @member
     * @returns number
     */
    departmentId?: number;

    /**
     * email
     * @member
     * @returns string
     */
    email?: string;

    /**
     * 入职时间
     * @member
     * @returns string
     */
    entryTime?: string;

    /**
     * 获取或设置用户的头像标识(图片URL)。
     * @member
     * @returns string
     */
    filePath?: string;

    /**
     * 带http地址(图片URL)。
     * @member
     * @returns string
     */
    url?: string;

    /**
     * 毕业院校
     * @member
     * @returns string
     */
    graduateSchool?: string;

    /**
     * 户籍详细地址
     * @member
     * @returns string
     */
    householdAddress?: string;

    /**
     * 户籍省份
     * @member
     * @returns string
     */
    householdProvince?: string;

    /**
     * 获取或设置用户的手机号。
     * @member
     * @returns string
     */
    mobile?: string;

    /**
     * 获取或设置住宅电话。
     * @member
     * @returns string
     */
    telHome?: string;

    /**
     * 获取或设置办公电话。
     * @member
     * @returns string
     */
    telOffice?: string;

    /**
     * 民族。
     * @member
     * @returns string
     */
    nation?: string;

    /**
     * 操作时间。
     * @member
     * @returns string | Date
     */
    operationTime?: string | Date;

    /**
     * 获取或设置用户的组织id。
     * @member
     * @returns number
     */
    orgId?: number;

    /**
     * 获取或设置密码。
     * @member
     * @returns string
     */
    password?: string;

    /**
     * 获取或设置政治面貌。
     * @member
     * @returns string
     */
    politicalOutlook?: string;

    /**
     * 获取或设置用户真实姓名。
     * @member
     * @returns string
     */
    realname?: string;

    /**
     * 获取或设置用户的角色。
     * @member
     * @returns string
     */
    roleId?: number;

    /**
     * 获取或设置用户性别。
     * @member
     * @returns number
     */
    sex?: number;
    
    /**
     * 获取或设置用户账号。
     * @member
     * @returns string
     */
    username?: string;

    /**
     * 获取或设置用户账号。
     * @member
     * @returns string
     */
    fullName?: string;
    
    /**
     * 获取或设置用户账号Id。
     * @member
     * @returns string
     */
    userId?: number;
    /**
     * 获取或设置用户的状态：1在职，2离职。
     * @member
     * @returns number
     */
    status?: 1 | 2;

    /**
     * 获取或设置工作证号。
     * @member
     * @returns string
     */
    workNo?: string;

    /**
     * 名称
     * @member
     * @returns string
     */
    name?: string;
    
    /**
     * 头像
     * @member
     * @returns string
     */
    avatar?: string;

    /**
     * 性别
     * @member
     * @returns number
     */
    gender?: number;

    /**
     * 组织信息
     */
    orgInfo?: any;
}

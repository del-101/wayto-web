/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved. 
 */

import { globalConfig } from "common/config";
const apiUrl = globalConfig.apiServer;

export default
{
    // 公共
    login:                           `${apiUrl}/oauth/token`,                                        // 登录
    getVerifyImg:                    `${apiUrl}/free/getVerifyImg`,                                  // 登录页请求图形验证码
    findPwdMsgCode:                  `${apiUrl}/users/getPwdSendMsg/{userName}/{mobile}`,            // 找回密码短信验证码
    findPassword:                    `${apiUrl}/users/retrievePwd`,                                  // 找回密码
    uploadFile:                      `${apiUrl}/file/uploadFile.json`,                               // 上传文件

    // 巡查管理
    findPatrol:                      `${apiUrl}/project/inspect/page.json`,                          // 分页查询巡查列表

    // 系统管理
    findOrgTree:                     `${apiUrl}/sys/org/find/tree.json`                              // 单位树形结构查询，支持按名称模糊匹配
};

/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved. 
 */

const debug = process.env.NODE_ENV === "development";
const { apiServer, aMapKey } = (<any>window).waytoSetting;

const globalConfig =
{
    // 服务器地址
    apiServer,

    // 地图apikey
    aMapKey,

    // 通讯密钥
    secret: "",

    // ajax相关配置
    ajaxDebug: debug,
    ajaxResponseType: "json",
    ajaxTimeout: 20000,
    ajaxCustomHeader: {}
};

export default globalConfig;

/*!
 * Authors:
 *      yyhugh
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved.
 */

// 布局组件
const admin = (resolve: any) => (<any>require).ensure([], () => resolve(require("views/admin")), "admin");

import system from "./modules/system";
import patrol from "./modules/patrol";

function resolveRoutes(menus)
{
    let result =
    [
        {
            path: "/",
            redirect: "/login"
        },
        {
            name: "login",
            path: "/login",
            component: (resolve: any) => (<any>require).ensure([], () => resolve(require("views/login")), "login")
        },
        {
            name: "home",
            path: "/home",
            redirect: "/system"
        },
        ...menus
        // ...error
    ];
    return result;
}

const menus =
[
    {
        name: "system",
        path: "/system",
        component: admin,
        meta:
        {
            title: "系统管理",
            label: "系统管理",
            icon: "iconfont iconicon_xitongguanli"
        },
        children:
        [
            ...system
        ]
    },
    {
        name: "patrol",
        path: "/patrol",
        component: admin,
        meta:
        {
            title: "巡查管理",
            label: "巡查管理",
            icon: "iconfont iconicon_xunchaguanli"
        },
        children:
        [
            ...patrol
        ]
    }
];

const routes = resolveRoutes(menus);

export
{
    menus,
    routes
};

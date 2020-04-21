/*!
 * Authors:
 *      yyhugh
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved.
 */

import * as services from "src/services";
import ServiceBase from "src/services/service-base";

/**
 * 服务属性装饰器
 */
export function service(name: string)
{
    return (target: any, key: string) =>
    {
        if (!name)
        {
            throw new Error("服务名称不能为空！");
        }

        // 当前选择的服务类
        const service: ServiceBase = services[name];

        // 检查当前服务类是否存在
        if (!service)
        {
            throw new Error(`不存在${name}服务，再见！`);
        }

        target[key] = target.serviceProvier.resolve(service);
    };
}

/*!
 * Authors:
 *      yyhugh
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved.
 */

import * as repositories from "src/repository";
import BaseRepository from "src/repository/base-repository";

/**
 * 仓储属性装饰器
 */
export function repository(name: string)
{
    return (target: any, key: string) =>
    {
        if (!name)
        {
            throw new Error("仓储名称不能为空！");
        }

        // 当前选择的仓储类
        const repository: BaseRepository = repositories[name];

        // 检查当前仓储类是否存在
        if (!repository)
        {
            throw new Error(`不存在${name}仓储，再见！`);
        }

        target[key] = target.serviceProvier.resolve(repository);
    };
}

/*!
 * Authors:
 *      yyhugh
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved.
 */

import { Type } from "uxmid-core";

export
{
    DANGER_STATUS,
    DANGER_LEVEL
};

/**
 * 隐患处理状态
 */
enum DANGER_STATUS
{
    /**
     * 待处理
     */
    PENDING = 1,

    /**
     * 处理中
     */
    PROCESSING,

    /**
     * 已处理
     */
    END,
    
    /**
     * 已处理
     */
    INVALID
}

Type.setMetadata(
    DANGER_STATUS,
    {
        PENDING:
        {
            description: "待处理"
        },
        PROCESSING:
        {
            description: "处理中"
        },
        END:
        {
            description: "已处理"
        },
        INVALID:
        {
            description: "已处理"
        }
    }
);

/**
 * 隐患等级
 */

enum DANGER_LEVEL
{
    /**
     * 紧急
     */
    A = 1,

    /**
     * 重要
     */
    B,

    /**
     * 一般
     */
    C
}

Type.setMetadata(
    DANGER_LEVEL,
    {
        A:
        {
            description: "紧急"
        },
        B:
        {
            description: "重要"
        },
        C:
        {
            description: "一般"
        }
    }
);

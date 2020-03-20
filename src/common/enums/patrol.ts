/*!
 * Authors:
 *      yyhugh
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved.
 */

import { Type } from "uxmid-core";

export
{
    PATROL_RESULT,
    PATROL_TYPE,
    PATROL_STATUS
};

/**
 * 巡检结果
 */
enum PATROL_RESULT
{
    /**
     * 正常
     */
    NORMAL = 1,

    /**
     * 故障
     */
    FAULT
}

Type.setMetadata(
    PATROL_RESULT,
    {
        PENDING:
        {
            description: "正常"
        },
        FAULT:
        {
            description: "故障"
        }
    }
);

/**
 * 巡检类型
 */
enum PATROL_TYPE
{
    /**
     * 日常
     */
    EVERYDAY = 1
}

Type.setMetadata(
    PATROL_TYPE,
    {
        EVERYDAY:
        {
            description: "日常巡检"
        }
    }
);

/**
 * 巡检状态
 */
enum PATROL_STATUS
{
    /**
     * 未开始
     */
    NOT = 1,

    /**
     * 巡检中
     */
    ING,

    /**
     * 已暂停
     */
    PAUSE,

    /**
     * 已完成
     */
    END
}

Type.setMetadata(
    PATROL_STATUS,
    {
        NOT:
        {
            description: "未开始"
        },
        ING:
        {
            description: "巡检中"
        },
        PAUSE:
        {
            description: "已暂停"
        },
        END:
        {
            description: "已完成"
        }
    }
);

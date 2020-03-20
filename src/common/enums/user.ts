/*!
 * Authors:
 *      yyhugh
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved.
 */

import { Type } from "uxmid-core";

export
{
    USER_STATUS,
    USER_SEX,
    USER_ROLE,
    USER_ACCESS
};

/**
 * 人员状态
 */
enum USER_STATUS
{
    /**
     * 在职
     */
    ON_JOB = 1,

    /**
     * 离职
     */
    LEFT_JOB = 2,

    /**
     * 休假中
     */
    ON_HOLIDAY = 4
}

Type.setMetadata(
    USER_STATUS,
    {
        ON_JOB:
        {
            description: "在职"
        },
        LEFT_JOB:
        {
            description: "离职"
        },
        ON_HOLIDAY:
        {
            description: "休假中"
        }
    }
);

/**
 * 性别列表
 */
enum USER_SEX
{
    /**
     * 男
     */
    MAN = 1,
    /**
     * 女
     */
    WOMAN
}

Type.setMetadata(
    USER_SEX,
    {
        MAN:
        {
            description: "男"
        },
        WOMAN:
        {
            description: "女"
        }
    }
);

/**
 * 角色列表
 */
enum USER_ROLE
{
    /**
     * 管理员
     */
    ADMIN = 1
}

Type.setMetadata(
    USER_ROLE,
    {
        ADMIN:
        {
            description: "管理员"
        }
    }
);

/**
 * 出入状态
 */
enum USER_ACCESS
{
    /**
     * 入园
     */
    IN = 1,

    /**
     * 出园
     */
    OUT
}

Type.setMetadata(
    USER_ACCESS,
    {
        IN:
        {
            description: "入园"
        },
        OUT:
        {
            description: "出园"
        }
    }
);

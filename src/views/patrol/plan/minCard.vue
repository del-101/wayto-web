<template>
    <div class="v-patrol plan min-card">
        <!-- 信息 BEGIN -->
        <div class="info">
            <p>
                <span :title="data.name">{{data.name || "-"}}</span>
                <span :class="`${turn.statusActive}`">{{turn.status || "-"}}</span>
            </p>
            <p>
                <span :class="turn.typeActive">巡检类型：{{turn.type || "-"}}</span>
            </p>
            <p>
                <span>巡检时间：{{data.time || "-"}}</span>
            </p>
        </div>
        <!-- 信息 END -->
    </div>
</template>
<script lang="ts">
import { View, component, config, watch } from "uxmid-web";
import { EnumUtils } from "uxmid-core";
import { PATROL_TYPE, PATROL_STATUS } from "common/enums";

@component
export default class MinCard extends View
{
    /**
     * 默认头像
     * @member
     * @protected
     * @returns {any}
     */
    protected defaultHead = require("src/assets/default-user.jpg");

    /**
     * 枚举处理方法
     * @member
     * @protected
     * @returns {any}
     */
    protected EnumUtils = EnumUtils;

    /**
     * 转化后的数据集
     * @member
     * @protected
     * @returns {object}
     */
    protected turn =
    {
        type: "",
        typeActive: "",
        status: "",
        statusActive: ""
    };

    /**
     * 数据源
     * @member
     * @protected
     * @return {object}
     */
    @config({ required: true, type: Object, default: {} })
    protected data;

    /**
     * 数据源变化
     */
    @watch("data", { deep: true, immediate: true })
    protected onDataChange(): void
    {
        const { type } = this.data;

        if (!type && type !== 0)
        {
            return;
        }

        const patrolType = EnumUtils.getEntry(type, PATROL_TYPE);
        this.turn.type = patrolType.description;
        this.turn.typeActive = patrolType.name.toLowerCase();

        const patrolStatus = EnumUtils.getEntry(type, PATROL_STATUS);
        this.turn.status = patrolStatus.description;
        this.turn.statusActive = patrolStatus.name.toLowerCase();
    }
}
</script>
<style lang="less" scoped>
@import "~styles/views/patrol/plan/minCard";
</style>

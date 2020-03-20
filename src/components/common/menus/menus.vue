<template>
    <div class="v-menus">
        <ul>
            <li v-for="(item, i) in list" :key="i" :class="activeIndex === i && 'active'" @click="onMenuClick(i)">{{item.label}}</li>
        </ul>
        <div v-if="datePicker">
            <i-date-picker
                transfer
                format="yyyy-MM-dd"
                type="daterange"
                placement="bottom-end"
                placeholder="请选择"
                style="width:200px"
                @on-change="onDateChange"
                @on-clear="onDateClear"></i-date-picker>
        </div>
    </div>
</template>
<script lang="ts">
import { View, component, config } from "uxmid-web";

@component
export default class Menus extends View
{
    /**
     * 成员列表
     * @member
     * @protected
     * @returns {Array<{ label: string; value: number }>}
     */
    @config({ required: false, type: Array })
    protected list: Array<{ label: string; value: number }>;

    /**
     * 是否启用日期选取器
     * @member
     * @protected
     * @returns {void}
     */
    @config({ required: false, type: Boolean })
    protected datePicker: boolean;

    /**
     * 当前焦点
     * @member
     * @protected
     * @returns {void}
     */
    protected activeIndex: number = 0;

    /**
     * 切换选项
     * @member
     * @protected
     * @returns {void}
     */
    protected onMenuClick(i: number): void
    {
        this.activeIndex = i;
    }

    /**
     * 日期选择器变化
     * @member
     * @protected
     * @param {Array<string>} data
     * @returns {void}
     */
    protected onDateChange(data): void
    {
        const isClear = data.every(item => item === "");
        if (isClear)
        {
            this.activeIndex = 0;
        }
        else
        {
            this.activeIndex = -1;
        }
    }

    /**
     * 日期选择器重置
     * @member
     * @protected
     * @returns {void}
     */
    protected onDateClear(): void
    {
        this.activeIndex = 0;
    }
}
</script>
<style lang="less">
@import "./menus";
</style>

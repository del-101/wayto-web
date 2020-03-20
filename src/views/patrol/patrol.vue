<template>
    <div class="v-patrol">
        <u-page-list :active="selectName" @onTabClick="onTabClick" :custom="true">
            <!-- 选项卡 BEGIN -->
            <template slot="head">
                <i-tab-pane v-for="(item, i) in tabs" :label="item.label" :name="item.name" :key="i"></i-tab-pane>
            </template>
            <!-- 选项卡 END -->
 
            <!-- 选项卡内容 BEGIN -->
            <component :is="selectName"></component>
            <!-- 选项卡内容 END -->
        </u-page-list>
    </div>
</template>
<script lang="ts">
import { View, component } from "uxmid-web";
import Plan from "./plan/plan.vue";

@component({
    components:
    {
        "u-plan": Plan
    }
})
export default class Patrol extends View
{
    /**
     * tab列表
     * @protected
     * @returns {Array<any>}
     */
    protected tabs: Array<any> =
    [
        {
            label: "巡查计划",
            name: "u-plan"
        }
    ];

    /**
     * 当前焦点TAB
     * @protected
     * @returns {string}
     */
    protected selectName: string = this.tabs[0].name;

    /**
     * 点击TAB事件
     * @protected
     * @returns void
     */
    protected onTabClick(name: string): void
    {
        this.selectName = name;
    }
}
</script>
<style lang="less">
@import "~styles/views/patrol/patrol";
</style>

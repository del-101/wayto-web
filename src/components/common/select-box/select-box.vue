<template>
    <section class="components-select-box">
        <!-- 全选之后下方显示的模板 BEGIN -->
        <transition name="selected">
            <!-- <i-alert class="components-select-box-panel mb0" show-icon  v-show="isShowPanel"> -->
            <div class="components-select-box-panel" v-show="isShowPanel">
                <!-- <i-icon type="information-circled"></i-icon> -->
                <span class="components-select-box-label">
                    已选择<strong class="fn ml5 mr5 font-link">{{selectionCount}}</strong>项
                </span>
                <span class="components-select-box-operat">
                    <slot name="operat">
                        <a href="javascript: void(0);" @click="selctAll"></a>
                    </slot>
                </span>
            </div>
            <!-- </i-alert> -->
        </transition>
    </section>
</template>

<script lang="ts">
import { component, Component, config } from "uxmid-web";

/**
 * 表示一个页面头部组件。
 * @class
 * @version 1.0.0
 */
@component
export default class SelectBox extends Component
{
    /**
     * 已选项记录数
     */
    @config({default: 0})
    public selectionCount: number;

    /**
     * 已选项记录数
     */
    @config({default: 0})
    public totalCount: number;

    /**
     * 是否展示面板
     */
    @config({default: false})
    public isShowPanel: boolean;

    /**
     * 创建组件时调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected mounted(): void
    {
        let $el =  this.$el as any;
        $el.onclick = (event =>
        {
            event.stopPropagation();    //  阻止冒泡
        });
    }

    // protected updated()
    // {
    //     console.log("update me");
    // }

    /**
     * 发出事件告知父组件选中全部项
     * @protected
     * @returns void
     */
    protected selctAll(): void
    {
        this.$emit("on-select-all");
    }
}
</script>

<style lang="less">
@import "./select-box";
</style>

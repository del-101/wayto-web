<template>
    <div class="page-content">
        <!-- 筛选和操作 BEGIN-->
        <div class="operation" :class="{open: isOpenOperation}">
            <!-- 收起搜索 BEGIN-->
            <section class="shrink">
                <div class="operation-search">
                    <slot name="search-left"></slot>
                </div>
                <div class="operation-btn" >
                    <slot name="operation-btn"></slot>
                </div>
            </section>
            <!-- 收起搜索 END-->
            <!-- 高级搜索 BEGIN-->
            <div class="senior">
                <slot name="senior"></slot>
            </div>
            <!-- 高级搜索 END-->
        </div>
        <!-- 筛选和操作 END-->

        <!-- 列表 表格组件 BEGIN -->
        <div class="page-list-table">
            <slot name="page-table"></slot>
        </div>
        <!-- 列表 表格组件 END-->
    </div>
</template>

<script lang="ts">
import { component, View, config } from "uxmid-web";
@component
export default class PageContent extends View
{
    /**
     * 是否展开高级搜索列
     * @config
     * @protected
     */
    @config({type: Boolean, default: false})
    public isOpenOperation: boolean;
}
</script>

<style lang="less">
@import "./page-content";
</style>

<template>
    <div class="table-display-view">

        <div class="display-header">
            <!-- 切换表格风格  BEGIN -->
            <u-table-style-switch v-model="isRowStyle"></u-table-style-switch>
            <!-- 切换表格风格 END -->

            <!-- 页码信息 BEGIN -->
            <span class="display-page">共{{recordCount}}条数据，<span class="font-main">{{pageCount === 0 ? 0 :pageIndex}}</span>/{{pageCount}}</span>
            <!-- 页码信息 END -->
        </div>
        
        <div class="display-data-box" :class="{columun: !isRowStyle}">
            <!-- 数据表格部分 BEGIN -->
            <div class="display-table-box" :style="{'border-top': isRowStyle ? 'none' : '1px solid #E9EBEC;'}">
                <slot name="table">
                    <u-table
                        class="display-table"
                        @click.native.stop
                        stripe
                        :highlightRow="true"
                        :disabledHover="false"
                        :style="{'left': isRowStyle ? '30px' :0,'right': isRowStyle ? '30px' :0}"
                        :columns="columns"
                        :records="records"
                        :loading="loading"
                        :page-size="pageSize"
                        :page-index="pageIndex"
                        :page-count="pageCount"
                        :all-loaded="allLoaded"
                        :record-count="recordCount"
                        @on-page-change="onPageChange"
                        @on-row-click="onRowClick"
                        :showCount="showCount">
                    </u-table>
                </slot>
            </div>
            <!-- 数据表格部分 END -->

            <!-- 右侧部分 BEGIN -->
            <div class="display-detail">
                <slot name="detail">
                    我是右侧详情页吧。
                </slot>
            </div>
            <!-- 右侧部分 END -->
        </div>
    </div>
</template>

<script lang="ts">
import { component, View, config } from "uxmid-web";
import { Page } from "mixins";

@component({
    mixins: [ Page ]
})
export default class PersonManage extends View
{
    /**
     * 表格行显示
     * @protected
     */
    @config({required: true, type: [Function, Array]})
    protected rowColumuns: [Function, Array<any>];

    /**
     * 表格列显示
     * @protected
     */
    @config({required: true, type: [Function, Array]})
    protected colColumuns: [Function, Array<any>];

    /**
     * 表格列显示
     * @protected
     */
    @config({type: Function, default: () => ({})})
    protected beforLoadFunc: Function;

    /**
     * 表格列显示
     * @protected
     */
    @config({type: Function, default: () => ({})})
    protected loadFunc: Function;

    /**
     * 表格加载状态
     * @protected
     */
    protected isRowStyle: boolean = false;

    /**
     * 是否显示总数
     * @member
     * @protected
     * @returns boolean
     */
    protected showCount: boolean = false;

    protected get columns()
    {
        return this.isRowStyle ? this.rowColumuns : this.colColumuns;
    }

    /**
     * 加载列表数据之前
     * @protected
     * @override
     * @returns Promise<void>
     */
    protected beforLoadRecords: Function = this.beforLoadFunc;

    /**
     * 获取用户列表
     * @protected
     * @override
     * @returns Promise<void>
     */
    protected loadRecords: Function = this.loadFunc;

    /**
     * 获取用户列表
     * @protected
     * @override
     * @returns Promise<void>
     */
    protected onRowClick(row): void
    {
        this.isRowStyle && (this.isRowStyle = false);
        
        this.$emit("on-row-click", row);
    }
}
</script>

<style lang="less">
@import "./switch-table";
</style>

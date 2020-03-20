<template>
    <div class="v-patrol plan overview">
        <!-- 基础信息 BEGIN -->
        <div class="part">
            <h3>基础信息</h3>
            <i-row type="flex" justify="start" :gutter="20" class="list">
                <i-col class="item" :span="8">巡检编号：<span> FT0519091701X</span></i-col>
                <i-col class="item" :span="8">巡检类型：<span>日常巡检</span></i-col>
                <i-col class="item" :span="8">创建人：<span>章华（13800000000）</span></i-col>
                <i-col class="item" :span="8">创建时间：<span>2019/10/30  17:00</span></i-col>
                <i-col class="item" :span="8">计划描述：<span>接上级通知，消防专项隐患排查。</span></i-col>
            </i-row>
        </div>
        <!-- 基础信息 END -->

        <!-- 计划规则 BEGIN -->
        <div class="part">
            <h3>计划规则</h3>
            <i-row type="flex" justify="start" :gutter="20" class="list">
                <i-col class="item" :span="8">计划周期：<span>2019/06/30 ~ 2019/09/30</span></i-col>
                <i-col class="item" :span="8">巡检规则：<span>每日巡检（10:00  14:00）</span></i-col>
            </i-row>
        </div>
        <!-- 计划规则 END -->

        <!-- 计划分派 BEGIN -->
        <div class="part list">
            <h3>计划分派</h3>
            <i-table :columns="columns" :data="records"></i-table>
        </div>
        <!-- 计划分派 END -->
    </div>
</template>
<script lang="ts">
import { View, component } from "uxmid-web";

@component
export default class Overview extends View
{
    /**
     * 表格结构
     * @member
     * @protected
     * @returns {Array<any>}
     */
    protected columns: Array<any> =
    [
        {
            title: "序号",
            type: "index",
            width: 80
        },
        {
            title: "处理人",
            render: (h, { row }) =>
            {
                return h(
                    "span",
                    "王俊（18600000000）"
                );
            }
        },
        {
            title: "巡检点",
            render: (h, { row }) =>
            {
                return h(
                    "span",
                    "1号楼/1F/大厅"
                );
            }
        }
    ];

    /**
     * 数据
     * @member
     * @protected
     * @returns {Array<any>}
     */
    protected records: Array<any> =
    [
        // DOTO
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
    ];
}
</script>
<style lang="less">
@import "~styles/views/patrol/plan/overview";
</style>

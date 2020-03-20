<template>
    <div class="v-patrol plan">
        <u-page-content :isOpenOperation="isOpenOperation">
            <!-- 基础搜索 BEGIN -->
            <i-form slot="search-left">
                <i-form-item label="巡查信息：">
                    <i-input placeholder="巡检计划编号/名称" v-model="searchModel.keyword" clearable @on-blur="search" @on-clear="search"></i-input>
                </i-form-item>

                <i-form-item label="上报人：">
                    <i-select transfer clearable filterable placeholder="姓名/电话">
                        <i-option :value="1">A</i-option>
                        <i-option :value="2">B</i-option>
                        <i-option :value="3">C</i-option>
                    </i-select>
                </i-form-item>

                <i-form-item label="上报时间：">
                    <i-date-picker transfer format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="请选择"></i-date-picker>
                </i-form-item>

                <!-- 控制 BEGIN -->
                <i-form-item>
                    <i-button type="primary" @click="search">查询</i-button>
                    <i-button type="info" @click="searchModelReset">重置</i-button>
                    <i-button type="info" @click="toggleSearchMode">{{isOpenOperation ? "收起" : "展开筛选"}}</i-button>
                </i-form-item>
                <!-- 控制 END -->
            </i-form>
            <!-- 基础搜索 END -->

            <!-- 操作部分 BEGIN -->
            <template slot="operation-btn">
                <i-button type="primary" @click="showPlanModal()">新增</i-button>
            </template>
            <!-- 操作部分 END -->

            <!-- 高级搜索 BEGIN -->
            <i-form slot="senior" class="affair-search-high">
                高级搜索内容区
            </i-form>
            <!-- 高级搜索 END -->

            <!-- 表格 BEGIN -->
            <template slot="page-table">
                <u-switch-table
                    ref="switchTable"
                    :row-columuns="row"
                    :col-columuns="col"
                    :load-func="load"
                    :befor-load-func="beforeLoad"
                    @on-row-click="onRowClick"
                >
                    <template slot="detail">
                        <div class="detail">
                            <!-- 名称 BEGIN -->
                            <div class="name">NAME</div>
                            <!-- 名称 END -->

                            <!-- 选项卡 BEGIN -->
                            <i-tabs type="card" class="tabs">
                                <i-tab-pane v-for="(tab, i) in detailTabs" :key="i" :label="tab.label">
                                    <component :is="tab.component"></component>
                                </i-tab-pane>
                            </i-tabs>
                            <!-- 选项卡 END -->

                            <!-- 功能按钮 BEGIN -->
                            <div class="ctrl">
                                <i-button type="info" @click="showPlanModal(true)">编辑</i-button>
                            </div>
                            <!-- 功能按钮 END -->
                        </div>
                    </template>
                </u-switch-table>
            </template>
            <!-- 表格 END -->
        </u-page-content>

        <!-- 模态框-巡检计划 BEGIN -->
        <i-modal class="v-modal v-patrol-modal plan" v-model="planModal.isShow" width="836">
            <div slot="header" class="header">{{planModal.isEdit ? "编辑" : "新增"}}巡查计划</div>
            <i-form class="form planFormStep1" ref="planFormStep1" :model="planModal.form" :rules="planModal.rules">
                <i-row>
                    <i-col :span="10">
                        <i-form-item prop="name" class="form-item">
                                <div class="label" slot="label">
                                <div>计划名称<span>*</span></div>
                            </div>
                            <i-input v-model="planModal.form.name" placeholder="请输入"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="10" :offset="2">
                        <i-form-item prop="" class="form-item">
                            <div class="label" slot="label">
                                <div>巡检类型<span>*</span></div>
                            </div>
                            <i-select transfer clearable placeholder="请选择">
                                <i-option :value="1">全部</i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
            </i-form>
        </i-modal>
        <!-- 模态框-巡检计划 END -->
    </div>
</template>
<script lang="ts">
import { View, component } from "uxmid-web";
import { service } from "common/decorator";
import { PatrolService } from "src/services";
import uMinCard from "./minCard.vue";
import Overview from "./overview.vue";
import Dynamic from "./dynamic.vue";

@component({
    components:
    {
        "u-overview": Overview,
        "u-dynamic": Dynamic
    }
})
export default class Plan extends View
{
    /**
     * 请求服务。
     * @member
     * @protected
     * @returns {PatrolService}
     */
    @service("PatrolService")
    protected service: PatrolService;

    /**
     * 伸展列表
     * @member
     * @protected
     * @returns {Array<any>}
     */
    protected row: Array<any> =
    [
        {
            title: "计划名称",
            render: (h, {row}) =>
            {
                return h(
                    "span",
                    "教学大楼消防安全巡检"
                );
            }
        },
        {
            title: "操作",
            width: 180,
            render: (h, { row }) =>
            {
                return h(
                    "p",
                    [
                        h(
                            "span",
                            {
                                class: "ctrl",
                                on:
                                {
                                    click: e =>
                                    {
                                        e.stopPropagation();
                                    }
                                }
                            },
                            "暂停"
                        ),
                        h(
                            "span",
                            {
                                class: "ctrl",
                                on:
                                {
                                    click: e =>
                                    {
                                        e.stopPropagation();
                                    }
                                }
                            },
                            "编辑"
                        )
                    ]
                );
            }
        }
    ];

    /**
     * 收缩列表
     * @member
     * @protected
     * @returns {Array<any>}
     */
    protected col: Array<any> =
    [
        {
            render: (h, params) =>
            {
                return h(
                    uMinCard,
                    {
                        props:
                        {
                            data:
                            {
                                name: "A区安全巡检任务",
                                status: 1,
                                type: 1,
                                time: "2020/01/30 ~ 2020/06/30"
                            }
                        }
                    }
                );
            }
        }
    ];

    /**
     * 搜索筛选条件
     * @protected
     * @returns {any}
     */
    protected searchModel: any =
    {
        keyword: ""
    };

    /**
     * 详情页选项卡
     * @protected
     * @returns {Array<any>}
     */
    protected detailTabs: Array<any> =
    [
        {
            label: "概况",
            component: "u-overview"
        },
        {
            label: "动态",
            component: "u-dynamic"
        }
    ];

    /**
     * 是否启用高级搜索
     * @protected
     * @returns {boolean}
     */
    protected isOpenOperation: boolean = false;

    /**
     * 计划
     * @member
     * @protected
     * @returns {any}
     */
    protected planModal =
    {
        isShow: false,
        isEdit: false,
        form:
        {},
        rules:
        {}
    };

    protected async load({ data })
    {
        // 发送查询请求
        const res = await this.service.findPatrol(data);

        // 页数为1时，初始化
        if (data.current === 1)
        {
            const { content: { records } } = res;
            if (records && records.length > 0)
            {
                // 样式高亮
                records[0]._highlight = true;
            }
        }

        return res;
    }

    protected async beforeLoad()
    {
        // 
    }

    protected onRowClick()
    {
        // 
    }

    /**
     * 切换搜索模式
     * @protected
     * @returns {void}
     */
    protected toggleSearchMode(): void
    {
        this.isOpenOperation = !this.isOpenOperation;
    }

    /**
     * 查询方法
     * @protected
     * @returns {void}
     */
    protected search(): void
    {
        const uSwitchTable = (this.$refs["switchTable"]) as any;
        uSwitchTable.onSearch();
    }

    /**
     * 搜索筛选条件重置
     * @protected
     * @returns {void}
     */
    protected searchModelReset(): void
    {
        const obj = this.searchModel;
        for (let k in obj)
        {
            if (obj[k])
            {
                obj[k] = "";
            }
        }
    }

    /**
     * 新增或编辑计划
     * @member
     * @protected
     * @param {boolean} isEdit 是否为编辑模式
     * @returns {void}
     */
    protected showPlanModal(isEdit: boolean): void
    {
        this.planModal.isShow = true;
        this.planModal.isEdit = isEdit;
    }
}
</script>
<style lang="less">
@import "~styles/views/patrol/plan/plan";
</style>

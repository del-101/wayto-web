<template>
    <section class="components-table" :class="showSelectBox && 'show-panel'">
        <!-- <div class="pagetation-box">
            <span class="pagetation-box-total">共 {{recordCount}} {{placeholder || ""}}</span>
            
            <div class="page-wrapper">
                <i
                    class="iconfont icon-page-left"
                    :class="{disabled: pageIndex === 1}"
                    @click="onPageChange(1)">
                </i>
                <i-page
                    ref="page"
                    size="small"
                    :current="pageIndex"
                    :total="recordCount"
                    :page-size="pageSize"
                    @on-change="onPageChange">
                </i-page>
                <i class="iconfont icon-page-right"
                    :class="{disabled: pageIndex === pageCount || pageCount === 0}" 
                    @click="onPageChange(pageCount)">
                </i>
            </div>
        </div> -->
        <!-- :loading="loading" -->
        <i-table
            :columns="columns"
            :data="records"
            ref="tableBox"
            :draggable="draggable"
            :highlight-row="true"
            @on-row-click="onRowClick" 
            @on-row-dblclick="onRowDBClick" 
            @on-selection-change="onSelectionChange"
            @on-select-cancel="onSelectCancel"
            @on-sort-change="onSortChange"
            @on-current-change="onCurrentChange"
            @on-drag-drop="onDragDrop">
        </i-table>

        <template v-if="openPaging">
            <div class="loading-spain" :class="{active: loading}" ref="loadingSpain">
                <i class="iconfont icon-icon_refresh"></i> 数据加载中~
            </div>

            <div class="loading-finish" v-show="allLoaded" ref="loadingFinish">
                没有更多数据了~
            </div>
        </template>

        <div class="components-table-footer">
            <!-- 选中弹框 BEGIN -->
            <u-select-box :is-show-panel="showSelectBox" :selection-count="userSelectCount" :total-count="totalCount" @on-select-all="selctAll">
                <template slot="operat">
                    <slot name="select-operate"></slot>
                </template>
            </u-select-box>
            <!-- 选中弹框 END -->
        </div>
    </section>
</template>

<script lang="ts">
import { component, config, Component } from "uxmid-web";
import { throttle } from "utils/extends";

/**
 * 表示一个页面主体内容组件。
 * @class
 * @version 1.0.0
 */
@component
export default class TableBox extends Component
{
    /**
     * 是否当前选中多少项
     * @protected
     */
    protected showSelectBox: boolean = false;

    /**
     * 当前选中多条数
     * @protected
     */
    protected userSelectCount: number = 0;

    /**
     * 表格列集合
     */
    @config({type: Array, default: () => ([])})
    public columns: Array<any>;

    /**
     * 表格列集合
     */
    @config({default: false})
    public draggable: Boolean;

    /**
     * 合计后面的单位
     */
    @config({default: () => ("")})
    public placeholder: string;

    /**
     * 表格是否显示加载中
     */
    @config({default: false})
    public loading: boolean;

    /**
     * 表格是否开启无限分页模式。
     */
    @config({default: true})
    public openPaging: boolean;

    /**
     * 表格是否显示数据全部加载完成
     */
    @config({default: false})
    public allLoaded: boolean;

    /**
     * 数据记录集合
     */
    @config({type: Array, default: () => ([])})
    public records: Array<any>;

    /**
     * 每页条数, 默认每页10条
     */
    @config({default: 10})
    public pageSize: number;

    /**
     * 当前页码
     */
    @config({default: 1})
    public pageIndex: number;

    /**
     * 总页数
     */
    @config({default: 1})
    public pageCount: number;

    /**
     * 总记录数
     */
    @config({default: 50})
    public recordCount: number;

    /**
     * 是否显示总数
     */
    @config({default: false})
    public showCount: boolean;

    /**
     * 当前选中多条数
     * @protected
     */
    protected get totalCount()
    {
        // 数据源更新时关闭弹窗。
        this.showSelectBox = false;
        this.userSelectCount = 0;

        return this.records && this.records.length || 0;
    }

    /**
     * 双击某一行时触发
     * row表示当前行的数据
     * @protected
     * @returns void
     */
    protected mounted(): void
    {
        this.$nextTick(() =>
        {
            const
                _this: any = this,
                tableBody = _this.$refs.tableBox && _this.$refs.tableBox.$refs.body as HTMLDivElement,
                loadingSpain = _this.$refs.loadingSpain as HTMLDivElement,
                loadingFinish = _this.$refs.loadingFinish as HTMLDivElement;

            if(!this.openPaging || !tableBody || !loadingSpain || !loadingFinish)
            {
                return;
            }
            tableBody.appendChild(loadingSpain);
            tableBody.appendChild(loadingFinish);

            tableBody.addEventListener("scroll", throttle(function(e)
            {
                const scrollTop = tableBody.scrollTop;               // 已滚动距离
                const offsetHeight = tableBody.offsetHeight;         // 元素高度
                const scrollHeight = tableBody.scrollHeight;         // 内部可滚动区域高度
                
                if(offsetHeight + scrollTop >= scrollHeight && !_this.loading)
                {
                    if(_this.pageIndex < _this.pageCount)
                    {
                        _this.onPageChange(_this.pageIndex + 1);
                        // _this.onPageChange(_this.pageIndex);
                        // pageEl.next();
                    }
                }
            }, 200));
        });
    }

    /**
     * 双击某一行时触发
     * row表示当前行的数据
     * @protected
     * @returns void
     */
    protected onRowClick(row: Object): void
    {
        this.$emit("on-row-click", row);
    }

    /**
     * 双击某一行时触发
     * row表示当前行的数据
     * @protected
     * @returns void
     */
    protected onRowDBClick(row: Object): void
    {
        this.$emit("on-row-dblclick", row);
    }

    /**
     * 在多选模式下有效，只要选中项发生变化时就会触发
     * selection表示已选项数据
     * @protected
     * @returns void
     */
    protected onSelectionChange(selection: Array<any>): void
    {
        this.showSelectBox = selection && selection.length > 0;
        this.userSelectCount = selection.length;

        this.$emit("on-selection-change", selection);
    }

    /**
     * 在多选模式下有效，取消选中某一项时触发
     * selection表示已选项数据
     * row表示取消选择的项数据
     * @protected
     * @returns void
     */
    protected onSelectCancel(selection: Array<any>, row: Object): void
    {
        this.$emit("on-select-cancel", selection, row);
    }

    /**
     * 在多选模式下有效，取消选中某一项时触发
     * index表示当前选中页码
     * @protected
     * @returns void
     */
    protected onPageChange(index: Number): void
    {
        if(index < 1)
        {
            return ;
        }
        // 选择页面，，滚动条返回最前面
        // let tableBox = this.$refs.tableBox as any;
        // let tableBody = tableBox.$el.querySelector(".ivu-table-body");
        // if(tableBody)
        // {
        //     tableBody.scrollTo(0,0);
        // }

        this.$emit("on-page-change", index);
    }

    protected onSortChange(payload: any) {
        this.$emit("on-sort-change", payload);
    }

    protected onCurrentChange(currentRow: any ,oldCurrentRow: any)
    {
        this.$emit("on-current-change", currentRow, oldCurrentRow);
    }

    protected onDragDrop(index1: any ,index2: any) {
        this.$emit("on-drag-drop", index1, index2);
    }

    /**
     * 选中全部项
     * @protected
     * @returns void
     */
    protected selctAll(): void
    {
        let tableBox = this.$refs.tableBox as any;

        tableBox.selectAll(true);
    }

    /**
     * 选中全部项
     * @protected
     * @returns void
     */
    protected selctSome(data): void
    {
        let tableBox = this.$refs.tableBox as any;
        // tableBox.selectAll(true);
    }

    /**
     * 选中全部项
     * @protected
     * @returns void
     */
    protected unSelctAll(): void
    {
        let tableBox = this.$refs.tableBox as any;

        tableBox.selectAll(false);
    }
}
</script>

<style lang="less">
@import "./table";
</style>

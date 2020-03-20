<template>
    <section class="page-list">
        <!--页面标题 BEGIN-->
        <div class="page-list-title">
            <i-tabs type="card" @on-click="onTabClick" v-model="selectTab" @on-tab-remove="handleTabRemove">
                <template v-if="routeList && routeList.length > 0 && !custom">
                    <i-tab-pane v-for="(item, index) in routeList"  :closable="index !== 0" :label="item.meta && item.meta.title" :name="item.name" :key="index">
                    </i-tab-pane >
                </template>
                <slot name="head">

                </slot>
            </i-tabs>
        </div>
        <!-- 页面标题 END-->

        <!-- 页面内容部分 BEGIN-->
        <section class="page-list-content">
            <slot></slot>
        </section>
        <!-- 页面内容部分 END-->
    </section>
</template>

<script lang="ts">
import { component, View, config, watch } from "uxmid-web";

@component
export default class PageList extends View
{
    /**
     * 是否展开高级搜索列
     * @config
     * @protected
     */
    @config({type: Boolean, default: false})
    public isOpenOperation: boolean;

    /**
     * 页面标题
     * @config
     * @protected
     */
    @config({type: String})
    public title: string;

    /**
     * 是否自定义头部tab
     * @config
     * @protected
     */
    @config({type: Boolean})
    public custom: boolean;

    /**
     * 选中的name
     * @config
     * @protected
     */
    @config({type: String})
    public active: string;

    /**
     * 组件信息
     * @config
     * @protected
     */
    @config({type: Array, default: (() => [])})
    public componentList: Array<any>;

    /**
     * 当前选中的组件
     * @config
     * @protected
     */
    public selectTab: string = "";

    /**
     * tab列表
     * @config
     * @protected
     */
    public routeList: Array<any> = [];

    /**
     * 点击tab
     * @config
     * @protected
     */
    public onTabClick(name: string): void
    {
        if(!this.custom)
        {
            let index = this.routeList.findIndex(item => item.name === name);
            const routeName = this.routeList[index].name || "",
              query = this.routeList[index].query;
            name !== this.$route.name && this.$router.push({ name: routeName, query: query });
            this.selectTab = name;
        }
        else
        {
            this.$emit("onTabClick", name);
        }

    }

    /**
     * 删除table
     * @config
     * @protected
     */
    public handleTabRemove(name: string): void
    {
        if(!this.custom)
        {
            let index = this.routeList.findIndex(item => item.name === name);

            if (index !== -1)
            {
                this.routeList.splice(index, 1);
                this.$router.push({name: this.routeList[index - 1].name});
            }
        }
        else
        {
            this.$emit("onTabRemove", name);
        }
        
    }

    /**
     * 当路由发生变化的时候操作。
     * @protected
     * @param {any} - to 当前路由实例。
     * @returns {void}
     */
    @watch("$route", {deep: true, immediate: true})
    protected updateOpen(to: any): void
    {
        this.routeList = this.$store.getters["global/getTabList"] || [];

        if(!this.routeList.find(item =>  item && item.name === this.$route.name))
        {
            this.routeList.push({
                name: this.$route.name,
                meta: this.$route.meta && this.$route.meta || {},
                query: this.$route.query && this.$route.query || null
            });
        }

        this.selectTab = this.$route.name;

        // this.$store.commit("global/SET_TAB_NAME_LIST", this.routeList);

    }

    /**
     * 当路由发生变化的时候操作。
     * @protected
     * @param {any} - to 当前路由实例。
     * @returns {void}
     */
    @watch("active", {deep: true, immediate: true})
    protected onActiveChange(name: string): void
    {
        if(name)
        {
            this.selectTab = name;
        }

    }
}
</script>

<style lang="less">
@import "./page-list";
</style>

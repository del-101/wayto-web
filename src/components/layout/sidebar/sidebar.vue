<template>
    <i-sider v-model="isCollapsed"  collapsible :collapsed-width="72" :width="192" :class="isCollapsed ? 'collapsed' : ''" >
        <div class="layout-sidebar-logo" @click="toHome">
            <!-- <img class="logo-img" src="~assets/logo-sidebar.png" alt="logo"> -->
            <h1 class="logo-text">DEMO</h1>
        </div>
        <i-menu
            class="layout-sidebar-menu"
            width="auto"
            ref="menu"
            :accordion="true"
            :open-names="open"
            :active-name="activeName"
            @on-select="onMenuSelect"
        >
            <i-menu-item v-for="(item, i) in menus" :key="i" :name="item.name">
                <i :class="item.icon"></i>
                <span>{{item.label}}</span>
            </i-menu-item>
        </i-menu>
        <!-- 触发器 BEGIN-->
        <div class="trigger"  slot="trigger" @click="isCollapsed = !isCollapsed">
            <i class="iconfont iconicon_xitongguanli"></i>
        </div>
        <!-- 触发器 END-->
    </i-sider>
</template>

<script lang="ts">
import { component, Component, watch } from "uxmid-web";

/**
 * 表示一个公共侧边栏组件。
 * @class
 * @version 1.0.0
 */
@component
export default class Sidebar extends Component
{
    /**
     * 获取和设置展开当前菜单。
     * @protected
     * @property
     * @returns {boolean}
     */
    protected isCollapsed: boolean = false;

    /**
     * 获取当前需要高亮的菜单路径。
     * @protected
     * @property
     * @returns {string}
     */
    protected get activeName(): string
    {
        let path: string = this.$route.path,
            paths: Array<string> = path.replace(/^\/\//, "").split("/");

        return paths[1];
    }

    /**
     * 获取和设置当前导航的打开窗口。
     * @protected
     * @property
     * @returns {Array<string>}
     */
    protected open: Array<string> = [];

    /**
     * 模块列表
     * @protected
     * @property
     * @returns {Array<any>}
     */
    protected menus: Array<any> =
    [
        {
            name: "system",
            label: "系统设置",
            icon: "iconfont iconicon_xitongguanli"
        },
        {
            name: "patrol",
            label: "巡查管理",
            icon: "iconfont iconicon_xunjianguanli"
        }
    ];

    /**
     * 当路由发生变化的时候操作。
     * @protected
     * @param {any} - to 当前路由实例。
     * @returns {void}
     */
    @watch("$route", {deep: true, immediate: true})
    protected updateOpen(to: any): void
    {
        let path: string = this.$route.path,
            paths: Array<string> = path.replace(/^\/waterleakage\//, "").split("/");

        this.open = [paths[0]];

        this.$nextTick(() => (this.$refs.menu as any).updateOpened());
    }

    /**
     * 当选择菜单项时调用。
     * @protected
     * @param  {string} path 菜单路径。
     * @returns {void}
     */
    protected onMenuSelect(name: string): void
    {
        name !== this.$route.name && this.$router.push({ name });
    }

    /**
     * 返回首页。
     * @protected
     * @returns {void}
     */
    protected toHome(): void
    {
        this.$router.push("/home");
    }
}
</script>

<style lang="less" scoped>
    @import "./sidebar";
</style>

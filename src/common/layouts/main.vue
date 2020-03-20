<template>
    <i-layout class="layout">
        <div class="layout-context">
            <div class="layout-menu">
                <u-sidebar class="layout-sidebar"></u-sidebar>
            </div>
            <div class="layout-context-warp">
                <u-header :user="user"
                    @on-logout="onLogout"
                    @on-update-logs="onUpdateLogs"
                    @on-update-profile="onUpdateProfile"
                    @on-update-password="onUpdatePassword"
                ></u-header>
                <slot>
                    <router-view></router-view>
                </slot>
            </div>
        </div>
        <!-- <u-update-user-password v-model="isUpdatePassword"></u-update-user-password> -->
    </i-layout>
</template>

<script lang="ts">
import { component, Component } from "uxmid-web";
import { Broadcast,BroadcastManager } from "uxmid-core";
import { IUserProfile } from "models";
import Header from "components/layout/header";
import Sidebar from "components/layout/sidebar";
// import updateUserPassword from "src/components/business/user-password-modal/user-password-modal.vue";
import ApplicationContext from "application/context";

/**
 * 表示一个包含头部的布局母版。
 * @class
 * @version 1.0.0
 */
@component({
    components:
    {
        "u-header": Header,
        "u-sidebar": Sidebar
        // "u-update-user-password": updateUserPassword
    }
})
export default class MainLayout extends Component
{
    /**
     * 获取或设置一个布尔值，表示是否需要进行资料维护。
     * @protected
     * @member
     * @returns boolean
     */
    protected isUpdateProfile: boolean = false;

    /**
     * 获取或设置一个布尔值，表示是否需要进行资料维护。
     * @protected
     * @member
     * @returns boolean
     */
    protected isUpdateLogs: boolean = false;

    /**
     * 获取或设置一个布尔值，表示是否需要进行密码修改。
     * @protected
     * @member
     * @returns boolean
     */
    protected isUpdatePassword: boolean = false;

    /**
     * 获取当前用户的信息。
     * @protected
     * @property
     * @returns IUserProfile
     */
    protected get user(): IUserProfile
    {
        return this.$store.getters["user/profile"] || {};
    }

    /**
     * 当用户点击退出登录时调用。
     * @protected
     * @returns void
     */
    protected onLogout(): void
    {
        this.$store.dispatch("user/logout");
        this.$router.push("/login");
    }

    /**
     * 当用户点击修改资料时调用。
     * @protected
     * @returns void
     */
    protected onUpdateProfile(): void
    {
        this.isUpdateProfile = true;
    }

    /**
     * 当用户点击修改密码时调用。
     * @protected
     * @returns void
     */
    protected onUpdatePassword(): void
    {
        this.isUpdatePassword = true;
    }

    /**
     * 当用户点击我的动态时调用。
     * @protected
     * @returns void
     */
    protected onUpdateLogs(): void
    {
        this.isUpdateLogs = true;
    }
}
</script>

<style lang="less">
    @import "~styles/index.less";
</style>

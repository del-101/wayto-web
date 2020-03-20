<template>
    <i-header class="layout-header">
        <h1 class="layout-header-textlogo" @click="toHome">DEMO</h1>
        <aside class="layout-header-side" v-if="detail">
            <i-row class="layout-header-user" type="flex" justify="end" align="middle">
                <i-avatar class="user-avatar ml20" :src="detail.filePath || require('assets/default-user.jpg')">{{detail.realname}}</i-avatar>
                <i-dropdown trigger="click" placement="bottom-end" @on-click="onDropdownClick">
                    <a class="username" href="javascript:void(0)">
                        <span>欢迎您，{{detail.orgInfo && `${detail.orgInfo.name} > `}} {{ detail.realname || detail.username }} </span>
                        <i class="iconfont iconicon_right"></i>
                    </a>
                    <i-dropdown-menu class="user-options-dropdown" slot="list">
                        <!-- <i-dropdown-item name="update-password">修改密码</i-dropdown-item> -->
                        <i-dropdown-item name="logout">安全退出</i-dropdown-item>
                    </i-dropdown-menu>
                </i-dropdown>
            </i-row>
        </aside>
    </i-header>
</template>

<script lang="ts">
import { IUserProfile } from "models";
import { component, config, Component, watch } from "uxmid-web";
const isDebug = process.env.NODE_ENV === "development";

/**
 * 表示一个公共头部组件。
 * @class
 * @version 1.0.0
 */
@component
export default class Header extends Component
{
    /**
     * 获取用户详情数据
     * @private
     * @returns {any}
     */
    private detail: any = {};

    /**
     * 获取或设置用户信息。
     * @public
     * @config
     * @returns {IUserProfile}
     */
    @config({required: true, type: Object})
    public user: IUserProfile;

    /**
     * 当点击用户下拉选项时调用。
     * @protected
     * @param  {string} name 选项名称。
     * @returns void
     */
    protected onDropdownClick(name: string): void
    {
        const eventName = `on-${name}`;
        this.$emit(eventName);
    }

    /**
     * 返回Saas首页。
     * @protected
     * @returns {void}
     */
    protected toHome(): void
    {
        this.$router.push("/home");
    }

    /**
     * 挂载之后执行
     */
    protected mounted(): void
    {
        this.detail = this.$store.state.user.profile;
    }
}
</script>

<style lang="less" scoped>
    @import "./header";
    .drop-arrow
    {
        width: 10px;
    }
</style>

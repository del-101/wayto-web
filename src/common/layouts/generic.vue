<template>
    <i-layout class="layout-generic ivu-layout-has-sider">
        <i-content class="layout-generic-content">
            <slot>
                <router-view></router-view>
            </slot>
        </i-content>
    </i-layout>
</template>

<script lang="ts">
import { component, Component } from "uxmid-web";

/**
 * 表示一个包含头部和侧边条的布局母版。
 * @class
 * @version 1.0.0
 */
@component
export default class GenericLayout extends Component
{
}
</script>

<template>
    <div :class="`v-timeline ${!title && 'hide-padding'}`">
        <!-- 标题 BEGIN -->
        <div :class="`title ${!title && 'hide'}`">{{title}}</div>
        <!-- 标题 END -->

        <slot></slot>
    </div>
</template>
<script lang="ts">
import { View, component, config } from "uxmid-web";
@component
export default class Timeline extends View
{
    /**
     * 标题
     */
    @config({ required: false, type: String, default: "" })
    protected title;
}
</script>
<style lang="less">
@import "./timeline.less";
</style>

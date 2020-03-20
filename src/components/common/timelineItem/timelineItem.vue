<template>
    <div class="v-timeline-item">
        <!-- 时间线左侧时间 BEGIN -->
        <div class="time">
            <slot name="time">时间</slot>
        </div>
        <!-- 时间线左侧时间 END -->

        <!-- 时间线右侧内容区 BEGIN -->
        <div class="content">
            <slot name="content">时间线内容区</slot>
        </div>
        <!-- 时间线右侧内容区 END -->

        <!-- 圆 BEGIN -->
        <div class="round"></div>
        <!-- 圆 END -->
    </div>
</template>
<script lang="ts">
import { View, component } from "uxmid-web";
@component
export default class TimelineItem extends View
{
}
</script>
<style lang="less">
@import "./timelineItem.less";
</style>

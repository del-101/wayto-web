<template>
    <span class="table-style-switch-btns">
        <button class="display-btn display-columun" :class="{'active': !isRowStyle}" @click="isRowStyle = false"></button>
        <button class="display-btn display-row" :class="{'active': isRowStyle}" @click="isRowStyle = true"></button>
    </span>
</template>

<script lang="ts">
import { component, View, config } from "uxmid-web";

@component
export default class TableStyleSwitch extends View
{
    /**
     * v-model
     */
    @config({type: Boolean, default: false})
    public value: boolean;
    
    /**
     * 是否表格形式。
     */
    protected get isRowStyle(): boolean
    {
        return this.value;
    }
    
    protected set isRowStyle(value: boolean)
    {
        this.$emit("input", value);
    }
}
</script>

<style lang="less">
@import "./table-style-switch";
</style>

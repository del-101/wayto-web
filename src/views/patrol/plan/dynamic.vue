<template>
    <div class="v-patrol plan dynamic">
        <u-timeline class="timeline">
            <u-timeline-item v-for="(item, i) in records" :key="i">
                <div slot="time">{{item.time}}</div>
                <div slot="content">
                    <p>{{item.name}}<span class="normal">（正常）</span></p>
                    <p>巡查人：{{item.worker}}</p>
                    <p>上报隐患：{{item.code}}</p>
                    <ul class="photos">
                        <li v-for="(src, i) in item.list" :key="i"><img :src="src" alt="" v-previewer></li>
                    </ul>
                </div>
            </u-timeline-item>
        </u-timeline>
    </div>
</template>
<script lang="ts">
import { View, component } from "uxmid-web";

@component
export default class Dynamic extends View
{
    /**
     * 默认头像
     * @member
     * @protected
     * @returns {any}
     */
    protected defaultHead: any = require("assets/default-user.jpg");

    /**
     * 巡查记录
     * @member
     * @protected
     * @returns {Array<any>}
     */
    protected records: Array<any> =
    [
        {
            time: "2019-06-30  15:30",
            name: "三楼教室外防护网",
            worker: "李华（18600000000）",
            code: "YH20190560001",
            list: [this.defaultHead, this.defaultHead, this.defaultHead]
        },
        {
            time: "2019-06-30  15:30",
            name: "三楼教室外防护网",
            worker: "李华（18600000000）",
            code: "YH20190560001",
            list: [this.defaultHead, this.defaultHead, this.defaultHead]
        },
        {
            time: "2019-06-30  15:30",
            name: "三楼教室外防护网",
            worker: "李华（18600000000）",
            code: "YH20190560001",
            list: [this.defaultHead, this.defaultHead, this.defaultHead]
        }
    ];
}
</script>
<style lang="less">
@import "~styles/views/patrol/plan/dynamic";
</style>

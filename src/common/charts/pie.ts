/*!
 * Authors:
 *      yyhugh
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved.
 */

import { deepCopy } from "common/utils";

/**
 * 获取空心饼图配置
 * @param {Array<any>} data 数据源
 * @param {boolean} isMock 使用模拟数据
 * @param {string} graphic 中心总数名称
 * @param {Array<string>} color 配色
 * @returns {any}
 */
export function getHollowPieConfig(params): any
{
    let { data, isMock, color } = params;

    const pie =
    {
        color: ["#fbd534", "#4a7ffe", "#04d1c6", "#4ed066", "#6a7ca4"],
        title:
        {
            textStyle: {
                fontSize: 14,
                fontWeight: "normal",
                color: "#182334"
            },
            top: 0,
            left: 16
        },
        legend:
        {
            data: [
                { icon: "circle", name: "待处理", textStyle: { fontSize: 14, padding: [0,0,0,-10]} },
                { icon: "circle", name: "处理中", textStyle: { fontSize: 14, padding: [0,0,0,-10]} },
                { icon: "circle", name: "已处理", textStyle: { fontSize: 14, padding: [0,0,0,-10]} },
                { icon: "circle", name: "已完成", textStyle: { fontSize: 14, padding: [0,0,0,-10]} },
                { icon: "circle", name: "无效", textStyle: { fontSize: 14, padding: [0,0,0,-10]}}
            ],
            orient: "vertical",
            right: "10%",
            top: "middle",
            borderRadius: 50,
            textStyle:
            {
                color: "#5D6673",
                rich:
                {
                    a:
                    {
                        width: 45,
                        fontSize: 14,
                        verticalAlign: "middle",
                        padding: [0, 28, 0, 5]
                    },
                    b:
                    {
                        fontSize: 14,
                        verticalAlign: "middle",
                        padding: [6, 0, 6, 0]
                    },
                    c:
                    {
                        fontSize: 14,
                        verticalAlign: "middle",
                        color: "#A6ABB5",
                        padding: [6, 0, 6, 0]
                    }
                }
            },
            itemHeight: 8,
            formatter(name: string)
            {
                if (isMock)
                {
                    data = pie.series[0].data;
                }
                let total = 0;
                let target;
                for (let i = 0, l = data.length; i < l; i++)
                {
                    total += data[i].value;
                    if (data[i].name === name)
                    {
                        target = data[i].value;
                    }
                }
                return `{a|${name}}{b|${target}}{c|（${((target / total) * 100).toFixed(2)}%）}`;
            }
        },
        grid:
        {
            bottom: 0,
            containLabel: true
        },
        tooltip:
        {
            trigger: "item",
            label: { seriesName: "item" },
            formatter: "{b}<br/>总数: {c} ({d}%)",
            backgroundColor: "#fff",
            textStyle: {
                color: "#5D6673"
            },
            extraCssText: "box-shadow: 0px 0px 10px 0px rgba(34,34,34,0.2);border-radius:2px;"
        },
        series:
        [
            {
                name: "隐患总数",
                type: "pie",
                radius: ["35%", "50%"],
                center: ["30%", "45%"],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        formatter: "{b}：{d}% ",
                        borderColor: "#E0E0E0",
                        show: true,
                        color: "#5D6673",
                        fontSize: 12
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: "#E0E0E0"
                        }
                    }
                },
                data: [
                    { value: 30, name: "待处理" },
                    { value: 60, name: "处理中"},
                    { value: 40, name: "已处理"},
                    { value: 90, name: "已完成"},
                    { value: 48, name: "无效" }
                ]
            }
        ]
    };

    const config = deepCopy<any>(pie);

    if (!isMock)
    {
        config.series[0].data = [];
        config.legend.data = [];
        data.forEach(item =>
        {
            const { name } = item;
            config.series[0].data.push(item);
            config.legend.data.push({ icon: "circle", name, textStyle: { fontSize: 14, padding: [0,0,0,-10]} });
        });
    }

    if (color)
    {
        config.color = color;
    }

    return config;
}

/**
 * 获取中心带总数饼图配置
 * @param {Array<any>} data 数据源
 * @param {boolean} isMock 使用模拟数据
 * @param {string} graphic 中心总数名称
 * @param {Array<string>} color 配色
 * @returns {any}
 */

export function getCenterTotalPieConfig(params): any
{
    const { data, isMock, graphic, color, title } = params;

    const pie =
    {
        color: ["#fbd534", "#4a7ffe", "#04d1c6", "#4ed066", "#6a7ca4"],
        title:
        {
            textStyle:
            {
                fontSize: 14,
                fontWeight: "400",
                color: "#182334"
            },
            top: 15,
            left: 20,
            text: ""
        },
        graphic:
        [
            {
                type: "text",
                left: "center", // 相对父元素居中
                top: "39%",  // 相对父元素居中
                style:
                {
                    fill: "#5D6673",
                    text: ["总数量"],
                    font: "14px Microsoft YaHei"
                }
            },
            {
                type: "text",
                left: "center", // 相对父元素居中
                top: "46%",  // 相对父元素居中
                style:
                {
                    fill: "#182334",
                    text: ["600"],
                    font: "bold 22px Microsoft YaHei"
                }
            }
        ],
        legend:
        {
            data:
            [
                { icon: "circle", name: "待派发", textStyle: { fontSize: 14, padding: [0, 5, 0, -10]}},
                { icon: "circle", name: "待处理", textStyle: { fontSize: 14, padding: [0, 5, 0, -10]} },
                { icon: "circle", name: "处理中", textStyle: { fontSize: 14, padding: [0, 5, 0, -10]} },
                { icon: "circle", name: "待审核", textStyle: { fontSize: 14, padding: [0, 5, 0, -10]} },
                { icon: "circle", name: "已完成", textStyle: { fontSize: 14, padding: [0, 5, 0, -10]} }
            ],
            bottom: 0,
            borderRadius: 50,
            textStyle: { color: "#5D6673" },
            itemHeight: 8
        },
        grid:
        {
            bottom: 0,
            containLabel: true
        },
        tooltip:
        {
            trigger: "item",
            label: { seriesName: "item" },
            formatter: "{b}<br/>总数: {c} ({d}%)",
            backgroundColor: "#fff",
            textStyle:
            {
                color: "#5D6673"
            },
            extraCssText: "box-shadow: 0px 0px 10px 0px rgba(34,34,34,0.2);border-radius:2px;"
        },
        series:
        [
            {
                name: "隐患总数",
                type: "pie",
                radius: ["35%","50%"],
                center: ["50%", "45%"],
                avoidLabelOverlap: false,
                label:
                {
                    normal:
                    {
                        formatter: "{b}：{d}% ",
                        borderColor: "#E0E0E0",
                        show: true,
                        color: "#5D6673",
                        fontSize: 12
                    }
                },
                labelLine:
                {
                    normal:
                    {
                        lineStyle:
                        {
                            color: "#E0E0E0"
                        }
                    }
                },
                data:
                [
                    { value: 48, name: "待派发" },
                    { value: 30, name: "待处理" },
                    { value: 60, name: "处理中"},
                    { value: 40, name: "待审核"},
                    { value: 90, name: "已完成"}
                ]
            }
        ]
    };

    const config = deepCopy<any>(pie);

    let total = 0;

    if (!isMock)
    {
        config.series[0].data = [];
        config.legend.data = [];
        data.forEach(item =>
        {
            const { name, value } = item;
            config.series[0].data.push(item);
            config.legend.data.push({ icon: "circle", name, textStyle: { fontSize: 14, padding: [0, 5, 0, -10] } });
            total += value;
        });
    }

    if (graphic)
    {
        config.graphic[0].style.text = [graphic || "总数"];
        config.graphic[1].style.text = [total || "0"];
    }

    if (color)
    {
        config.color = color;
    }

    if (title)
    {
        config.title.text = title;
    }

    return config;
}

/**
 * 获取中心进度饼图配置
 * @param {Array<any>} data 数据源
 * @param {boolean} isMock 使用模拟数据
 * @param {string} graphic 中心总数名称
 * @param {Array<string>} color 配色
 * @returns {any}
 */
export function getCenterProgressPieConfig(params): any
{
    const { data, isMock, graphic, color, title } = params;

    const pie =
    {
        color: ["#4ed066", "#6a7ca4"],
        title:
        {
            textStyle:
            {
                fontSize: 14,
                fontWeight: "400",
                color: "#182334"
            },
            top: 15,
            left: 20,
            text: ""
        },
        graphic:
        [
            {
                type: "text",
                left: "27%", // 相对父元素居中
                top: "35%",  // 相对父元素居中
                style:
                {
                    fill: "#182334",
                    text: ["600"],
                    font: "bold 22px Microsoft YaHei"
                }
            },
            {
                type: "text",
                left: "27%", // 相对父元素居中
                top: "47%",  // 相对父元素居中
                style:
                {
                    fill: "#5D6673",
                    text: ["总数量"],
                    font: "14px Microsoft YaHei"
                }
            }
        ],
        legend:
        {
            data:
            [
                { icon: "circle", name: "待派发", textStyle: { fontSize: 14, padding: [0, 5, 0, -10]}},
                { icon: "circle", name: "待处理", textStyle: { fontSize: 14, padding: [0, 5, 0, -10]} },
                { icon: "circle", name: "处理中", textStyle: { fontSize: 14, padding: [0, 5, 0, -10]} },
                { icon: "circle", name: "待审核", textStyle: { fontSize: 14, padding: [0, 5, 0, -10]} },
                { icon: "circle", name: "已完成", textStyle: { fontSize: 14, padding: [0, 5, 0, -10]} }
            ],
            orient: "vertical",
            top: "30%",
            right: "25%",
            borderRadius: 50,
            textStyle: { color: "#5D6673" },
            itemHeight: 0,
            selectedMode: false,
            formatter: function (name) {
                console.log("i");
                if (data)
                {
                    let count = 0;
                    data.forEach(item =>
                    {
                        if (item.name === name)
                        {
                            count = item.value;
                        }
                    });
                    return `${name}：${count}`;
                }
                else
                {
                    return name;
                }
            }
        },
        grid:
        {
            bottom: 0,
            containLabel: true
        },
        tooltip:
        {
            trigger: "item",
            label: { seriesName: "item" },
            formatter: "{b}<br/>总数: {c} ({d}%)",
            backgroundColor: "#fff",
            textStyle:
            {
                color: "#5D6673"
            },
            extraCssText: "box-shadow: 0px 0px 10px 0px rgba(34,34,34,0.2);border-radius:2px;"
        },
        series:
        [
            {
                name: "隐患总数",
                type: "pie",
                radius: ["35%","50%"],
                center: ["30%", "42%"],
                avoidLabelOverlap: false,
                label:
                {
                    show: false
                },
                labelLine:
                {
                    normal:
                    {
                        lineStyle:
                        {
                            color: "#E0E0E0"
                        }
                    }
                },
                data:
                [
                    { value: 48, name: "待派发" },
                    { value: 30, name: "待处理" },
                    { value: 60, name: "处理中"},
                    { value: 40, name: "待审核"},
                    { value: 90, name: "已完成"}
                ]
            }
        ]
    };

    const config = deepCopy<any>(pie);

    let total = 0;
    let pending = 0;

    if (!isMock)
    {
        config.series[0].data = [];
        config.legend.data = [];
        data.forEach(item =>
        {
            const { name, value } = item;
            config.series[0].data.push(item);
            config.legend.data.push({ icon: "circle", name, textStyle: { fontSize: 14, padding: [5, 5, 5, -10] } });
            if (name.includes("总"))
            {
                total = value;
            }
            else
            {
                pending = value;
            }
        });
    }

    if (graphic)
    {
        const end = total - pending;
        const endScale = end / total * 100 >> 0;
        config.graphic[0].style.text = endScale + "%";
        config.graphic[1].style.text = [graphic || "总数"];
    }

    if (color)
    {
        config.color = color;
    }

    if (title)
    {
        config.title.text = title;
    }

    return config;
}

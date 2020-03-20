/*!
 * Authors:
 *      yyhugh
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved.
 */

import { Type } from "uxmid-core";
import { IFilterItem } from "models";

/**
 * 替换字符串占位符
 * @function
 * @version 1.0.0
 * @param {string} str 传入需要处理的字符串
 * @param {Array | Object} args 传入字符串中要被替换的参数。类型为数组或者object
 * @returns {string}
 */
export function formatString(str: string, args: Array<any> | any): string
{
    let tempStr = str;

    if (arguments.length > 1)
    {
        if (Type.isObject(args))
        {
            for (let key in args)
            {
                if (args[key] !== undefined)
                {
                    let reg = new RegExp("({" + key + "})", "g");
                    tempStr = tempStr.replace(reg, args[key]);
                }
            }
        }

        if (Type.isArray(args))
        {
            for (let i = 0; i < args.length; i++)
            {

                if (args[i] !== undefined)
                {
                    let reg = new RegExp("({)" + i + "(})", "g");
                    tempStr = tempStr.replace(reg, args[i]);
                }
            }
        }
    }
    return tempStr;
}

/**
 * 根据过滤条件的数据类型编码条件值。
 * @param  {IFilter} filter 过滤条件实例。
 * @returns {string} 编码后的字符串。
 */
export function encodeFilterValue(filter: IFilterItem): string
{
    // 如果没有设置类型，则默认做字符串处理
    let filterType = filter.type || String;
    let filterValue = "";
    
    if(filterType === Array || filterType === Object)
    {
        // 如果是数组或者JSON对象，则序列化处理
        filterValue = JSON.stringify(filter.value);
    }
    else
    {
        // 其他数据类型强制转换为字符串
        if(!Type.isEmptyObject(filter.value))
        {
            filterValue = String(filter.value);
        }
    }
    
    if(filterValue)
    {
        filterValue = encodeURIComponent(filterValue);
    }

    return filterValue;
}

/**
 * 根据过滤条件的数据类型解码条件值。
 * @param  {IFilter} filter 过滤条件实例。
 * @param  {string} value 需要解码的字符串值。
 * @returns {any} 解码后的真实数据。
 */
export function decodeFilterValue(filter: IFilterItem, value: any): any
{
    // 如果没有设置类型，则默认做字符串处理
    let filterType = filter.type || String;
    let filterValue: any;

    // 解码字符串值
    value = decodeURIComponent(value);

    switch(filterType)
    {
        case String:
        case Date:
        {
            filterValue = value;

            break;
        }
        case Number:
        {
            filterValue = parseFloat(value);

            break;
        }
        case Boolean:
        {
            filterValue = (value === "true" || value === "1");

            break;
        }
        default:
        {
            filterValue = JSON.parse(value);

            break;
        }
    }

    return filterValue;
}

/**
 * 函数节流，在监听频繁触发函数（scroll, touchmove, mouseover等）时调用，
 * @param {Function} func 
 * @param {numebr} wait 
 * @param {number} mustRun
 * @returns {any}
 */
export const throttle = function(func: Function, wait: number): any
{
    let timeout;
    return () =>
    {
        let context = this;
        let args = arguments;

        if (!timeout)
        {
            timeout = setTimeout(() =>
            {
                timeout = null;
                func.apply(context, args);
            }, wait);
        }
    };
};

/**
 * 深拷贝
 * @param {T} target 拷贝目标
 * @returns {T}
 */
export function deepCopy<T>(target): T
{
    const copyedObjs = []; // 此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象 
    function _deepCopy(target)
    {
        if ((typeof target !== "object") || !target)
        {
            return target;
        }
        for (let i = 0 ; i < copyedObjs.length; i++)
        {
            if (copyedObjs[i].target === target)
            {
                return copyedObjs[i].copyTarget;
            }
        }
        let obj = {};
        if (Array.isArray(target))
        {
            obj = []; // 处理target是数组的情况 
        }
        copyedObjs.push({target: target, copyTarget: obj});
        Object.keys(target).forEach(key =>
        {
            if (obj[key])
            {
                return;
            }
            obj[key] = _deepCopy(target[key]);
        });
        return obj;
    }
    return _deepCopy(target);
}

export default
{
    formatString,
    encodeFilterValue,
    decodeFilterValue,
    throttle,
    deepCopy
};

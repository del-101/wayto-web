/**
 * 表示一个查询条件的定义。
 * @interface
 * @version 1.0.0
 */

import IFilterItem from "./filter-item";

export default interface IFilter
{
    /**
     * 获取或设置筛选条件集合。
     * @member
     * @returns string
     */
    [prop: string]: IFilterItem;
}

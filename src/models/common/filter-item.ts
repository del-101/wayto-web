/**
 * 表示一个查询条件的定义。
 * @interface
 * @version 1.0.0
 */
export default interface IFilterItem
{
    /**
     * 获取或设置条件(字段)名。
     * @member
     * @returns string
     */
    name?: string;
    
    /**
     * 获取或设置条件(字段)类型。
     * @member
     * @returns "string" | "number" | "boolean" | "date" | "array" | "object"
     */
    type: String | Number | Boolean | Date | Array<any> | Object;

    /**
     * 获取或设置操作符。
     * @member
     * @returns string
     */
    // operator?: Operator;
    
    /**
     * 获取或设置条件(字段)值。
     * @member
     * @returns string
     */
    value: any;

    /**
     * 获取或设置条件的附属信息。
     * @member
     * @type {any}
     */
    extends?: any;
}

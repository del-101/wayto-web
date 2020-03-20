/**
 * 表示一个分页查询结果的定义。
 * @interface
 * @version 1.0.0
 */
export default interface IPagingResult<T>
{

    /**
     * 获取或设置额外参数。
     * @member
     * @returns any
     */
    extras: any;
    
    /**
     * 获取或设置记录列表。
     * @member
     * @returns Array<T>
     */
    content: Array<T> | any;
}

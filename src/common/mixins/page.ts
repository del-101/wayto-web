import { Type, Logger } from "uxmid-core";
import { component, Component } from "uxmid-web";
import { ISearchModel, IPagingResult, IFilterModel, IFilter } from "models";
import { decodeFilterValue } from "common/utils/extends";

/**
 * 一个 Vue 混入类，提供分页的功能。
 * @class
 * @version 1.0.0
 */
@component
export default class Paging extends Component
{
    /**
     * 获取或设置当前是否正在搜索中。
     * @protected
     * @member
     * @returns boolean
     */
    protected searching: boolean = false;

    /**
     * 获取或设置当前是否正在加载中。
     * @protected
     * @member
     * @returns boolean
     */
    protected loading: boolean = false;

    /**
     * 获取或设置当前是否正在加载中。
     * @protected
     * @member
     * @returns boolean
     */
    protected allLoaded: boolean = false;

    /**
     * 获取或设置是否记住页码和筛选参数。
     * @protected
     * @member
     * @returns boolean
     */
    protected isRestoreRoutes: boolean = true;

    /**
     * 获取或设置当前页码。
     * @protected
     * @member
     * @returns number
     */
    protected pageIndex: number = 1;

    /**
     * 获取或设置分页大小。
     * @protected
     * @member
     * @returns number
     */
    protected pageSize: number = 15;

    /**
     * 获取或设置总页数。
     * @protected
     * @member
     * @returns number
     */
    protected pageCount: number = 0;

    /**
     * 获取或设置总记录数。
     * @protected
     * @member
     * @returns number
     */
    protected recordCount: number = 0;

    /**
     * 获取或设置当前组件的固定参数。
     * @protected
     * @member
     * @returns Object
     */
    protected params: any = {};

    /**
     * 获取或设置过滤条件。
     * @protected
     * @member
     * @returns Array<IFilter>
     */
    protected filters: any = {};

    /**
     * 获取或设置待过滤条件。
     * @protected
     * @type {IFilter}
     */
    protected formItems: IFilter = {};

    /**
     * 获取或设置排序成员。
     * @protected
     * @member
     * @returns Array<ISorting>
     */
    protected sortings: any = {};

    /**
     * 获取或设置当前页需要展示的数据。
     * @protected
     * @member
     * @returns Array<any>
     */
    protected records: Array<any> = [];

    /**
     * 筛选条件是否相应路由。
     * @protected
     * @type {boolean}
     */
    protected isResponseRoute: boolean = true;

    /**
     * 创建组件时调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected created(): void
    {
        // 还原路由参数
        this.isResponseRoute && this.restoreRoute();
        this.isRestoreRoutes && this.restoreRoute();
    }

    /**
     * 创建组件后调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected async mounted()
    {

        await this.beforLoadRecords();
        
        this.$nextTick(() =>
        {
            this.search();
        });
    }

    /**
     * 当点击搜索按钮时调用的方法。
     * @returns Promise
     */
    protected async onSearch(): Promise<void>
    {
        // 当执行搜索时候，当前页码应该重置为第一页
        this.pageIndex = 1;

        try
        {
            this.searching = true;
            this.allLoaded = false;

            this.records = [];

            // 执行查询
            await this.search();
        }
        finally
        {
            this.searching = false;
        }
    }

    /**
     * 当页码(pageIndex)变更时调用。
     * @param  {number} index?
     * @returns void
     */
    protected onPageChange(index?: number): void
    {
        this.pageIndex = index;

        // index === 1 && (this.records = []);

        // 执行查询
        this.search();
    }

    /**
     * 当每页数量(pageSize)变更时调用。
     * @param  {number} index?
     * @returns void
     */
    protected onPageSizeChange(pageSize?: number): void
    {
        this.pageSize = pageSize;
        this.onPageChange(1);
    }

    /**
     * 执行数据查询。
     * @async
     * @returns Promise
     */
    protected async search(): Promise<void>
    {
        if(!this.loading)
        {
            // 更新路由参数
            // this.isResponseRoute && this.updateRoute();

            // 防止重复操作
            this.loading = true;

            try
            {
                let response = await this.loadRecords(this.getSearchModel());

                if(response)
                {
                    let { content: result, extras } = response;

                    this.pageCount = +extras.pages || 0;
                    this.recordCount = +extras.total || 0;

                    if(this.pageIndex === 1)
                    {
                        this.records = this.records.concat(result.records);
                        this.loading = false;

                        if(this.pageIndex === this.pageCount)
                        {
                            this.allLoaded = true;
                        }
                    }

                    if(this.pageIndex > 1 && extras.total > this.records.length)
                    {
                        setTimeout(() =>
                        {
                            this.records = this.records.concat(result.records);

                            this.loading = false;

                            if(this.pageIndex === this.pageCount)
                            {
                                this.allLoaded = true;
                            }
                        }, 1500);
                    }

                    // 处理当前正在删除第二页的东西，结果第二页删完了，自动回退到第一页
                    if(this.records.length === 0  && this.pageIndex > 1)
                    {
                        this.loading = false;
                        this.pageIndex = this.pageIndex - 1;
                        this.search();
                    }
                }
            }
            catch(error)
            {
                Logger.error(this, error.message);

                this.$message.error(error.message);
                this.loading = false;
            }
            finally
            {
                // this.loading = false;
            }
        }
    }

    /**
     * 根据查询模型加载数据之前。
     * @virtual
     * @async
     * @returns Promise
     */
    protected async beforLoadRecords(): Promise<any>
    {
        return null;
    }

    /**
     * 根据查询模型加载数据。
     * @virtual
     * @async
     * @param  {ISearchModel} model 查询模型。
     * @returns Promise
     */
    protected async loadRecords(model: IFilterModel): Promise<IPagingResult<any>>
    {
        return null;
    }

    /**
     * 清空待筛选条件。
     * @protected
     * @returns {void}
     */
    protected onFilterClean(): void
    {
        Object.keys(this.formItems).forEach(key =>
        {
            if(key === "createdTime")
            {
                this.formItems[key].value =
                {
                    from: "",
                    to: ""
                };
            }
            else
            {
                this.formItems[key].value = "";
            }

        });

        this.interceptFilterClean();

        this.onFilter();
    }

    /**
     * 进行筛选。
     * @protected
     * @returns {void}
     */
    protected onFilter(): void
    {
        Object.keys(this.formItems).forEach(key =>
        {
            const item = this.formItems[key];

            typeof this.filters[key] === "undefined" ? this.$set(this.filters, key, {...item}) : this.filters[key].value = item.value;
        });

        this.onSearch();
    }

    /**
     * 拦截路由。
     * @protected
     * @returns {void}
     */
    protected interceptRoute(params: any): void
    {
        //
    }

    /**
     * 拦截清空筛选器。
     * @protected
     * @returns {void}
     */
    protected interceptFilterClean(): void
    {
        //
    }

    /**
     * 更新路由参数。
     * @returns void
     */
    private updateRoute(): void
    {
        let parameters = {};

        // 设置当前页码
        // if(this.pageIndex !== 1)
        // {
        //     parameters["pageIndex"] = this.pageIndex;
        // }

        // 设置当前每页数量。
        // parameters["pageSize"] = this.pageSize;

        // 设置排序方式

        // 设置过滤条件
        // for(let filter of Object.keys(this.filters))
        // {
        //     let filterValue = encodeFilterValue(this.filters[filter]);

        //     if(filterValue)
        //     {
        //         parameters[filter] = filterValue;
        //     }
        // }

        // // 设置固定参数
        // for(let name of Object.keys(this.params))
        // {
        //     parameters[name] = this.params[name];
        // }

        // this.interceptRoute(parameters);

        this.$router.replace({ name: this.$route.name, query: parameters });
    }

    /**
     * 还原路由参数。
     * @returns void
     */
    private restoreRoute(): void
    {
        let parameters = this.$route.query;

        for(let name of Object.keys(parameters))
        {
            // 还原当前页码
            if(name === "pageIndex")
            {
                this.pageIndex = +parameters[name];
            }
            // 还原当前每页数量。
            else if (name === "pageSize")
            {
                this.pageSize = +parameters[name];
            }
            // 还原排序方式
            else if(name === "sortOrder")
            {
                // console.log("222...");
            }
            // 还原过滤条件
            else
            {
                // 根据字段名查找条件实例
                let filter = this.filters[name],
                    formItem = this.formItems[name];

                Type.isEmptyObject(filter) && !Type.isEmptyObject(formItem) && this.$set(this.filters, name, { ...formItem });

                if ((filter = this.filters[name]) && !Type.isEmptyObject(filter))
                {
                    // 设置过滤条件的值
                    filter.value = decodeFilterValue(filter, parameters[name]);

                    if (!Type.isEmptyObject(formItem))
                    {
                        formItem.value = filter.value;
                    }
                }
                else
                {
                    // 如果查询参数不是在过滤条件的范围内，则当成固定参数处理
                    this.params[name] = parameters[name];
                }
            }
        }
    }

    /**
     * 获取或一个分页查询模型。
     * @returns ISearchModel
     */
    private getSearchModel(): IFilterModel
    {
        let seachModel = {
            data: {}
        };

        // 分页model
        let model: ISearchModel =
        {
            current: this.pageIndex,
            size: this.pageSize
        };

        // 分页参数
        seachModel.data = model;

        // 设置过滤条件
        Object.keys(this.filters).forEach(key =>
        {
            const value = this.filters[key];
            !Type.isEmptyObject(value) && value !== "" && (seachModel.data[key] = value);
        });

        // // 排序条件
        // Object.keys(this.sortings).forEach(key =>
        // {
        //     const value = this.sortings[key].value;

        //     !Type.isEmptyObject(value) && value !== "" && (seachModel.data[key] = value);
        // });

        return seachModel;
    }
}

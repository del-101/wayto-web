/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Copyright (C) 2020-present O&M Cloud Inc. All rights reserved. 
 */

import { WorkbenchBase, ApplicationContextBase, Logger, ConsoleLogHandler } from "uxmid-core";
import ApplicationContext from "./context";
import Workspace from "./workspace";
import { ApplicationRepository } from "../repository";

import Vue from "vue";
import Router from "vue-router";
import { routes, menus } from "../routes";
import Vuex from "vuex";
import modules from "../store";

// 导入系统组件
import components from "uxmid-web";

// 导入布局组件
import MainLayout from "layouts/main.vue";
import GenericLayout from "layouts/generic.vue";

// 导入第三方组件
import iView from "iview";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import echarts from "flagwind-echarts";
import AMap from "flagwind-amap";

// 导入自定义公共组件
import commonComponents from "src/components";

// 导入全局样式
import "iview/dist/styles/iview.css";

// HTTP 客户端
import HttpClient from "common/http/http-client";
import IHttpResponse from "common/http/http-response";
import HttpResponseCode from "common/http/http-response-code";

// 全局配置
import { globalConfig } from "config/index";

// 指令
import { previewer } from "common/directives";

/**
 * 提供工作台的基本封装。
 * @class
 * @version 1.0.0
 */
export default class Workbench extends WorkbenchBase
{
    private _workspace: Workspace;
    
    /**
     * 获取当前应用的主工作空间。
     * @property
     * @returns Workspace
     */
    public get workspace(): Workspace
    {
        return this._workspace;
    }
    
    /**
     * 初始化工作台的新实例。 
     * @param  {ApplicationContextBase} applicationContext
     */
    public constructor(context: ApplicationContextBase)
    {
        super(context);
    }
    
    /**
     * 当工作台打开时调用。
     * @async
     * @protected
     * @virtual
     * @param  {Array<string>} args
     * @returns void
     */
    protected async onOpen(args: Array<string>): Promise<void>
    {
        let context = this.applicationContext as ApplicationContext;

        // 关闭生产提示
        Vue.config.productionTip = false;

        Vue.config.errorHandler = (err, vm, info) =>
        {
            console.error(err, vm, info);
        };

        Vue.config.warnHandler = (msg, vm, trace) =>
        {
            // `trace` 是组件的继承关系追踪
            console.error(msg, vm, trace);
        };

        // 注册日志处理程序
        Logger.handlers.add(new ConsoleLogHandler());

        // 初始化系统及自定义组件
        this.initializeComponent(context);

        // 初始化第三方组件
        this.initializeCustomComponent(context);
        
        // 初始化路由程序
        this.initializeRouter(context);

        // 初始化状态管理程序
        this.initializeStore(context);

        // 初始化 http 客户端
        this.initializeHttpClient(context);

        // 初始化所有全局 Vue 自定义指令
        this.initializeDirectives(context);

        // 初始化工作空间
        this._workspace = this.createWorkspace();
    }
    
    /**
     * 创建一个工作空间对象。
     * @override
     * @returns IWorkspace
     */
    protected createWorkspace(): Workspace
    {
        return new Workspace(this);
    }

    /**
     * 初始化全局组件。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeComponent(context: ApplicationContext): void
    {
        // 注册系统组件
        Vue.use(components);

        // 注册应用组件
        Vue.use(commonComponents);
        Vue.component("fw-echarts", echarts);

        // 注册布局母版
        Vue.component("l-generic", GenericLayout);
        Vue.component("l-main", MainLayout);
    }

    /**
     * 初始化注册第三方组件。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeCustomComponent(context: ApplicationContext): void
    {
        Vue.use(iView);
        dayjs.locale("zh-cn");
        dayjs.extend(relativeTime);

        // 初始化高德地图配置
        // AMap.init
        // ({
        //     key: globalConfig.aMapKey,
        //     version: "1.4.14",
        //     uiVersion: "1.0",
        //     plugins:
        //     [
        //         "Autocomplete",
        //         "PlaceSearch",
        //         "Scale",
        //         "OverView",
        //         "ToolBar",
        //         "MapType",
        //         "CircleEditor",
        //         "Geocoder",
        //         "PositionPicker",
        //         "AMap.MouseTool",
        //         "AMap.PolyEditor",
        //         "AMap.MarkerClusterer"
        //     ]
        // });

        // 注册高德地图组件
        // Vue.use(AMap);
    }
    
    /**
     * 初始化路由程序。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeRouter(context: ApplicationContext): void
    {
        // 注册路由组件
        Vue.use(Router);

        // TODO 用仓储或者直接用context 可能用context更好
        const applicationRepository = context.serviceFactory.getProvider("").resolve<ApplicationRepository>(ApplicationRepository);

        // TODO 处理权限

        // TODO 存储以供后续使用
        applicationRepository.applicationMenu = menus;
        
        // 初始化路由程序
        let router = new Router({mode: "history", routes});

        // TODO 权限全局守卫
        router.beforeResolve(async (to, from, next) =>
        {
            next();
        });
        
        // 设置路由程序
        context.router = router;
    }
    
    /**
     * 初始化状态管理程序。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeStore(context: ApplicationContext): void
    {
        // 注册状态管理程序
        Vue.use(Vuex);

        // 初始化状态容器
        let store = new Vuex.Store({
            modules
        });
        
        // 设置状态容器
        context.store = store;
    }

    /**
     * 初始化 HTTP 客户端。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeHttpClient(context: ApplicationContext): void
    {
        HttpClient.instance.handlers.add((code: number, content: IHttpResponse, request) =>
        {
            switch(code)
            {
                case HttpResponseCode.sessionLost:
                case HttpResponseCode.invalidCredential:
                {
                    context.store.dispatch("user/setProfile", null);
                    context.router.push("/login");
                    break;
                }
                case HttpResponseCode.unauthorized:
                {
                    break;
                }
            }
        });
    }

    /**
     * 初始化所有全局 Vue 自定义指令。
     * @param  {ApplicationContext} context 应用程序上下文实例。
     * @returns void
     */
    private initializeDirectives(context: ApplicationContext): void
    {
        // 图片放大预览
        Vue.directive("previewer", previewer);
    }
}

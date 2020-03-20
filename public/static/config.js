/**
 * 全局配置
 */
window.waytoSetting = {};

Object.defineProperties(window.waytoSetting,
{
    // 服务器地址
    apiServer:
    {
        value: "",
        writable: false, // 不可被修改
        configurable: false // 不可被重新定义配置
    },
    // 地图apiKey
    aMapKey:
    {
        value: "",
        writable: false,
        configurable: false
    }
});

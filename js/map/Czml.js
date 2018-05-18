/**
 * Czml 加载类
 */
class Czml{
    /**
     * czml构造函数
     * @param {url} url -czml地址
     */
    constructor(url){
        this.url=url;
        this.init();
    }
    init () {
        viewer.dataSources.add(Cesium.CzmlDataSource.load(this.url));
    } 
}
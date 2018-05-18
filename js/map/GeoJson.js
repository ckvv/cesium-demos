/**
 * GeoJson 加载类
 */
class GeoJson{
    /**
     * GeoJson
     * @param {url} url -GeoJson地址
     */
    constructor(url){
        this.url=url;
        this.init();
    }
    init () {
        viewer.dataSources.add(Cesium.GeoJsonDataSource.load(this.url));
    } 
}
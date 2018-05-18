/**
 * KML 加载类
 */
class KML{
    /**
     * KML构造函数
     * @param {url} url -KML地址
     */
    constructor(url){
        this.url=url;
        this.init();
    }
    init () {
        var options = {
            camera : viewer.scene.camera,
            canvas : viewer.scene.canvas
        };
        viewer.dataSources.add(Cesium.KmlDataSource.load(this.url, options));
    } 
}
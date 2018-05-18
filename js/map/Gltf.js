/**
 * Gltf 加载类
 */
class Gltf{
    /**
     * Gltf 构造函数
     * @param {url} url Modelurl
     * @param {double} lat 加载到的经度 默认 -123.0744619
     * @param {double} lot 加载到的纬度度 默认 44.0503706
     * @param {double} height 加载到的高度 默认0
     */
    constructor(url,lat=-123.0744619,lot=44.0503706,height=0){
        this.url=url;
        this.lat=lat;
        this.lot=lot;
        this.height=height;
        this.init();
    }
    init () {
        Gltf.createModel(this.url,this.lat,this.lot,this.height);
    }
    static createModel(url,lat,lot,height){
        var position = Cesium.Cartesian3.fromDegrees(lat, lot, height);
        var heading = Cesium.Math.toRadians(135);
        var pitch = 0;
        var roll = 0;
        var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

        var entity = viewer.entities.add({
            name : url,
            position : position,
            orientation : orientation,
            model : {
                uri : url,
                minimumPixelSize : 128,
                maximumScale : 20000
            }
        });
        viewer.trackedEntity = entity;
    } 
}
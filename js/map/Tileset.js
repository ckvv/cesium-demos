/**
 * Tileset 加载类
 */
class Tileset {
    /**
     * Tileset构造函数
     * @param {url} url titleset url 
     */
    constructor(url){
        this.url=url;
        this.tileset=null;
        this.init();
    }
    /**
     * 初始化
     */
    init() {
        // console.log(this.url);
        // //加载Tileset数据
        // $.getJSON (this.url, function (data)  
        // {
        //     var region=data.root.boundingVolume.region;
        //     if(region){
        //         //region 度转为经纬度
        //         var position=[180/Math.PI*(region[0]+region[2])/2,180/Math.PI*(region[1]+region[3])/2];
        //         // Set the initial camera view to look at Manhattan
        //         //三维笛卡尔点
        //         var initialPosition = Cesium.Cartesian3.fromDegrees(position[0], position[1], 753);
        //         //视角
        //         var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(21.27879878293835, -21.34390550872461, 0.0716951918898415);
        //         viewer.scene.camera.setView({
        //             destination: initialPosition,
        //             orientation: initialOrientation,
        //             endTransform: Cesium.Matrix4.IDENTITY
        //         });
        //         // Load the NYC buildings tileset
        //         this.tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        //             url: this.url,
        //             skipLevelOfDetail : true,
        //             baseScreenSpaceError : 1024,
        //             skipScreenSpaceErrorFactor : 16,
        //             skipLevels : 1,
        //             immediatelyLoadDesiredLevelOfDetail : false,
        //             loadSiblings : false,
        //             cullWithChildrenBounds : true,
        //             dynamicScreenSpaceError : true,
        //             dynamicScreenSpaceErrorDensity : 0.00278,
        //             dynamicScreenSpaceErrorFactor : 4.0,
        //             dynamicScreenSpaceErrorHeightFalloff : 0.25,
        //             debugColorizeTiles : true //随机颜色
        //         }));
        //         this.tileset.show=true;
        //     }else{
        //         showMessageInfo('文件格式错误',danger);
        //     }
        // });
        this.tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: this.url,
            skipLevelOfDetail : true,
            baseScreenSpaceError : 1024,
            skipScreenSpaceErrorFactor : 16,
            skipLevels : 1,
            immediatelyLoadDesiredLevelOfDetail : false,
            loadSiblings : false,
            cullWithChildrenBounds : true,
            dynamicScreenSpaceError : true,
            dynamicScreenSpaceErrorDensity : 0.00278,
            dynamicScreenSpaceErrorFactor : 4.0,
            dynamicScreenSpaceErrorHeightFalloff : 0.25,
            debugColorizeTiles : true //随机颜色
        }));
        this.tileset.show=true;

        this.tileset.readyPromise.then(function(tileset) {
            // Set the camera to view the newly added tileset
            viewer.camera.setView({
                destination : tileset.boundingSphere.center,
                orientation: {
                    heading : 0,
                    pitch : -Cesium.Math.PI_OVER_TWO,
                    roll : 0
                }
            });
        });
    }
}
class SpreadModel{
    /**
     * 
     * @param {object} point {lon:0,lat:0,height:0}
     * @param {object} option {speed:0,direction:0}
     */
    constructor (point,option){
        this.point=point;
        this.option=option;
        // this.init();
    }
    init(){
        // var redEllipse = viewer.entities.add({
        //     position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0 , 0),
        //     name : '扩散模拟',
        //     ellipse : {
        //         semiMinorAxis : 250000.0,
        //         semiMajorAxis : 400000.0,
        //         material : Cesium.Color.RED.withAlpha(0.5)
        //     }
        // });

        // var redEllipse1 = viewer.entities.add({
        //     position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0 , 0),
        //     name : '扩散模拟',
        //     ellipse : {
        //         semiMinorAxis : 250000.0*1.5,
        //         semiMajorAxis : 400000.0*2,
        //         material : Cesium.Color.RED.withAlpha(0.3)
        //     }
        // });
        var nd=200;
        var he=2500;
        var wi=4000;
        var c=1;
        for(let i=0;i<=7;i++){
            viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0 , 0),
                name : '扩散模拟，污染浓度：'+(nd*=0.7),
                ellipse : {
                    semiMinorAxis : (he*=1.5),
                    semiMajorAxis : (wi*=1.5),
                    material : Cesium.Color.RED.withAlpha(c*=0.9)
                }
            });
        }
        viewer.zoomTo(viewer.entities);
    }
}
class HandlerEvent{
    constructor(){
        this.handler= new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    }
    setInputAction(action, type = Cesium.ScreenSpaceEventType.LEFT_CLICK){
        this.handler.setInputAction(action, type);
    }
    removeInputAction(type = Cesium.ScreenSpaceEventType.LEFT_CLICK){
        this.handler.removeInputAction(type);
    }
    destroy(){
        this.handler.destroy();
    }
}
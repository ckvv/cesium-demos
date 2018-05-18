class CameraM{
    constructor(viewer=window.viewer){
        this.camera=viewer.camera;
    }
    addChangeEventListener (event){
        this.camera.changed.addEventListener(event);
    }
    removeChangeEventListener (event){
        this.camera.changed.removeEventListener(event);
    }
}
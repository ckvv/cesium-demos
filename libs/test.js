// 定义当前场景的画布元素的事件处理
var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
function t1 () { 
    console.log('t1');
 };
//设置鼠标移动事件的处理函数，这里负责监听x,y坐标值变化
handler.setInputAction(t1, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
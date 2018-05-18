class MapStatic{
    constructor() {
    }
    static queryEntity(entityid){
        if(viewer.entities.getById(entityid)){
            viewer.trackedEntity=viewer.entities.getById(entityid);
            return;
        }
        var datasources=viewer.dataSources;
        for (var i=0;i<datasources.length;i++){
            var datasource=datasources.get(i);
            viewer.trackedEntity=datasource.entities.getById(entityid);
        }
    }
    static getEntity(entityid){
        var entity;
        if(viewer.entities.getById(entityid)){
            return viewer.entities.getById(entityid);
        }
        var datasources=viewer.dataSources;
        for (var i=0;i<datasources.length;i++){
            var datasource=datasources.get(i);
            entity=datasource.entities.getById(entityid);
        }
        return entity;
    }
    static removeEntity(entityid){
        viewer.entities.remove(viewer.entities.getById(entityid));
    }
    static setView(destination={lon:113.5,lat:34.5,height:20000},orientation={heading:0,pitch : -Cesium.Math.PI_OVER_TWO,roll : 0.0}){
        viewer.camera.setView({
            destination : Cesium.Cartesian3.fromDegrees(destination.lon, destination.lat, destination.height),
            orientation: {
                heading : 0,
                pitch : -Cesium.Math.PI_OVER_TWO,
                roll : 0
            }
        });
    }
    
    static flyTo(destination={lon:113.5,lat:34.5,height:20000},orientation={heading:0,pitch : -Cesium.Math.PI_OVER_TWO,roll : 0.0}){
        viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromDegrees(destination.lon, destination.lat, destination.height),
            orientation: {
                heading : 0,
                pitch : -Cesium.Math.PI_OVER_TWO,
                roll : 0
            }
        });
    }

    static getMousePosition(ele){
        ele.style.display='block';
        //得到当前三维场景
        var scene = viewer.scene;
        //得到当前三维场景的椭球体
        var ellipsoid = scene.globe.ellipsoid;

        var longitudeString = null;
        var latitudeString = null;
        var height = null;
        var cartesian = null;
        // 定义当前场景的画布元素的事件处理
        var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        //设置鼠标移动事件的处理函数，这里负责监听x,y坐标值变化
        handler.setInputAction(function(movement) {
            //通过指定的椭球或者地图对应的坐标系，将鼠标的二维坐标转换为对应椭球体三维坐标
            cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
            if (cartesian) {
                //将笛卡尔坐标转换为地理坐标
                var cartographic = ellipsoid.cartesianToCartographic(cartesian);
                //将弧度转为度的十进制度表示
                longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
                latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
                //获取相机高度
                height = Math.ceil(viewer.camera.positionCartographic.height);

                longitudeString=longitudeString.toFixed(3);
                latitudeString=latitudeString.toFixed(3);
                ele.innerHTML='经度:' + longitudeString + ', 纬度:' + latitudeString + ", 高程:" + height+ '米';
            }else {
                
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        //设置鼠标滚动事件的处理函数，这里负责监听高度值变化
        handler.setInputAction(function(wheelment) {
            height = Math.ceil(viewer.camera.positionCartographic.height);
            ele.innerHTML='经度:' + longitudeString + ', 纬度:' + latitudeString + ", 高程:" + height + '米';
        }, Cesium.ScreenSpaceEventType.WHEEL);
    }
    static removeMousePosition(ele){
        ele.style.display='none';
    }
    static showCameraPosition(){
            var ele=document.querySelector('.mousePosition_div');

            var ellipsoid=viewer.scene.globe.ellipsoid;
            var cartesian3=viewer.camera.position;
            var cartographic=ellipsoid.cartesianToCartographic(cartesian3);
            var lat=Cesium.Math.toDegrees(cartographic.latitude);
            var lon=Cesium.Math.toDegrees(cartographic.longitude);
            var height=cartographic.height;

            lon=lon.toFixed(3);
            lat=lat.toFixed(3);
            height=height.toFixed(3);
            ele.innerHTML='经度:' + lon + ', 纬度:' + lat+ ", 高程:" + height+ '米';
            console.log('changed');
    }
    static BaiDuQuery(data){
        console.log(data);
        if(data.status==0 || data.status=='0'){
            var location=data.result.location;
            MapStatic.flyTo({lon:location.lng,lat:location.lat,height:3600});
        }else{
            showMessageInfo('地名错误');
        }
    }
    static JsonP(data,callback){
        if(data!='' && data){
            if(data.split(' ').length == 3){
                let array=data.split(' ');
                console.log(array)
                //格式正确
                //必须是数字
                for(let value of array){
                    if(isNaN(value)){
                        showMessageInfo('请输入数字');
                        return;
                    }
                }
                let position={
                    lon: array[0]*1,
                    lat: array[1]*1,
                    height: array[2]*1
                };
                MapStatic.flyTo(position);
                return;
            }
            var url = "http://api.map.baidu.com/geocoder/v2/?output=json&ak=WlDPhR1iagInnifvfpLhqa1ZDZyc9mzD&callback=showLocation&address="+data+"&callback="+callback+"&ret_coordtype=WGS84";
            var obj=document.querySelector('#jsonp');
            if(document.querySelector('#jsonp')){
                obj.parentNode.removeChild(obj);
            }
            var obj = $('<script><\/script>');
            obj.attr("src",url);
            obj.attr("id",'jsonp');
            $("body").append(obj);
        }else{
            showMessageInfo('请输入查询地址');
        }
        
    }
}
class EntityM{
    constructor() {
    }
    add(){
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        //左键添加
        handler.setInputAction(function(event) {
            $('#entity_modal').modal('show');

            //得到当前三维场景的椭球体
            var ellipsoid = viewer.scene.globe.ellipsoid;

            //EntityM.addEntitybyModal(cartesian);
            $('#entity_modal .certain_btn').click(function(){
                
                //通过指定的椭球或者地图对应的坐标系，将鼠标的二维坐标转换为对应椭球体三维坐标
                var cartesian = viewer.camera.pickEllipsoid(event.position,ellipsoid);

                console.log(cartesian.toString());
                EntityM.addEntitybyModal(cartesian);
                $('#entity_modal').modal('hide');
            });
            //EntityM.addEntity(cartesian,index,'ck','通过指定的椭球或者地图对应的坐标系，将鼠标的二维坐标转换为对应椭球体三维坐标');
            
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        //右键取消
        handler.setInputAction(function() {
            $('#entity_modal').modal('hide');
            //
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }
    static addEntitybyModal(cartesian){
        var name=$('#entity_modal #entityname_text').val();
        var description=$('#entity_modal #entitydescription_text').val();
        if(name && description && name!='' && description!=''){
            EntityM.addEntity(cartesian,name,description);
            //保存信息
            EntityM.postEntityData(cartesian,name,description);
        }else{
            showMessageInfo('请输入标签名字和内容');
        }
    }
    static addEntity(position,name,description){
       if(viewer.entities.getById(name)){
            return;
       }else{
            var pinBuilder = new Cesium.PinBuilder();
            viewer.entities.add({
                id: name,
                name : name,
                position : position,
                description: description,
                // '<div>tile:chekai</div><hr/><divhello</div>',
                billboard : {
                    image : pinBuilder.fromText(name, Cesium.Color.BLACK, 48).toDataURL(),
                    distanceDisplayCondition: 2000,
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM
                }
            });
       }
    }
    static postEntityData(position,name,description){
        $.get("http://localhost:8080/myssm/userentity/insertEntity", { name: Login.UserName(), entity: "{\"position\":\""+position.toString().substr(1,position.toString().length-2)+"\",\"name\":\""+name+"\",\"description\":\""+description+"\"}" } );
    }
    static getEntitysDataByName(name){
        $.get("http://localhost:8080/myssm/userentity/selectEntitysByName", {username:name},function(data){
            for(var entity of data){
                var myentity=JSON.parse(entity.entity);
                var position=myentity.position.split(',');
                // console.log(position);
                var cartesian3=new Cesium.Cartesian3(position[0]*1, position[1]*1, position[2]*1);
                var name=myentity.name;
                var description=myentity.description;

                // console.log(position);
                // console.log(cartesian3);
                // console.log(typeof(name));
                // console.log(description);
                // console.log(typeof(1));
                EntityM.addEntity(cartesian3,name,description)
            }
        } );
    }
}
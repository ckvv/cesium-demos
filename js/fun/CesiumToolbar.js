/**
 * 依赖 jquery
 * CesiumToolbar
 */
class CesiumToolbar{
    constructor(){
    }
    static init(){
        CesiumToolbar.addNorthViewBtn();
        CesiumToolbar.addRemoveAllDSBtn();
        CesiumToolbar.addUntrackedBtnBtn();
        CesiumToolbar.show();
    }
    static getCesiumToolbar(){
        return $('.cesium-viewer-toolbar');
    }
    static show(){
        $('.cesium-viewer-toolbar').show();
    }
    static hide(){
        $('.cesium-viewer-toolbar').hide();
    }
    static add(ele){
        $('.cesium-viewer-toolbar').append(ele);
    }
    static remove(ele){
        ele.remove();
    }
    static getImgButton(imgUrl,title){
        var button=$("<button type='button' class='cesium-button cesium-toolbar-button' title="+title+" style='background-image: url("+imgUrl+");'></button>");
        return button;
    }
    static addNorthViewBtn(){
        if(document.querySelectorAll('.northViewBtn').length>0){
            return;
        }
        var button=CesiumToolbar.getImgButton('img/toolbar/指南针.png','正北方向');
        button.click(function(){
            viewer.camera.setView({
                orientation: {
                    heading : 0.0,
                    pitch : -Cesium.Math.PI_OVER_TWO,
                    roll : 0.0
                }
            });
        });
        button.addClass('northViewBtn');
        //button.css('transform','rotate(-45deg)');
        CesiumToolbar.add(button);
    }
    static addRemoveAllDSBtn(){
        if(document.querySelectorAll('.removeAllDSBtn').length>0){
            return;
        }
        var button=CesiumToolbar.getImgButton('img/toolbar/remove.png','移除所有图层');
        button.click(function(){
            viewer.dataSources.removeAll(true);
            viewer.entities.removeAll();
            viewer.scene.primitives.removeAll();
            Mychart.removeAllChart();
        });
        button.addClass('removeAllDSBtn');
        //button.css('transform','rotate(-45deg)');
        CesiumToolbar.add(button);
    }
    static addUntrackedBtnBtn(){
        if(document.querySelectorAll('.untrackedBtn').length>0){
            return;
        }
        var button=CesiumToolbar.getImgButton('img/toolbar/tracked.png','取消最终定位');
        button.click(function(){
            viewer.trackedEntity=null;
        });
        button.addClass('untrackedBtn');
        //button.css('transform','rotate(-45deg)');
        CesiumToolbar.add(button);
    }
}
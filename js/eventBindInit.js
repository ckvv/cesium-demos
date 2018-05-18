//绑定事件初始化
$(document).ready(
	function(){
		//专题信息
		//人口分布
		$('#population-map').click(function(){
			jsonPopulation();
		});
		//GDP
		$('#gdp-map').click(function(){
			gdpPerCapita2008();
		});
		//扩散模型
		// $('#spreadModel').click(function(){
		// 	var spreadModel=new SpreadModel();
		// 	spreadModel.init();
		// });
		//郑州出租车模型
		$('#zztaxi_map').click(function(){
			EventModel.ZZTaxi();
		});
		//三维数据展示
		$('#newYorkData').click(function(){
			EventModel.NewYork();
		});
		$('#photography').click(function(){
            OtherData.TilesQXTest();
		});
		$('#pointcloud').click(function(){
            OtherData.TilesPointCloudTest();
		});
		//轨迹czml
		$('#satellite-track').click(function(){
			EventModel.Satellite();
		});

		$('#satelliteFacilities-track').click(function(){
			OtherData.ClusterPoints();
		});
		$('#route-track').click(function(){
            addVehicleCZML();
		});
		$('#czml-track').click(function(){
            addCZMLPath();
		});
		//功能管理
		$('#loadData_fun').click(function(){
			EventModel.dataLoad();
		});

		$('#uerEntity_fun').click(function(){
			EventModel.userEntity();
		});

		$('#loadData_funTest').click(function(){
			OtherData.addPoints();
		});

		$('#saveMap').click(function(){
			var mapCanvas=document.querySelector('#cesiumContainer canvas');

			var d=mapCanvas.toDataURL("image/png");
			var w=window.open('about:blank','image from canvas');
			w.document.write("<img src='"+d+"' alt='from canvas'/>");
			
			// var image = mapCanvas.toDataURL("image/png",1.0);  
			// console.log(image);
			// // window.location.href=image; // it will save locally  
			// /**
			//  * 在本地进行文件保存
			//  * @param  {String} data     要保存到本地的图片数据
			//  * @param  {String} filename 文件名
			//  */
			// var saveFile = function(data, filename){
			// 	var save_link = document.createElementNS('http://127.0.0.1:8080/', 'a');
			// 	save_link.href = data;
			// 	save_link.download = filename;
			
			// 	var event = document.createEvent('MouseEvents');
			// 	event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			// 	save_link.dispatchEvent(event);
			// };
			
			// // 下载后的问题名
			// var filename = 'baidufe_' + (new Date()).getTime() + '.' + 'png';
			// // download
			// saveFile(image,'test');
		});
		//显示设置
		$('#displaySettingA').click(function(){
            EventModel.displaySetting();
		});

		//窗口事件
		$('.move').mousedown(function(){
			toolbarMove(this);
		});
		$('.close').click(function(){
			$(this.parentNode.parentNode).css('display','none');
		});
		$('.toggle_win').click(function(){
			$(".content",this.parentNode.parentNode).slideToggle();
		});

		//搜索设置
		var serch_btn = window.setTimeout(function(){
			$('.cesium-geocoder-searchButton').off();
			$('.cesium-geocoder-searchButton').click(function(){
				EventModel.search();
			});
			window.clearTimeout(serch_btn);
		},6000)
	}
);

var EventModel={
	//纽约相关
	NewYork:function(){
		$('#newYorkWin').css('display','block');
		var newyork=new NewYork();
		//点击查询
		$("input[value='NY-PointQuery']").click(function(){
			if($(this).is(":checked")){
				newyork.clickQuery();
			}else{
				newyork.unclickQuery();
			}
		});
		$("input[value='statistic-chart']").click(function(){
			if($(this).is(":checked")){
				// var chartdiv=document.createElement('div');
				// chartdiv.className="chartdiv";
				// chartdiv.id="chartdiv";
				// document.querySelector('.charst_content').appendChild(chartdiv);
				Mychart.addchartDiv('newyork');
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('newyork'));
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(ChartOption.NewYork);
			}else{
				Mychart.removeAllChart();
			}
		});
		//渲染方式
		$(".rendering-style").change(function(){
			var checkValue=$(".rendering-style").val();
			switch(checkValue){
				case 'none':
					newyork.colorByNone();
					break;
				case 'area':
					newyork.colorByArea();
					break;
				case 'height':
					newyork.colorByHeight();
					break;
				default:
					newyork.colorByNone();
					break;
			}
		});
		//显示筛选
		// $("input[name*='nyhide']").keydown(function(event){
		// 	if(event.which!=13){
		// 		return;
		// 	}else{
		// 		if(isNaN($(this).val())){
		// 			showMessageInfo('请输入数字');
		// 		}else{
		// 			switch($(this).attr('name')){
		// 				case 'area-nyhide':
		// 					newyork.hideByArea($(this).val());
		// 					break;
		// 				case 'height-nyhide':
		// 					newyork.hideByHeight($(this).val());
		// 					break;
		// 				default:
		// 					break;
		// 			}
		// 		}
		// 	}
		// });
		$( ".slider" ).slider({
			slide: function( event, ui ) {
				$('.value',this.parentNode).text((ui.value*this.dataset.max/100)+this.dataset.danwei);
			},
			change: function( event, ui ) {
				eval(this.dataset.event+"($( this ).slider('value')*this.dataset.max/100);")
			}
		});
		//关闭
		$('#closeNewYork').click(function(){
			newyork.destory();
		});
	},
	//卫星
	Satellite: function(){
		$('#satelliteWin').css('display','block');
		var czml=new Czml('data/czml/24Satellite.czml');
		
		$('#satelliteWin .fixed_btn').click(function(){
			//query
			MapStatic.queryEntity($('#satelliteWin .queryEntitiesByID').val());
		});

		$("#satelliteWin input[value='statistic-chart']").click(function(){
			if($(this).is(":checked")){
				// var chartdiv=document.createElement('div');
				// chartdiv.className="chartdiv";
				// chartdiv.id="chartdiv";
				// document.querySelector('.charst_content').appendChild(chartdiv);
				Mychart.addchartDiv('satellite');
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('satellite'));
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(ChartOption.Satellite);
			}else{
				Mychart.removeAllChart();
			}
		});
	},
	//数据加载
	dataLoad: function(){
		$('#loadDataWin').css('display','block');

		$('#loadDataWin .cansole_btn').click(function(){
			$('#loadDataWin').css('display','none');
		});
		$('#loadDataWin .sure_btn').click(function(){
			var dataType=$('.loadDataType_select').val();
			var dataUrl=$('.loadDataUrl_text').val();
			if(dataUrl=='' || dataType==''){
				showMessageInfo('地址不能为空');
				return;
			}else{
				switch (dataType){
					case 'CZML':
					//data/czml/24Satellite.czml
						var czml=new Czml(dataUrl);
						break;
					case 'Tileset':
					//data/TilesData/NewYork/tileset.json
						var tileset=new Tileset(dataUrl);
						break;
					case 'KML':
					//data/kml/gdpPerCapita2008.kmz
						var kml=new KML(dataUrl);
						break;
					case 'GeoJson':
					//data/GeoJson/ne_10m_us_states.topojson
						var geojson=new GeoJson(dataUrl);
						break;
					case 'Gltf':
					//data/models/CesiumMilkTruck/CesiumMilkTruck.gltf
						var gltf=new Gltf(dataUrl);
						break;
					default :
						break;
				}
			}
		});
	},
	//显示设置
	displaySetting: function(){
		$('#displaySettingWin').css('display','block');
		$("input[type='checkbox']",$('#displaySettingWin')).click(function(){
			switch($(this).val()){
				case 'toolbar':
					if($(this).is(':checked')){
						CesiumToolbar.init();
					}else{
						CesiumToolbar.hide();
					}
					break;
				case 'mapShadows':
					if($(this).is(':checked')){
						viewer.shadows=true;
						viewer.terrainShadows=Cesium.ShadowMode.ENABLED;
					}else{
						viewer.shadows=false;
						viewer.terrainShadows=Cesium.ShadowMode.DISABLED;
					}
					break;
				case 'waterMap':
					if($(this).is(':checked')){
						return;
						var terrainProvider = Cesium.createWorldTerrain({
							requestWaterMask: true,
							requestVertexNormals : true
						});
						viewer.terrainProvider = terrainProvider;
					}else{
					}
					break;
				case 'VRButton':
					if($(this).is(':checked')){
						$('.cesium-viewer-vrContainer').css('display','block');
					}else{
						$('.cesium-viewer-vrContainer').css('display','none');
					}
					break;
				case 'mousePosition':
					var ele=document.querySelector('.mousePosition_div');
					if($(this).is(':checked')){
						var position=MapStatic.getMousePosition(ele);
					}else{
						var position=MapStatic.removeMousePosition(ele);
					}
					break;
					// var cameraM = new CameraM();
					// if($(this).is(':checked')){
					// 	ele.style.display='block';
					// 	cameraM.addChangeEventListener(MapStatic.showMousePosition);
					// }else{
					// 	ele.style.display='none';
					// 	cameraM.removeChangeEventListener(MapStatic.showMousePosition);
					// }
				case 'compass':
					if($(this).is(':checked')){
						$('.compass').css('display','block');
					}else{
						$('.compass').css('display','none');
					}
					break;
				case 'navigation-controls':
					if($(this).is(':checked')){
						$('.navigation-controls').css('display','block');
					}else{
						$('.navigation-controls').css('display','none');
					}
					break;
				case 'distance-legend':
					if($(this).is(':checked')){
						$('.distance-legend').css('display','block');
					}else{
						$('.distance-legend').css('display','none');
					}
				break;
				case 'time-controls':
					if($(this).is(':checked')){
						$('.cesium-viewer-animationContainer').css('display','block');
						$('.cesium-viewer-timelineContainer').css('display','block');
					}else{
						$('.cesium-viewer-animationContainer').css('display','none');
						$('.cesium-viewer-timelineContainer').css('display','none');
					}
					break;
				case 'fullscreen-controls':
					if($(this).is(':checked')){
						$('.cesium-viewer-fullscreenContainer').css('display','block');
					}else{
						$('.cesium-viewer-fullscreenContainer').css('display','none');
					}
					break;
				default:
					break;
			}
		});
	},
	//TODO待办
	userEntity:function(){
		//if(!Login.IsLogin() && Login.UserName!=''){
			showMessageInfo('该功能需要登陆后使用，请及时登录！！','danger');
			//return;
		//}

		var entitym=new EntityM();
		$('#userEntityWin').css('display','block');
		$('#userEntityWin #queryEntity_btn').click(function(){
			MapStatic.queryEntity($('#userEntityWin #queryEntityName_text').val());
		});
		$('#addentity_btn').click(function(){
			entitym.add();
		});
		//
		$('#delentity_btn').click(function(){
			//
			MapStatic.removeEntity($('#userEntityWin #queryEntityName_text').val());
		});
		EntityM.getEntitysDataByName(Login.UserName());
	},
	//百度查找地点
	search:function(){
		var data=$('.cesium-geocoder-input').val();
		// console.log(data);
		if(data || data!=''){
			MapStatic.JsonP(data,'MapStatic.BaiDuQuery');
		}else{
			return;
		}
	},
	//郑州拥堵分析
	ZZTaxi:function(){
		// // 定义当前场景的画布元素的事件处理
		// var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
		// //设置鼠标滚动事件的处理函数，这里负责监听高度值变化
        // handler.setInputAction(function(wheelment) {
        //     var height = Math.ceil(viewer.camera.positionCartographic.height);
		// 	console.log('height'+height);
		// 	if(height>160000){
		// 		HeatMap.initHeatMap(10);
		// 		return;
		// 	}else{
		// 		if(height>100000){
		// 			HeatMap.initHeatMap(5);
		// 			return;
		// 		}else{
		// 			if(height>30000){
		// 				HeatMap.initHeatMap(2);
		// 			}else{
		// 				HeatMap.initHeatMap(1);
		// 			}
		// 		}
		// 	}
		// }, Cesium.ScreenSpaceEventType.WHEEL);
		//2016-11-15 15:00-2016-11-15 15:30
		$('#zzHeatMapWin').css('display','block');
		$( ".slider" ).slider({
			slide: function( event, ui ) {
				let timemillen=parseInt(ui.value*this.dataset.max/100);
				if(timemillen<10){
					timemillen='2016-11-15 15:0'+timemillen;
					$('.value',this.parentNode).text(timemillen);
				}else{
					timemillen='2016-11-15 15:'+timemillen;
					$('.value',this.parentNode).text(timemillen);
				}
			},
			change: function( event, ui ) {
				// eval(this.dataset.event+"($( this ).slider('value')*this.dataset.max/100);")
				let timemillen=parseInt($( this ).slider('value')*this.dataset.max/100);
				if(timemillen<10){
					timemillen='2016-11-15 15:0'+timemillen;
					console.log(timemillen);
				}else{
					timemillen='2016-11-15 15:'+timemillen;
					console.log(timemillen);
				}
				HeatMap.initHeatMap(2,timemillen);
			}
		});
		// HeatMap.initHeatMap(2);
	}
};
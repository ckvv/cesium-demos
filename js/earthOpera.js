//申请的BING地图密匙
// Cesium.BingMapsApi.defaultKey = 'AvwPU_3WloKx8AUKIYX5dnrhNt34HrndxHd0AMwqoC8uCvpDf-tEWC1Du4N5K2h2';	
Cesium.BingMapsApi.defaultKey = Earth_CONFIG.BingMapsKey;
//用于构建应用程序的基础小部件 
var viewer;
function earthInit(){
//	viewer设置
	var options={
		mapMode2D: Cesium.MapMode2D.INFINITE_SCROLL, //2D地图可以在水平方向无限滚动
		vrButton:true, //VR
		terrainExaggeration:1, //地形高程比例
		shadows: false, //确定阴影是否由太阳投下
		terrainShadows: Cesium.ShadowMode.DISABLED, //确定地形是否投射或接收来自太阳的阴影
		timeline: true //时间线
		,navigationHelpButton: false //使用帮助
		,geocoder: true //地理编码
		,homeButton: false //
		//,scene3DOnly: true

	}
	viewer = new Cesium.Viewer('cesiumContainer',options);
	
	//初始化扩展插件
	viewer.extend(Cesium.viewerCesiumNavigationMixin, {});
	//	加载离线地球
	// viewer = new Cesium.Viewer('cesiumContainer', {
    // imageryProvider : Cesium.createTileMapServiceImageryProvider({
    //    url : Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
    // }),
    // baseLayerPicker : false,
    // geocoder : false
	// });
	//初始化 CesiumToolbar
	CesiumToolbar.init();

	 var homeview=window.setTimeout(function(){
	 	MapStatic.flyTo({lon:113.544,lat:34.832,height:3000});
	 	clearTimeout(homeview);
	 },3000);
	$('.loadingIndicator').css('display','none');

	if(Login.IsLogin()){
		return;
	}else{
		showMessageInfo('部分功能需要登陆后使用，请及时登录！！','danger');
	}
}

// class timeline{
//     constructor(star){

//     }
// }

//设置动画显示时区
// var d=new Date();var hour=0-d.getTimezoneOffset() ;
// viewer.animation.viewModel.timeFormatter=function(date,viewModel){
//     var dataZone8=Cesium.JulianDate.addMinutes(date,hour,new Cesium.JulianDate());
//     var gregorianDate=Cesium.JulianDate.toGregorianDate(dataZone8);
//     var millisecond= Math.round(gregorianDate.millisecond);
//     if(Math.abs(viewModel._clockViewModel.multiplier)<1){
//         return Cesium.sprintf("%02d:%02d:%02d.%03d",gregorianDate.hour,gregorianDate.minute,gregorianDate.second)
//     }
//     return Cesium.sprintf("%02d:%02d:%02d GMT+8",gregorianDate.hour,gregorianDate.minute,gregorianDate.second)
// }
//2016-11-15 13:50-2016-11-15 15:45
viewer.timeline.zoomTo(Cesium.JulianDate.fromIso8601('1980-08-01T00:00:00Z'),Cesium.JulianDate.fromIso8601('1980-08-01T00:01:00Z'))
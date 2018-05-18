function gdpPerCapita2008(){
	viewer.dataSources.removeAll()
	var options = {
	    camera : viewer.scene.camera,
	    canvas : viewer.scene.canvas
	};
    viewer.dataSources.add(Cesium.KmlDataSource.load('data/kml/gdpPerCapita2008.kmz', options));
	viewer.camera.flyHome(0);
}
function jsonPopulation(){
	viewer.dataSources.removeAll()
	//Now that we've defined our own DataSource, we can use it to load
	//any JSON data formatted for WebGL Globe.
	var dataSource = new WebGLGlobeDataSource();
	console.log(dataSource);
	dataSource.loadUrl('data/json/population909500.json').then(function() {
	
//	    //After the initial load, create buttons to let the user switch among series.
	    // function createSeriesSetter(seriesName) {
	    //     return function() {
	    //         dataSource.seriesToDisplay = seriesName;
	    //     };
	    // }
//		
	    // for (var i = 0; i < dataSource.seriesNames.length; i++) {
	    //     var seriesName = dataSource.seriesNames[i];
	    //     Sandcastle.addToolbarButton(seriesName, createSeriesSetter(seriesName));
	    // }
});

	viewer.clock.shouldAnimate = false;
	viewer.dataSources.add(dataSource);
}

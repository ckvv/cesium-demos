function NewYork(){
	this.tileset=null;
	this.handler= new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
	this.init();
}
NewYork.prototype = {
	init : function(){
		// Set the initial camera view to look at Manhattan
		//三维笛卡尔点
		var initialPosition = Cesium.Cartesian3.fromDegrees(-74.01881302800248, 40.69114333714821, 753);
		// //视角
		var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(21.27879878293835, -21.34390550872461, 0.0716951918898415);
		viewer.scene.camera.setView({
		    destination: initialPosition,
		    orientation: initialOrientation,
		    endTransform: Cesium.Matrix4.IDENTITY
		});
		
		// Load the NYC buildings tileset
		this.tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
			//url: 'data/TilesData/NewYork/tileset.json',
			url: 'https://beta.cesium.com/api/assets/1461?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYWJmM2MzNS02OWM5LTQ3OWItYjEyYS0xZmNlODM5ZDNkMTYiLCJpZCI6NDQsImFzc2V0cyI6WzE0NjFdLCJpYXQiOjE0OTkyNjQ3NDN9.vuR75SqPDKcggvUrG_vpx0Av02jdiAxnnB1fNf-9f7s',
			//url: 'data/TilesData/1.json'
			skipLevelOfDetail : true,
			baseScreenSpaceError : 1024,
			skipScreenSpaceErrorFactor : 16,
			skipLevels : 1,
			immediatelyLoadDesiredLevelOfDetail : false,
			loadSiblings : false,
			cullWithChildrenBounds : true,
			dynamicScreenSpaceError : true,
			dynamicScreenSpaceErrorDensity : 0.00278,
			dynamicScreenSpaceErrorFactor : 4.0,
			dynamicScreenSpaceErrorHeightFalloff : 0.25
			// ,debugColorizeTiles : true //随机颜色
		}));
		this.tileset.show=true;
	},
	destory : function(){
		console.log('destory');
		console.log(viewer.scene.primitives);
		//this.tileset.show=false;
		viewer.scene.primitives.removeAll();
	},
	//建筑渲染
	colorByHeight : function() {
	    this.tileset.style = new Cesium.Cesium3DTileStyle({
	        color: {
	            conditions: [
	                ["${height} >= 300", "rgba(45, 0, 75, 0.5)"],
	                ["${height} >= 200", "rgb(102, 71, 151)"],
	                ["${height} >= 100", "rgb(170, 162, 204)"],
	                ["${height} >= 50", "rgb(224, 226, 238)"],
	                ["${height} >= 25", "rgb(252, 230, 200)"],
	                ["${height} >= 10", "rgb(248, 176, 87)"],
	                ["${height} >= 5", "rgb(198, 106, 11)"],
	                ["true", "rgb(127, 59, 8)"]
	            ]
	        }
	    });
	},
	colorByArea : function() {
	    this.tileset.style = new Cesium.Cesium3DTileStyle({
	        color: "mix(color('yellow'), color('red'), min(${area} / 10000.0, 1.0))"
	    });
	},
	colorByNone : function() {
	    this.tileset.style = new Cesium.Cesium3DTileStyle({
	        color: {
	            conditions: [
					["${height} >= 0", "rgb(255, 255, 255)"]
				]
	        }
	    });
	},
	hideByArea :function(area){
		this.tileset.style = new Cesium.Cesium3DTileStyle({
			show : "${area} > "+area
		});
	},
	hideByHeight :function(height){
		this.tileset.style = new Cesium.Cesium3DTileStyle({
			show : "${height} > "+height
		});
	},
	hide : function (area=0,height=0) {
		this.tileset.style = new Cesium.Cesium3DTileStyle({
			show : "${area} > "+area+" && ${height} >= "+height+""
		});
	},
	//点击查询
	clickQuery : function(){
		// HTML overlay for showing feature name on mouseover
		var nameOverlay = document.createElement('div');
		viewer.container.appendChild(nameOverlay);
		nameOverlay.className = 'backdrop';
		nameOverlay.style.display = 'none';
		nameOverlay.style.position = 'absolute';
		nameOverlay.style.bottom = '0';
		nameOverlay.style.left = '0';
		nameOverlay.style['pointer-events'] = 'none';
		nameOverlay.style.padding = '4px';
		nameOverlay.style.backgroundColor = 'black';

		// Information about the currently selected feature
		var selected = {
			feature: undefined,
			originalColor: new Cesium.Color()
		};

		// Information about the currently highlighted feature
		var highlighted = {
			feature: undefined,
			originalColor: new Cesium.Color()
		};

		// An entity object which will hold info about the currently selected feature for infobox display
		var selectedEntity = new Cesium.Entity();
		var onMouseMove=function onMouseMove(movement) {
			// If a feature was previously highlighted, undo the highlight
			if (Cesium.defined(highlighted.feature)) {
				highlighted.feature.color = highlighted.originalColor;
				highlighted.feature = undefined;
			}

			// Pick a new feature
			var pickedFeature = viewer.scene.pick(movement.endPosition);
			if (!Cesium.defined(pickedFeature)) {
				nameOverlay.style.display = 'none';
				return;
			}

			// A feature was picked, so show it's overlay content
			nameOverlay.style.display = 'block';
			nameOverlay.style.bottom = viewer.canvas.clientHeight - movement.endPosition.y + 'px';
			nameOverlay.style.left = movement.endPosition.x + 'px';
			var name = pickedFeature.getProperty('name');
			if (!Cesium.defined(name)) {
				name = pickedFeature.getProperty('id');
			}
			nameOverlay.textContent = name;

			// Highlight the feature if it's not already selected.
			if (pickedFeature !== selected.feature) {
				highlighted.feature = pickedFeature;
				Cesium.Color.clone(pickedFeature.color, highlighted.originalColor);
				pickedFeature.color = Cesium.Color.YELLOW;
			}
		}
		// Color a feature yellow on hover.
		this.handler.setInputAction(onMouseMove, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

		// Color a feature on selection and show metadata in the InfoBox.
		var clickHandler = this.handler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
		this.handler.setInputAction(function onLeftClick(movement) {
			// If a feature was previously selected, undo the highlight
			if (Cesium.defined(selected.feature)) {
				selected.feature.color = selected.originalColor;
				selected.feature = undefined;
			}

			// Pick a new feature
			var pickedFeature = viewer.scene.pick(movement.position);
			if (!Cesium.defined(pickedFeature)) {
				clickHandler(movement);
				return;
			}

			// Select the feature if it's not already selected
			if (selected.feature === pickedFeature) {
				return;
			}
			selected.feature = pickedFeature;

			// Save the selected feature's original color
			if (pickedFeature === highlighted.feature) {
				Cesium.Color.clone(highlighted.originalColor, selected.originalColor);
				highlighted.feature = undefined;
			} else {
				Cesium.Color.clone(pickedFeature.color, selected.originalColor);
			}

			// Highlight newly selected feature
			pickedFeature.color = Cesium.Color.LIME;

			// Set feature infobox description
			var featureName = pickedFeature.getProperty('name');
			var names=pickedFeature.getPropertyNames();
			selectedEntity.description = 'Loading <div class="cesium-infoBox-loading"></div>';
			viewer.selectedEntity = selectedEntity;

			var description = '<table class="cesium-infoBox-defaultTable"><tbody>';
			for(var name of names){
				description+='<tr><th>'+name+'</th><td>' + pickedFeature.getProperty(name) + '</td></tr>';
			}
			description+='</tbody></table>';
			selectedEntity.description=description;
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
	},
	unclickQuery : function(){
		$('.backdrop').remove();
		$('.cesium-infoBox-close').click();
		this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
	}
}

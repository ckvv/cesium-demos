var flags = {
    looking : false,
    moveForward : false,
    moveBackward : false,
    moveUp : false,
    moveDown : false,
    moveLeft : false,
    moveRight : false
};
function keyboardMove(){
	var scene = viewer.scene;
	var canvas = viewer.canvas;
	canvas.setAttribute('tabindex', '0'); // needed to put focus on the canvas
	canvas.onclick = function() {
	    canvas.focus();
	};
	var ellipsoid = viewer.scene.globe.ellipsoid;
	
	// disable the default event handlers
	scene.screenSpaceCameraController.enableRotate = false;
	scene.screenSpaceCameraController.enableTranslate = false;
	scene.screenSpaceCameraController.enableZoom = false;
	scene.screenSpaceCameraController.enableTilt = false;
	scene.screenSpaceCameraController.enableLook = false;
	
	var startMousePosition;
	var mousePosition;
	
	var handler = new Cesium.ScreenSpaceEventHandler(canvas);
	
	handler.setInputAction(function(movement) {
	    flags.looking = true;
	    mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
	}, Cesium.ScreenSpaceEventType.LEFT_DOWN);
	
	handler.setInputAction(function(movement) {
	    mousePosition = movement.endPosition;
	}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	
	handler.setInputAction(function(position) {
	    flags.looking = false;
	}, Cesium.ScreenSpaceEventType.LEFT_UP);	
	
	document.addEventListener('keydown', setFlagOn, false);
	
	document.addEventListener('keyup', setFlagOff, false);
	
	viewer.clock.onTick.addEventListener(function(clock) {
	    var camera = viewer.camera;
	
	    if (flags.looking) {
	        var width = canvas.clientWidth;
	        var height = canvas.clientHeight;
	
	        // Coordinate (0.0, 0.0) will be where the mouse was clicked.
	        var x = (mousePosition.x - startMousePosition.x) / width;
	        var y = -(mousePosition.y - startMousePosition.y) / height;
	
	        var lookFactor = 0.05;
	        camera.lookRight(x * lookFactor);
	        camera.lookUp(y * lookFactor);
	    }
	
	    // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
	    var cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;
	    var moveRate = cameraHeight / 100.0;
	
	    if (flags.moveForward) {
	        camera.moveForward(moveRate);
	    }
	    if (flags.moveBackward) {
	        camera.moveBackward(moveRate);
	    }
	    if (flags.moveUp) {
	        camera.moveUp(moveRate);
	    }
	    if (flags.moveDown) {
	        camera.moveDown(moveRate);
	    }
	    if (flags.moveLeft) {
	        camera.moveLeft(moveRate);
	    }
	    if (flags.moveRight) {
	        camera.moveRight(moveRate);
	    }
	});	
}
function getFlagForKeyCode(keyCode) {
    switch (keyCode) {
    case 'W'.charCodeAt(0):
        return 'moveForward';
    case 'S'.charCodeAt(0):
        return 'moveBackward';
    case 'Q'.charCodeAt(0):
        return 'moveUp';
    case 'E'.charCodeAt(0):
        return 'moveDown';
    case 'D'.charCodeAt(0):
        return 'moveRight';
    case 'A'.charCodeAt(0):
        return 'moveLeft';
    default:
        return undefined;
    }
}
function unKeyboardMove(){
	var scene = viewer.scene;
	scene.screenSpaceCameraController.enableRotate = true;
	scene.screenSpaceCameraController.enableTranslate = true;
	scene.screenSpaceCameraController.enableZoom = true;
	scene.screenSpaceCameraController.enableTilt = true;
	scene.screenSpaceCameraController.enableLook = true;
	document.removeEventListener('keydown', setFlagOn , false);
	
	document.removeEventListener('keyup', setFlagOff, false);
}
var setFlagOn=function(e) {
	    var flagName = getFlagForKeyCode(e.keyCode);
	    if (typeof flagName !== 'undefined') {
	        flags[flagName] = true;
	    }
	}
var setFlagOff=function(e) {
	    var flagName = getFlagForKeyCode(e.keyCode);
	    if (typeof flagName !== 'undefined') {
	        flags[flagName] = false;
	    }
	}
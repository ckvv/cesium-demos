function toolbarMove(ele,e) {
	var osmall = ele.parentNode;
	osmall.style.cursor="move";
	var e = e || window.event;
	/*用于保存小的div拖拽前的坐标*/
	osmall.startX = e.clientX - osmall.offsetLeft;
	osmall.startY = e.clientY - osmall.offsetTop;
	/*鼠标的移动事件*/
	document.onmousemove = function(e) {
		var e = e || window.event;
		osmall.style.left = e.clientX - osmall.startX + "px";
		osmall.style.top = e.clientY - osmall.startY + "px";
		/*对于大的DIV四个边界的判断*/
		if (e.clientX - osmall.startX <= 0) {
			osmall.style.left = 0 + "px";
		}
		if (e.clientY - osmall.startY <= 0) {
			osmall.style.top = 0 + "px";
		}
		if (e.clientX - osmall.startX >= 1100) {
			osmall.style.left = 1100 + "px";
		}
		if (e.clientY - osmall.startY >= 600) {
			osmall.style.top = 600 + "px";
		}
	};
	/*鼠标的抬起事件,终止拖动*/
	document.onmouseup = function() {
		document.onmousemove = null;
		document.onmouseup = null;
		osmall.style.cursor="pointer";
	};
}
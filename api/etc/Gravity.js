var gravityElements = [];

function Gravity( gravity ) {
	this.yVel = 0; //velocity
	this.gravity = gravity;
}

Gravity.prototype.update = function() {
	//camera
	if(camera.enableDebugPositions) {
		camera.debugPositions();
	}
	if ( camera.py >= 0 ) { // TODO:  <- REPLACE WITH COLLISION DETECTION
		if ( camera.py + this.yVel - this.gravity > 0 ) {
			this.yVel -= this.gravity;
			camera.py += this.yVel;
		}else {
			this.yVel = 0;
			camera.py = 0;
		}
		camera.updatePosition();
	}
	if ( camera.py == 0 ) {
		camera.jump = false;
	}
	
	//world elements	
	var elementsCount = world.elements.length;
	for (var i=0; i<elementsCount; i++) {
		var elem = world.elements[i];
		if (typeof elem.gravity !== 'undefined') {
			var gravity = elem.gravity;
			var yVel = elem.yVel;
			var py = elem.style.transform.translate3d[1];
			var t3d = elem.style.transform.translate3d;
			var r3d = elem.style.transform.rotate3d;
			if ( py >= 0 ) { // TODO:  <- REPLACE WITH COLLISION DETECTION
				if ( py + yVel - gravity > 0 ) {
					yVel -= gravity;
					py += yVel;
				}else {
					gravityElem.yVel = 0;
					py = 0;
				}
			}
			world.elements[i].style.transform.translate3d[1] = py;
			CrossBrowserTransform.translate3d(world.domE.getElementsByTagName('div')[i], t3d[0], t3d[1], t3d[2], r3d[0], r3d[1], r3d[2]);
		}
		gameLoopInterval = true;
	}
}

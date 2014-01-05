Camera.prototype =  {
	getMousePosition: function( e ) {
		var posX = 0;
		var posY = 0;
		if( window.pageXOffset != undefined ){
				posX = e.clientX + window.pageXOffset;
					posY = e.clientY + window.pageYOffset;
		}
		else {
			var e = window.event;
			var d = document.documentElement;
				var b = document.body;
			posX = e.clientX + d.scrollLeft + b.scrollLeft;
			posY = e.clientY + d.scrollTop  + b.scrollTop;
	 	}
	 	return { x: posX, y: posY };
	},
	setControls: function( walkForward, walkBackward, walkLeft, walkRight, flyDown, flyUp ) {
		settings.controls = [ walkForward, walkBackward, walkLeft, walkRight, flyDown, flyUp ];
	},
	updatePosition: function() {
		if ( camera.ry > 360 || camera.ry < -360 ) {
			camera.ry -= parseInt( camera.ry / 360 ) * 360; //prevent big numbers
		}
		if ( camera.rx > 360 || camera.rx < -360 ) {
			camera.rx -= parseInt( camera.rx / 360 ) * 360; //prevent big numbers
		}
		CrossBrowserTransform.translate3d(world.domE, this.px, this.py, this.pz, 0, 0, 0);
		CrossBrowserTransform.translate3d(this.domE, 0, 0, camera.perspective, this.rx, this.ry, this.rz);
		var ox = -this.px
		var oy = -this.py;
		var oz = -this.pz;
	},
	debugPositions: function() {
		document.getElementById("debug").innerHTML = 'X-Position: '+camera.px+'<br />'                
														 		+'Y-Position: '+camera.py+'<br />'
														 		+'Z-Position: '+camera.pz+'<br />'
																+'CameraRotationX: '+	camera.rx	+' deg<br /> '
																+'CameraRotationY: '+	camera.ry	+' deg<br />'
																+'CameraRotationZ: '+	camera.rz	+' deg ';
	},
	calculateMove: function( axis, forward) { // forward = 1, backward = 0  axis=0 == Z  axis=1 == X
		if(helpVisible) {
			document.getElementById('infoSplit1').style.display = 'none';
			document.getElementById('infoSplit2').style.display = 'none';
			helpVisible = false;
		}
					var ry = camera.ry;
					var changeValues = [];
					if (forward) {
						var opr = new Array("-", "+");
					}else {
						var opr = new Array("+", "-");
					}
					switch( camera.moveCalculation.direction ) {
						case 0:
							if ( axis ) {
								changeValues = [ "camera.px "+opr[1]+"=", "camera.pz "+opr[1]+"=" ];
								/*if (forward) {
									camera.onMoveChangeValues.px += camera.moveCalculation.m2 * camera.walkAccuracy;
									camera.onMoveChangeValues.pz += camera.moveCalculation.m2 * camera.walkAccuracy;
								}else {
									camera.onMoveChangeValues.px -= camera.moveCalculation.m2 * camera.walkAccuracy;
									camera.onMoveChangeValues.pz -= camera.moveCalculation.m2 * camera.walkAccuracy;
								}*///TODO: COMPLETE
							}else {
								changeValues = [ "camera.pz "+opr[1]+"=", "camera.px "+opr[0]+"=" ];
							}
						break;
						case 1:
							if ( axis ) {
								changeValues = [ "camera.pz "+opr[1]+"=", "camera.px "+opr[0]+"=" ];
							}else {
								changeValues = [ "camera.px "+opr[0]+"=", "camera.pz "+opr[0]+"=" ];
							}
						break;
						case 2:
							if ( axis ) {
								changeValues = [ "camera.px "+opr[0]+"=", "camera.pz "+opr[0]+"=" ];
							}else {
								changeValues = [ "camera.pz "+opr[0]+"=", "camera.px "+opr[1]+"=" ];
							}	
						break;
						case 3:
							if ( axis ) {
								changeValues = [ "camera.pz "+opr[0]+"=", "camera.px "+opr[1]+"=" ];
							}else {
								changeValues = [ "camera.px "+opr[1]+"=", "camera.pz "+opr[1]+"=" ];
							}
						break;
					}
					return { changeValues: changeValues };
				},
	addUserEvents: function() {
		document.onselectstart = function () { return false; };
		window.addEventListener( "keyup", function(e) {
			var moveCount = camera.moveEvents.length;
			for (var i=0; i<moveCount; i++) {
				if (camera.controls[i] == e.keyCode) {
					window.clearInterval(camera.moveEvents[i]);
	    			delete camera.moveEvents[i];
				}
			}
		});
		world.displayE.addEventListener( "mousedown", function(e) {
			camera.activeMouseDown = true;
			camera.lastMousePos = camera.getMousePosition( e );
		});
		world.displayE.addEventListener( "mouseup", function(e) {
			camera.activeMouseDown = false;
		});
		function calculateCameraRotation(e) {
			var mX = e.movementX       ||
                  			e.mozMovementX    ||
                 			e.webkitMovementX ||
                  			0;
                  			
		   	mY = 	e.movementY       ||
		               		e.mozMovementY    ||
		                	e.webkitMovementY ||
		                	0;
			camera.ry += mX;
			camera.rx -= mY;
			camera.updatePosition();
			camera.lastMousePos = camera.getMousePosition( e );
		}
		function calculateCameraRotationFromTouch(e) {
			var touchobj = e.changedTouches[0];
			var sensitivity = 4;
			camera.rx += (camera.lastMousePos.y - touchobj.clientY)/sensitivity || 0;
			camera.ry -= (camera.lastMousePos.x - touchobj.clientX)/sensitivity || 0;
			camera.updatePosition();
			camera.lastMousePos = {
				x: touchobj.clientX,
				y: touchobj.clientY
			};
		}
		world.displayE.addEventListener( "mousemove", function(e) {
			if (camera.isMousePointerLocked) {
				calculateCameraRotation(e);
			}else {
				if ( camera.activeMouseDown ) {
					calculateCameraRotation(e);
					if(helpVisible) {
						document.getElementById('infoSplit1').style.display = 'none';
						document.getElementById('infoSplit2').style.display = 'none';
						helpVisible = false;
					}
				}
			}
		});
		world.displayE.addEventListener('touchstart', function(e){
			var touchobj = e.changedTouches[0];
			camera.lastMousePos = {
				x: touchobj.clientX,
				y: touchobj.clientY
			};
			e.preventDefault();
		}, false);
		
		world.displayE.addEventListener('touchmove', function(e){
			calculateCameraRotationFromTouch(e);
			e.preventDefault();
		}, false);

		window.addEventListener( "keydown", function(e) {
			var index = camera.controls.indexOf( e.keyCode );
			if ( index != -1 ) {
				var move = true;
				var jump = false;
				intervalF = "";
				
				if ( camera.ry < 0 ) { camera.ry = 360 + camera.ry };
				camera.moveCalculation.direction = parseInt( camera.ry/90 );
				camera.moveCalculation.m1 = (camera.ry-camera.moveCalculation.direction*90)/90;
				camera.moveCalculation.m2 = 1-camera.moveCalculation.m1;
				if (rendererOptions.roundValues.cameraMove) {
					camera.moveCalculation.m1 = Math.round(camera.moveCalculation.m1);
					camera.moveCalculation.m2 = Math.round(camera.moveCalculation.m2);
				}
				/*document.getElementById("debug").innerHTML = 'm1: '+camera.moveCalculation.m1+'<br />'
														 		+'m2: '+camera.moveCalculation.m2+'<br />'
														 		+'direction: '+camera.moveCalculation.m1;*/
				
				switch( index ) {
					case 0:
						intervalF = function() {
							var r = camera.calculateMove( 0, true);
							eval(r.changeValues[0] + camera.moveCalculation.m2 * camera.walkAccuracy);
							eval(r.changeValues[1] + camera.moveCalculation.m1 * camera.walkAccuracy);
						}
					break;
					case 1:
						intervalF = function() {
							var r = camera.calculateMove( 0, false);
							eval(r.changeValues[0] + camera.moveCalculation.m2 * camera.walkAccuracy);
							eval(r.changeValues[1] + camera.moveCalculation.m1 * camera.walkAccuracy);
						}
					break;
					case 2:
						intervalF = function() {
							var r = camera.calculateMove( 1, true);
							eval(r.changeValues[0] + camera.moveCalculation.m2 * camera.walkAccuracy);
							eval(r.changeValues[1] + camera.moveCalculation.m1 * camera.walkAccuracy);
							camera.updatePosition();
						}
					break;
					case 3:
						intervalF = function() {
							var r = camera.calculateMove( 1, false);
							eval(r.changeValues[0] + camera.moveCalculation.m2 * camera.walkAccuracy);
							eval(r.changeValues[1] + camera.moveCalculation.m1 * camera.walkAccuracy);
							camera.updatePosition();
						}
					break;
					case 4:
						intervalF = "camera.py -= "+camera.walkAccuracy+";";
						move = false;
					break;
					case 5:
						//intervalF = "camera.py += "+camera.walkAccuracy+";";
						move = false;
						jump = true;
					break;
					case 6: // arrow left
						if (camera.isFullscreen && camera.isMousePointerLocked) {
							intervalF = function() {
								var r = camera.calculateMove( 1, true);
								eval(r.changeValues[0] + camera.moveCalculation.m2 * camera.walkAccuracy);
								eval(r.changeValues[1] + camera.moveCalculation.m1 * camera.walkAccuracy);
								camera.updatePosition();
							}
						}else {
							intervalF = "camera.ry -= "+camera.walkAccuracy/10+";";
						}
					break;
					case 7: // arrow right
						if (camera.isFullscreen && camera.isMousePointerLocked) {
							intervalF = function() {
								var r = camera.calculateMove( 1, false);
								eval(r.changeValues[0] + camera.moveCalculation.m2 * camera.walkAccuracy);
								eval(r.changeValues[1] + camera.moveCalculation.m1 * camera.walkAccuracy);
								camera.updatePosition();
							}
						}else {
							intervalF = "camera.ry += "+camera.walkAccuracy/10+";";
						}
					break;
					case 8: // arrow down
						if (camera.isFullscreen && camera.isMousePointerLocked) {
							intervalF = function() {
								var r = camera.calculateMove( 0, false);
								eval(r.changeValues[0] + camera.moveCalculation.m2 * camera.walkAccuracy);
								eval(r.changeValues[1] + camera.moveCalculation.m1 * camera.walkAccuracy);
							}
						}else {
							intervalF = "camera.rx -= "+camera.walkAccuracy/10+";";
						}
					break;
					case 9: // arrow up
						if (camera.isFullscreen && camera.isMousePointerLocked) {
							intervalF = function() {
								var r = camera.calculateMove( 0, true);
								eval(r.changeValues[0] + camera.moveCalculation.m2 * camera.walkAccuracy);
								eval(r.changeValues[1] + camera.moveCalculation.m1 * camera.walkAccuracy);
							}
						}else {
							intervalF = "camera.rx += "+camera.walkAccuracy/10+";";
						}
					break;
					default:
						move = false;
					break;
				}
				if (move) {
					var controlsCount = camera.controls.length;
					var i = camera.controls.indexOf( e.keyCode); //if pressed key exist in controls
					if( i != -1 ) {
						if (!camera.moveEvents[i]) { //if key not already pressed
			    			camera.moveEvents[i] = window.setInterval(  intervalF, 1/camera.walkSpeed );
			    		}
					}
					if(camera.enableDebugPositions) {
						camera.debugPositions();
					}
				}else {
					if ( jump && ! camera.jump ) {
						gravity.yVel = camera.jumpHeight;
						camera.jump = true;
					}
				}
			}
		});
	},
	toggleFullscreen: function(e) {
		if (e.requestFullScreen) {
			if (!document.fullScreen) {
				e.requestFullscreen();
				camera.isFullscreen = true;
			}else {
				document.exitFullScreen();
				camera.isFullscreen = false;
			}
		}else if (e.mozRequestFullScreen) {
			if (!document.mozFullScreen) {
				e.mozRequestFullScreen();
				camera.isFullscreen = true;
			}else {
				document.mozCancelFullScreen();
				camera.isFullscreen = false;
			}
		}else if (e.webkitRequestFullScreen) {
			if (!document.webkitIsFullScreen) {
				e.webkitRequestFullScreen();
				camera.isFullscreen = true;
			}else {
				document.webkitCancelFullScreen();
				camera.isFullscreen = false;
			}
		}
	},
	fullscreenChange: function() {
		e = world.displayE;
		if (document.webkitFullscreenElement === e ||
		document.mozFullscreenElement === e ||
		document.mozFullScreenElement === e) {
    		e.requestPointerLock = e.requestPointerLock ||
                              e.mozRequestPointerLock ||
                              e.webkitRequestPointerLock;
   			e.requestPointerLock();
  		}
	},
	togglePointerLock: function(e) {
		var pointerLock = 'pointerLockElement' in document ||
							  'mozPointerLockElement' in document ||
							  'webkitPointerLockElement' in document;
		if (pointerLock) {
			if (camera.isMousePointerLocked) {
				document.exitPointerLock = document.exitPointerLock ||
					document.mozExitPointerLock ||
					document.webkitExitPointerLock;
					document.exitPointerLock();
			}else {
				e.requestPointerLock = e.requestPointerLock ||
				     e.mozRequestPointerLock ||
				     e.webkitRequestPointerLock;
					e.requestPointerLock();
			}
		}
		document.addEventListener('pointerlockchange', camera.pointerLockChange, false);
		document.addEventListener('mozpointerlockchange', camera.pointerLockChange, false);
		document.addEventListener('webkitpointerlockchange', camera.pointerLockChange, false);
	},
	pointerLockChange: function() {
		var e = world.displayE;
		if (document.pointerLockElement === e ||
		document.mozPointerLockElement === e ||
		document.webkitPointerLockElement === e) {
		  	camera.isMousePointerLocked = true;
		} else {
			camera.isMousePointerLocked = false;
		}
	}
}
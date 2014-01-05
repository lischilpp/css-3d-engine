function init() {
	world = new World( document.getElementById( "display" ) );
	//#camera settings
	camera = new Camera( 0, 0, -800,    18, 0, 0,   1000);
	camera.enableDebugPositions = false;
	camera.walkSpeed = 30;
	camera.walkAccuracy = 6;
	//#other settings
	camera.jumpHeight = 30;
	camera.height = 400;
	//#lock/unlock mouse using the "f" key
	window.onkeydown = function(e) {
		if ( e.keyCode == 70 ) {
			/*camera.toggleFullscreen(world.displayE); // 											Fullscreen Mode -> numberic key events not triggering -> changing w-a-s-d to arrow keys
			document.addEventListener("fullscreenchange", camera.fullscreenChange, false);
			document.addEventListener("mozfullscreenchange", camera.fullscreenChange, false);
			document.addEventListener("webkitfullscreenchange", camera.fullscreenChange, false)*/
			camera.togglePointerLock(world.displayE);
		}
	}
	//#textures
	var wallTexture   = 'res/textures/stone1.jpg';
	var wallColor     = '#993A00';
	var floorTexture  = 'res/textures/stone2.jpg';
	var floorColor    = '#7F7F7F';
	var clothTexture  = 'http://fc03.deviantart.net/fs70/i/2013/140/d/e/blue_suede_texture_fuzzy_fabric_stock_wallpaper_by_texturex_com-d65y92e.jpg';
	var clothColor    = '#0059FF';
	var woodTexture   = 'http://th07.deviantart.net/fs70/PRE/i/2010/302/1/4/tileable_wood_texture_01_by_goodtextures-d31qde8.jpg';
	var woodColor     = '#4C1F00';
	var pillowTexture = 'http://fc03.deviantart.net/fs40/i/2009/044/c/a/texture_083_by_juuichimei.jpg';
	var pillowColor   = '#00BFFF';
	
	var blue = '#009bd3';
	var yellow = '#d1d100';
	var pink = '#ce00c0';
	world.addCuboid(-700,0,-1000, 200,1000,200, 0,0,0, blue);
	world.addCuboid(300,0,-1000, 200,1000,200, 0,0,0, blue);
	world.addQuadrangularPlane(-1100,-200,-900, 2000, 200, 0,0,0, '', '', 'title', '<h1>CSS 3d Demonstration</h1>');
	world.addCuboid(500,700,-2000, 200,200,200, 0,0,0, 'red', '', 'animation1');
	world.addCuboid(500,400,-2500, 300,500,300, 0,0,0, 'yellow', '', 'animation2');
	world.addCuboid(500,300,-3000, 200,200,200, 30,45,10, '', '', 'animation3');
	world.addCuboid(-200,300,-3000, 200,200,200, 0,0,0, pink, '', 'animation4');
	world.addCuboid(-700,300,-3000, 20,200,20, 60,60,90, 'red');
	world.addCuboid(-700,300,-2500, 40,200,200, -20,40,10, 'blue');
	world.addCuboid(-900,300,-2000, 300,300,300, 70,-60,30, 'green', '', 'animation5');
	world.addQuadrangularPlane(-1500,-2000,-2000, 3000, 6000, 90,0,0, '', '', 'floor' );
	
	gameLoop = new GameLoop( 10 ); // 10
	gravity = new Gravity( 1 ); //2.5
	world.init();
	
	var prlx = {};
	prlx.speed = 10;
	prlx.scroll = function(delta) {
		console.log(delta);
		if (delta == 1) {
			camera.pz += prlx.speed;
		}else if (delta == -1) {
			camera.pz -= prlx.speed;
		}
		camera.updatePosition();
	}
	function onMouseWheel(e) {
	        var e = window.event || e;
	        prlx.scroll( Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) );
	}
	var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"
	document.addEventListener(mousewheelevt, onMouseWheel);
}


document.addEventListener( "DOMContentLoaded", init, false );

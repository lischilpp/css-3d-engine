function Camera( stX, stY, stZ, stRX, stRY, stRZ, perspective ) {
	this.px = stX;
	this.py = stY;
	this.pz = stZ;
	this.rx   = stRX;
	this.ry   = stRY;
	this.rz   = stRZ;
	this.yTranslation = 200;
	this.controls = new Array( 87,83,65,68,16,32, 37,39,40,38 );
	this.walkSpeed = 1000;
	this.walkAccuracy = 1;
	this.jumpHeight = 30;
	this.lastJumpY = -1;
	this.jumpInterval = null;
	this.jump = false;
	this.moveCalculation = {};
	this.moveCalculation.m1 = 0;
	this.moveCalculation.m2 = 0;
	this.onMoveChangeValues = {
		px: 0,
		py: 0,
		pz: 0,
		rx: 0,
		ry: 0,
		rz: 0
	};
	this.enableDebugPositions = false;
	this.isFullscreen = false;
	this.isMousePointerLocked = false;
	this.perspective = perspective;
	this.moveEvents = [];
	this.domE = document.getElementById( "camera" );
	this.activeMouseDown = false;
	this.lastMousePos = {};
	this.updatePosition();
	CrossBrowserTransform.perspective(document.getElementById( "viewport" ), perspective);
	this.addUserEvents();
}
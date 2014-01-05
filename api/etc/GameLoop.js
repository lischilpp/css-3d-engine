function GameLoop( interval ) {
	this.interval = interval;
	this.run();
}

GameLoop.prototype = {
	run: function() {
		gameLoopInterval = false;
		if ( !gameLoopInterval ) {
			gameLoopInterval = window.setInterval( "gameLoop.update()", this.interval );
		}
	},
	update: function() {
		gravity.update();
	},
	pause: function() {
		window.clearInterval( gameLoopInterval );
	}
}
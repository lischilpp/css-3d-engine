World.prototype.animateElement = function(e, attr, speed) {
	e.style.webkitTransition = speed+'s ease';
	for(var i in attr) {
		e.style[i] = attr[i];
	}
}

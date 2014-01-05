World.prototype.animateElement = function(e, attr, speed) {
	e.style.webkitTransition = speed+'s ease';
	for(var i in attr) {
		eval('e.style.'+i+'="'+attr[i]+'"');
	}
}

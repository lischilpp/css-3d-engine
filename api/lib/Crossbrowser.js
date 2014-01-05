var CrossBrowserTransform = {};

CrossBrowserTransform.translate3d = function(e, px, py, pz, rx, ry, rz) {
	var transform = 'translate3d('+px+'px,'
					 			  +py+'px,'
					 			  +pz+'px) '
				   +'rotateX('+	   rx	+'deg) '
				   +'rotateY('+	   ry	+'deg) '
				   +'rotateZ('+	   rz	+'deg) ';
	e.style.webkitTransform = transform;
	e.style.mozTransform = transform;
	e.style.transform = transform;
}

CrossBrowserTransform.perspective = function(e, perspective) {
	var perspective = perspective+'px';
	e.style.webkitPerspective = perspective;
	e.style.mozPerspective    = perspective;
	e.style.perspective       = perspective;
}

CrossBrowserTransform.origin = function(e, ox, oy, oz) {
	var origin = ox+'px '+oy+'px '+oz+'px';
	e.style.webkitTransformOrigin = origin;
	e.style.MozTransformOrigin    = origin;
	e.style.transformOrigin       = origin;
}

var CrossBrowserFunctions = {};

CrossBrowserFunctions.requestAnimFrame = (function() {
	return window.requestAnimationFrame    ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		function( callback ) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

CrossBrowserAttribute = {};
CrossBrowserAttribute.borderImage = function(e, url) {
	var borderImage = 'url('+url+')';
	e.style.webkitBorderImageBottom = borderImage;
	e.style.mozBorderImageBottom = borderImage;
	e.style.borderBottomImage = borderImage;
}

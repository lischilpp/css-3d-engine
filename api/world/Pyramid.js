function Pyramid( px, py, pz, w, h, d, rx, ry, rz, color, texture, type ) {
	var py = document.createElement( "div" );
	py.className = "pyramid";
	if (typeof color == 'undefined') {
		var color = '';
	}
	if (typeof texture == 'undefined') {
		var texture = '';
	}
	if (typeof type != 'undefined') {
		py.className += " pyramid_"+type;
	}
	CrossBrowserTransform.translate3d(py, px, py, pz, rx, ry, rz);
	var trc = {}
	trc.height = MathFunctions.Pythagoras('c', h, d/2);
	trc.y = -h/2-trc.height+h;
	trc.rx = 30;//Math.acos( (Math.pow(d/2, 2) + Math.pow(trc.height, 2) - Math.pow(h, 2)) / (2 * d/2 * trc.height) );
	py.appendChild( new QuadrangularPlane( 0, 0, 0, w, h, 90, 0, 0, color, texture)); // base
	py.appendChild( new TriangularPlane( 0, trc.y, d/2, w, trc.height, trc.rx, 0, 0, color, texture));  //front
	py.appendChild( new TriangularPlane( 0, trc.y, -d/2, w, trc.height, -trc.rx, 0, 0, color, texture)); //back
	py.appendChild( new TriangularPlane( w/2, trc.y, 0, w, trc.height, 0, 90, 0, color, texture)); //right
	py.appendChild( new TriangularPlane( -w/2, trc.y, 0, w, trc.height, 0, 90, 0, color, texture));//left
	return py;
}
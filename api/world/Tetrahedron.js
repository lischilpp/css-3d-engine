function Tetrahedron( px, py, pz, w, h, d, rx, ry, rz, color, texture, type ) {
	var tr = document.createElement( "div" );
	tr.className = "triangle";
	if (typeof color == 'undefined') {
		var color = '';
	}
	if (typeof texture == 'undefined') {
		var texture = '';
	}
	if (typeof type != 'undefined') {
		tr.className += " triangle_"+type;
	}
	CrossBrowserTransform.translate3d(tr, px, py, pz, rx, ry, rz);
	var trc = { //Triangle Calculation
		side: {
			a: d/2,
			b: MathFunctions.Pythagoras('c', h, d/2), // Calculate height of rotated children
			c: h
		}
	};
	trc.angle = {
		gamma: Math.acos( (Math.pow(trc.side.a, 2) + Math.pow(trc.side.b, 2) - Math.pow(trc.side.c, 2)) / (2 * trc.side.a * trc.side.b) )
	}
	tr.appendChild( new TriangularPlane( 0, 0, 0, w, trc.side.b, trc.angle.gamma, 0, 0, color, texture)); // front
	tr.appendChild( new TriangularPlane( 0, 0, 0, w, trc.side.b, trc.angle.gamma, 0, 0, color, texture)); // right
	//TODO: Complete
	return tr;
}
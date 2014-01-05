function Cuboid( px, py, pz, w, h, d, rx, ry, rz, color, texture, id ) {
	var cb = { style: {} };
	cb.isContainer = true;
	if (typeof color == 'undefined') {
		var color = '';
	}
	if (typeof texture == 'undefined') {
		var texture = '';
	}
	if (typeof id != 'undefined') {
		cb.className = "cube_"+id;
	}
	cb.style.transform = {};
	cb.style.transform.translate3d = [ px, py, pz ];
	cb.style.transform.rotate3d    = [ rx, ry, rz ];
	cb.elements = [];
				 		   //      px     py   pz   w  h    rx   ry  rz
	cb.elements.push( new QuadrangularPlane(      0,     0,    0, w, h,    0,    0, 0, color, texture)); // front
	cb.elements.push( new QuadrangularPlane(      0,     0, -d,   w, h,    0,  180, 0, color, texture)); // back
	cb.elements.push( new QuadrangularPlane(   -d/2,     0, -d/2, d, h,    0,  270, 0, color, texture)); // left
	cb.elements.push( new QuadrangularPlane(  w-d/2,     0, -d/2, d, h,    0, -270, 0, color, texture)); // right
	cb.elements.push( new QuadrangularPlane(      0, h-d/2, -d/2, w, d,   90,    0, 0, color, texture)); // bottom
	cb.elements.push( new QuadrangularPlane(      0,  -d/2, -d/2, w, d,  -90,    0, 0, color, texture)); // top
	cb.type = 'cuboid';
	return cb;
}

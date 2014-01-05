function QuadrangularPlane( px, py, pz, w, h, rx, ry, rz, color, texture, id, content ) {
	var pl = { style: {} };
	if (typeof color != 'undefined' && color != '') {
		pl.style.backgroundColor = color;
	}
	if (typeof texture != 'undefined' && texture != '') {
		if (world.enableTextures) {
			pl.style.backgroundImage = 'url('+texture+')';
		}
	}
	if (typeof id != 'undefined' && id != '') {
		pl.className = "plane_"+id;
	}
	if (typeof content != 'undefined' && content != '') {
		pl.innerHTML = content;
	}
	pl.style.width = w;
	pl.style.height = h;
	pl.style.transform = {};
	pl.style.transform.translate3d = [ px, py-camera.yTranslation, pz ];
	pl.style.transform.rotate3d    = [ rx, ry, rz ];
	pl.isContainer = false;
	pl.type = 'q-plane';
	return pl;
}
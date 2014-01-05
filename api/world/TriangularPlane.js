function TriangularPlane( px, py, pz, w, h, rx, ry, rz, color, texture, type, content ) {
	var pl = document.createElement( "div" );
	if (typeof color != 'undefined' && color != '') {
		pl.style.borderLeftColor = 'transparent';
		pl.style.borderRightColor = 'transparent';
		pl.style.borderBottomColor = color;
	}
	if (typeof texture != 'undefined' && texture != '') {
		if (world.enableTextures) {
			//TODO: Add texture support using border-image attribute
			CrossBrowserAttribute.borderImage(pl, texture);
		}
	}
	if (typeof type != 'undefined' && type != '') {
		pl.className += "Plane_"+type;
	}
	if (undefined === content) {
		content = "";
	}
	pl.innerHTML = content;
	pl.style.width = '0px';
	pl.style.height = '0px';
	pl.style.borderLeftStyle = 'solid';
	pl.style.borderRightStyle = 'solid';
	pl.style.borderBottomStyle = 'solid';
	pl.style.borderLeftWidth = w/2 + 'px';
	pl.style.borderRightWidth = w/2 + 'px';
	pl.style.borderBottomWidth = h + 'px';
	CrossBrowserTransform.translate3d(pl, px, py, pz, rx, ry, rz);
	return pl;
}
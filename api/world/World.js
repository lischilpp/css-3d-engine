function World( dspElem ) {
	this.displayE = dspElem;
	this.camera = document.getElementById( 'camera' );
	this.domE = document.getElementById('world');
	this.domE.id = 'world';
	this.enableTextures = true;
	this.elements = [];
}

World.prototype = {
	addQuadrangularPlane: function( px, py, pz, w, h, rx, ry, rz, color, img, type, content ) {
		pl = new QuadrangularPlane( px, py, pz, w, h, rx, ry, rz, color, img, type, content );
		//this.domE.appendChild( pl );
		var arrayIndex = this.elements.length
		pl.arrayIndex = arrayIndex;
		this.elements.push(pl);
		return arrayIndex;
	},
	addTriangularPlane: function( px, py, pz, w, h, rx, ry, rz, color, img, type, content ) {
		pl = new TriangularPlane( px, py, pz, w, h, rx, ry, rz, color, img, type, content );
		this.domE.appendChild( pl );
	},
	addCuboid: function( px, py, pz, w, h, d, rx, ry, rz, color, img, type ) {
		var cb = new Cuboid( px, py, pz, w, h, d, rx, ry, rz, color, img, type );
		//this.domE.appendChild( cb );
		var arrayIndex = this.elements.length
		cb.arrayIndex = arrayIndex;
		this.elements.push(cb);
		return arrayIndex;
	},
	addTriangle: function( px, py, pz, w, h, d, rx, ry, rz, color, img, type ) {
		var tr = new Triangle( px, py, pz, w, h, d, rx, ry, rz, color, img, type );
		this.domE.appendChild( tr );
	},
	addPyramid: function( px, py, pz, w, h, d, rx, ry, rz, color, img, type ) {
		var py = new Pyramid( px, py, pz, w, h, d, rx, ry, rz, color, img, type );
		this.domE.appendChild( py );
	},
	addTube: function( px, py, pz, w, h, d, rx, ry, rz, color, img, type ) {
		var tb = new Tube( px, py, pz, w, h, d, rx, ry, rz, color, img, type );
		this.domE.appendChild( tb );
	},
	getDOMElementString: function(i) {
		var el = this.elements[i];
		var domString = new StringDOMElement('div');
		if(typeof el.className !== 'undefined') {
			domString.addAttribute('class', el.className);
		}
		var translate3d = el.style.transform.translate3d;
		var rotate3d    = el.style.transform.rotate3d;
		domString.addCBStyle(
			'transform', 
				'translate3d('+translate3d[0]+'px,'+translate3d[1]+'px,'+translate3d[2]+'px)'
				+' rotateX('+rotate3d[0]+'deg)'
				+' rotateY('+rotate3d[1]+'deg)'
				+' rotateZ('+rotate3d[2]+'deg)'
		);
		if (el.isContainer) {
			domString.addCBStyle('transform-style', 'preserve-3d');
			var childrenCount = el.elements.length;
			var children = [];
			for( j=0; j<childrenCount; j++) {
				children[j] = new StringDOMElement('div');
			}
			for (var j=0; j<childrenCount; j++) {
				if (typeof el.elements[j].style.width !== 'undefined') {
					children[j].addStyle('width', el.elements[j].style.width+'px');
				}
				if (typeof el.elements[j].style.height !== 'undefined') {
					children[j].addStyle('height', el.elements[j].style.height+'px');
				}
				if (typeof el.elements[j].style.backgroundColor !== 'undefined') {
					children[j].addStyle('background-color', el.elements[j].style.backgroundColor);
				}
				if (typeof el.elements[j].style.backgroundImage !== 'undefined') {
					children[j].addStyle('background-image', el.elements[j].style.backgroundImage);
				}
				var translate3d = el.elements[j].style.transform.translate3d;
				var rotate3d    = el.elements[j].style.transform.rotate3d;
				children[j].addCBStyle(
					'transform', 
						'translate3d('+translate3d[0]+'px,'+translate3d[1]+'px,'+translate3d[2]+'px)'
						+' rotateX('+rotate3d[0]+'deg)'
						+' rotateY('+rotate3d[1]+'deg)'
						+' rotateZ('+rotate3d[2]+'deg)'
				);
			}
			var childrenString = '';
			for(var j=0; j<childrenCount; j++) {
				childrenString += children[j].retrn();
			}
			domString.html(childrenString);
		}else {
			if (typeof el.style.width !== 'undefined') {
				domString.addStyle('width', el.style.width+'px');
			}
			if (typeof el.style.height !== 'undefined') {
				domString.addStyle('height', el.style.height+'px');
			}
			if (typeof el.style.backgroundColor !== 'undefined') {
				domString.addStyle('background-color', el.style.backgroundColor);
			}
			if (typeof el.style.backgroundImage !== 'undefined') {
				domString.addStyle('background-image', el.style.backgroundImage);
			}
			if (typeof el.innerHTML !== 'undefined') {
				domString.html(el.innerHTML);
			}
		}
		return domString.retrn();
	},
	init: function() {
		var elementsCount = this.elements.length;
		var domElem = '';
		for(var i=0; i<elementsCount; i++) {
			domElem += this.getDOMElementString(i);
		}
		this.domE.innerHTML = domElem;
	},
	redrawElement: function(i) {
		document.getElementsById('world').removeChild(i);
		this.domE.innerHTML += this.getDOMElementString(i);
		//TODO: redraw
	},
	add: function(el) {
		this.elements.push(el);
	}
}
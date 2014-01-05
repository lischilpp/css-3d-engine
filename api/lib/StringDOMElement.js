function StringDOMElement(tag) {
	this.string = '<'+tag;
	this.prefixes = [ 'moz', 'webkit', 'o', 'ms' ];
	this.style = new String();
	this.attributes = new String();
	this.tag = tag;
	this.content = '';
}

StringDOMElement.prototype = {
	addStyle: function(attr, val) {
		this.style += attr+':'+val+';';
	},
	addCBStyle: function(attr, val) {
		var prefixesCount = this.prefixes.length;
		for (var i=0; i<prefixesCount; i++) {
			this.style += '-'+this.prefixes[i]+'-'+attr+': '+val+';';
		}
	},
	addAttribute: function(attr, val) {
		this.attributes += ' '+attr+'="'+val+'"';
	},
	html: function(c) {
		this.content = c;
	},
	retrn: function() {
		return this.string + this.attributes + ' style="'+ this.style + '">'+this.content+'</'+this.tag+'>';
	},
}

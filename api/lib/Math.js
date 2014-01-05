var MathFunctions = {};
MathFunctions.Pythagoras = function(s, v1, v2) {
	if (s == 'a' || s == 'b') {
		return Math.sqrt(Math.pow(v1,2) - Math.pow(v2,2));
	}else if (s == 'c') {
		return Math.sqrt(Math.pow(v1,2) + Math.pow(v2,2));
	}else {
		return false;
	}
}

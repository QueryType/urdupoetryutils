var devngr_arr=[".N",".n","ha","a","a","aa","i","ii","u","uu","r","l","e","e","e","ai","o","o","o","au","k","kh","g","gh","NG","ch","chh","j","jh","ny","T","Th","D","Dh","N","t","th","d","dh","n","nnn","p","ph","b","bh","m","y","r","rr","l","ll","lll","v","sh","shh","s","h","?16","?17","","","aa","i","ii","u","uu","r","rr","e","e","e","ai","o","o","o","au","","?18","?19","(OM)","","","?1","?2","?3","?4","?5","q","Kh","g","z",".D",".Dh","f","yy","rr","ll","l","ll","|","||","ZERO","ONE","TWO","THREE","FOUR","FIVE","SIX","SEVEN","EIGHT","NINE","SIGN","?6","?7","?8","?9","?10","?11","?12","?13","?14","?15","gg","jj",".","ddd","bb"];

addconso_arr=["q","kh","gh","z",".D",".Dh","f","yy"];

var debug_me = false;
var debugtarget = '';

function reverser() {
	var lang = document.myForm.lang.options[document.myForm.lang.selectedIndex].text;
	debugtarget = '';
	
	if (lang === 'Hindi') {
		var alltext = document.myForm.message.value;
		var bb1 = '';	
		var i;
		for (i = 0; i < alltext.length; i++) {
			if (alltext.charAt(i) === '\n' || alltext.charAt(i) === ' ') {
				bb1 += alltext.charAt(i);	
			} else if (alltext.charCodeAt(i) > 127) {
				var thischar = alltext.charCodeAt(i);
				if (i !== alltext.length - 1 && ((thischar >= 2325 && thischar <= 2361) || (thischar >= 2392 && thischar <= 2399))) { //Added for Additional consonants
					if (addImplicitA(alltext, i)) {
						bb1 += writeOutput(alltext, i, true);
					} else {
						bb1 += writeOutput(alltext, i, false);
					}
				} else {	
					bb1 += writeOutput(alltext, i, false);
				}
			} else {
				bb1 += alltext.charAt(i);
			}
		}
		document.myForm.decoded.value = bb1;	  
		document.myForm.debug.value = debugtarget;	 
	} else {
		alert(lang + ' not implemented');
	}
}

//defining rules to add implicit 'a' or not
function addImplicitA(text, index) {
	var result = false;

	//if next is nukta skip ahead
	if (index + 1 < text.length && text.charCodeAt(index + 1) === 2364) {
		index++;
	}

	if (index + 1 < text.length) {
		var nextChar = text.charCodeAt(index + 1);
		if (nextChar >= 2325 && nextChar <= 2361) { // Add if next is Independent vowel
			result = true;
		} else if (nextChar >= 2392 && nextChar <= 2399) { //Add if next Additional consonants
			result = true;
		} else if (nextChar === 2381) { // Do not add if next is halant - 2381
			result = false;
		}
	}

	return result;
}

function writeOutput(text, index, implicita) {     
	var revchar = '';
	var thischar = text.charCodeAt(index);
	
	//if next is nukta, get additional consonant
	if (index + 1 < text.length && text.charCodeAt(index + 1) === 2364) {		
		switch (thischar) {
			case 2325: //q
				revchar = addconso_arr[0];
				break;
			case 2326: //kh
				revchar = addconso_arr[1];
				break;
			case 2327: //gh
				revchar = addconso_arr[2];
				break;
			case 2332: //z
				revchar = addconso_arr[3];
				break;
			case 2337: //.D
				revchar = addconso_arr[4];
				break;
			case 2338: //.Dh
				revchar = addconso_arr[5];
				break;
			case 2347: //f
				revchar = addconso_arr[6];
				break;
			case 2351: //yy
				revchar = addconso_arr[7];
				break;
			default:
				var arrayIndex = thischar - 2305;
				if (arrayIndex >= 0 && arrayIndex < devngr_arr.length) {
					revchar = devngr_arr[arrayIndex];
				}
		}
	} else {
		var arrayIndex = thischar - 2305;
		if (arrayIndex >= 0 && arrayIndex < devngr_arr.length) {
			revchar = devngr_arr[arrayIndex];
		}
	}
	
	if (implicita) {
		revchar += "a";
	}

	if (debug_me) {
		debugtarget += text.charAt(index) + '-' + thischar + '-' + '[' + revchar + ']';
	}
	return revchar;
}

function writeOutput2(charcode,revchar) {     

	 if (debug_me) {
		debugtarget += charcode + '['+revchar+']';
	 }
	 return revchar;
}



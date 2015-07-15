
//Behr Class
function Behr(pattern,name) {
	this._name = name;
	this._pattern = pattern;
	this._arkaanpattern = "";
	pattern = trim(pattern,'');
	this._syllable_count=0;
	//added code to determine arkan pattern
	var arkaan = "";
	for(i=0; i<pattern.length;i++) {
		if (pattern.charAt(i) != '-') {
			arkaan += pattern.charAt(i);
			this._syllable_count++;
		}else {
			this._arkaanpattern += getArkaan(arkaan);			
			arkaan = "";
		}
	}
	//add the last arkaan
	this._arkaanpattern += getArkaan(arkaan);
}

//properties
Behr.prototype._name;
Behr.prototype._pattern;
Behr.prototype._syllable_count;
Behr.prototype._arkaanpattern;

//operations
Behr.prototype.getName = function() {
    return this._name;
}

Behr.prototype.getPattern = function() {
	return this._pattern;
}

Behr.prototype.getSyllableCount = function() {
	return this._syllable_count;
}

Behr.prototype.getArkaanPattern = function () {
	return this._arkaanpattern;
}

Behr.prototype.isMatch = function(pattern) {
	return (pattern == this._pattern);
}

Behr.prototype.isRegMatch = function(pattern) {
	var matchme = new RegExp(pattern)
	var plain_pattern ="";
	var k=0;
	for(k=0; k<this._pattern.length;k++) {
		if (this._pattern.charAt(k) != '-') {
			plain_pattern += this._pattern.charAt(k);
		}
	}
	return plain_pattern.match(matchme);
}
//Behr Class Ends


//BehrMap Class
function BehrMap(count) {
	this._count = count;
	this._behr_list = new Array();	
	this._curridx = 0;
}

//properties
BehrMap.prototype._count;
BehrMap.prototype._behr_list;
BehrMap.prototype._curridx;

//operations
BehrMap.prototype.addBehr = function(behr) {
	this._behr_list[this._curridx++] = behr;
}


BehrMap.prototype.getSyllableCount = function() {
	return this._count;
}

BehrMap.prototype.getBehrs = function() {
	return this._behr_list;
}

//BehrMap Class Ends



//BehrHashMap Class
function BehrHashMap() {
	this._behr_map_list = new Array();
}

//properties
BehrHashMap.prototype._behr_map_list;

//operations
BehrHashMap.prototype.add = function(count,behr) {
    var i=0;
	for(i=0;i<this._behr_map_list.length;i++) {
		var behrMap = this._behr_map_list[i];
		if (behrMap.getSyllableCount() == count)	{
			behrMap.addBehr(behr);
			this._behr_map_list[i] = behrMap;
			break;
		}
	}

	//if count of syllables does not exist create a new
	if (i == this._behr_map_list.length) {
		 var behrMap = new BehrMap(count);
		 behrMap.addBehr(behr);
		 this._behr_map_list[i] = behrMap;
	}

}

BehrHashMap.prototype.getBehrsByCount = function(count) {

	var i=0;
	for(i=0;i<this._behr_map_list.length;i++) {
		var behrMap = this._behr_map_list[i];
		if (behrMap.getSyllableCount() == count) {
			return behrMap.getBehrs();
		}
	}

	//if count of syllables does not exist send empty array
	if (i == this._behr_map_list.length) {
		return new Array();
	}

}

BehrHashMap.prototype.getBehrByPattern = function(pattern) {

	pattern = trim(pattern,'');

	var count = 0;
	var i = 0;
	for(i=0; i<pattern.length;i++) {
		if (pattern.charAt(i) != '-') {
			count++;
		}
	}

	for(i=0;i<this._behr_map_list.length;i++) {
		var behrMap = this._behr_map_list[i];
		if (behrMap.getSyllableCount() == count) {
			var behrMaps =  behrMap.getBehrs();
			var j=0;
			for(j=0; j<behrMaps.length; j++){
				var behr = behrMaps[j];
				if (behr.getPattern() == pattern )	{
					return behr;
				}
			}
		}
	}

	//if count of syllables does not exist send empty array
	if (i == this._behr_map_list.length) {
		return new Array();
	}

}

BehrHashMap.prototype.getBehrsByRegPattern = function(regPattern,mode) {
	var ret_arr = new Array();
	var x=0;
	var y=0;
	var searchPattern = "";
	if (mode == 'start')  {
		searchPattern = "^" + regPattern;
	}else {
		searchPattern = regPattern + "$";
	}
	
	for(y=0;y<this._behr_map_list.length;y++) {
		var behrMap = (this._behr_map_list[y]).getBehrs();
		var z=0;
		for (z=0; z<behrMap.length; z++)	{
			var behr = behrMap[z];
			if (behr.isRegMatch(searchPattern)) {
				ret_arr[x++] = behr;
			}
		}
	}

	return ret_arr;

}

//BehrHashMap Class Ends

//Global declarations

//Setup the arkaan pattern names
function getArkaan(digitalForm) {
		if (digitalForm == '222') { 
			return '[maf-uu-lun]';
		}
		if (digitalForm == '2212') { 
			return '[mus-taf-i-lun]';
		}
		if (digitalForm == '221') { 
			return '[maf-uu-l]';
		}
		if (digitalForm == '22') { 
			return '[fa-lun]';
		}
		if (digitalForm == '2122') { 
			return '[faa-i-laa-tun]';
		}
		if (digitalForm == '2121') { 
			return '[faa-i-laa-t]';
		}
		if (digitalForm == '212') { 
			return '[faa-i-lun]';
		}
		if (digitalForm == '2112') { 
			return '[muf-ta-i-lun]';
		}
		if (digitalForm == '21' || digitalForm == '12') { 
			return '[fa-l]';
		}
		if (digitalForm == '2') { 
			return '[fa]';
		}
		if (digitalForm == '1222') { 
			return '[ma-faa-ii-lun]';
		}
		if (digitalForm == '1221') { 
			return '[ma-faa-ii-l]';
		}
		if (digitalForm == '122') { 
			return '[fa-uu-lun]';
		}
		if (digitalForm == '1212') { 
			return '[ma-faa-i-lun]';
		}
		if (digitalForm == '121') {
			return '[fa-uu-l]';
		}
		if (digitalForm == '12') { 
			return '[fa-al]';
		}
		if (digitalForm == '1122') { 
			return '[fa-i-laa-tun]';
		}
		if (digitalForm == '11212') { 
			return '[mu-ta-faa-i-lun]';
		}
		if (digitalForm == '1121') { 
			return '[fa-i-laa-tu]';
		}
		if (digitalForm == '112') { 
			return '[fa-i-lun]';
		}
}

//Setup Global BehrHashMap
var behrHashMap = new BehrHashMap();

var behr = new Behr("222-212-122","hazaj musaddas a;xram ashtar ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("22-122-22-122","mutaqaarib mu;samman a;sram");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("22-1221-22-122","mutaqaarib mu;samman a;sram");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("2212-2212-2212-2212","rajaz mu;samman saalim");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("221-2122-221-2122","mu.zaari(( mu;samman a;xrab");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("221-21221-221-2122","mu.zaari(( mu;samman a;xrab");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("221-2121-1221-212","mu.zaari(( mu;samman a;xrab makfuuf ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("22-112-22-22-22-112-22-22","mutadaarik mu;samman mu.zaa((af maq:tuu(( ma;xbuun");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("22-112-22-22-22-112-22-22","mutadaarik mu;samman mu.zaa((af maq:tuu(( ma;xbuun");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("221-1222-221-1222","hazaj mu;samman a;xrab");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("221-12221-221-1222","hazaj mu;samman a;xrab");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("221-1221-1221-122","hazaj mu;samman a;xrab makfuuf ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("221-1212-122","hazaj musaddas a;xrab maqbuu.z ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("2122-2122-2122-212","ramal mu;samman ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("2122-2122-212","ramal musaddas ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("212-212-212-212-212-212-212-212","mutadaarik mu;samman mu.zaa((af saalim");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("212-212-212-212","mutadaarik mu;samman saalim");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("212-212-212-2","mutadaarik mu;samman maq:tuu(( ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("2122-1212-22","xafiif musaddas ma;xbuun ma;h;zuuf maq:tuu((");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("1122-1212-22","xafiif musaddas ma;xbuun ma;h;zuuf maq:tuu((");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("2122-1212-112",";xafiif musaddas ma;xbuun ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("1122-1212-112",";xafiif musaddas ma;xbuun ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("2122-1122-22","ramal musaddas ma;xbuun ma;h;zuuf maq:tuu((");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("1122-1122-22","ramal musaddas ma;xbuun ma;h;zuuf maq:tuu((");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("2122-1122-112","ramal musaddas ma;xbuun ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("1122-1122-112","ramal musaddas ma;xbuun ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("2122-1122-1122-22","ramal mu;samman ma;xbuun ma;h;zuuf maq:tuu((");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("1122-1122-1122-22","ramal mu;samman ma;xbuun ma;h;zuuf maq:tuu((");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("2122-1122-1122-112","ramal mu;samman ma;xbuun ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("1122-1122-1122-112","ramal mu;samman ma;xbuun ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("212-1222-212-1222","hazaj mu;samman ashtar");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("212-12221-212-1222","hazaj mu;samman ashtar");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("212-1212-212-1212","hazaj mu;samman ashtar maqbuu.z");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("212-12121-212-1212","hazaj mu;samman ashtar maqbuu.z");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("2112-212-2112-212","munsari;h mu;samman ma:tvii maksuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("2112-2121-2112-212","munsari;h mu;samman ma:tvii maksuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("2112-2121-2112-2","munsari;h mu;samman ma:tvii man;huur");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("2112-2112-212","sarii(( musaddas ma:tvii maksuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("2112-1212-2112-1212","rajaz mu;samman ma:tvii ma;xbuun");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("2112-12121-2112-1212","rajaz mu;samman ma:tvii ma;xbuun");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("1222-1222-1222-1222","hazaj mu;samman saalim");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("1222-1222-122","hazaj musaddas ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("122-122-122-122","mutaqaarib mu;samman saalim");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("122-122-122-12","mutaqaarib mu;samman ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("121-22-121-22-121-22-121-22","mutaqaarib mu;samman mu.zaa((af maqbuu.z a;slam");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("121-22-121-22-121-22","mutaqaarib musaddas mu.zaa((af maqbuu.z a;slam");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("1212-1212-1212-1212","hazaj mu;samman maqbuu.z");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("1212-1122-1212-22","mujta;s mu;samman ma;xbuun ma;h;zuuf maq:tuu((");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("1212-1122-1212-112","mujta;s mu;samman ma;xbuun ma;h;zuuf");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("1212-1122-1212-1122","mujta;s mu;samman ma;xbuun");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("1121-2122-1121-2122","ramal mu;samman mashkuul");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("1121-21221-1121-2122","ramal mu;samman mashkuul");
behrHashMap.add(behr.getSyllableCount(),behr);

var behr = new Behr("11212-11212-11212-11212","kaamil mu;samman saalim");
behrHashMap.add(behr.getSyllableCount(),behr);

behr = null;
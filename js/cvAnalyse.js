



var cvV_arr=["","","","V","v","V","v","V","v","V","C","C","V","V","V","V","V","V","V","V","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","","","","","V","v","V","v","V","C","C","","V","V","V","V","V","V","V","","","","","","","","","","","","C","C","C","C","C","C","C","C","C","C","C","C","","","","","","","","","","","","","","","","","","","","","","","","C","C","","C","C"];



	function allanalyze() {
		var tgt_text = document.getElementById("result");
		if (!tgt_text) {
			alert("Result element not found");
			return;
		}
		
		tgt_text.innerHTML = "";
		
		var messageElement = document.mtForm.message;
		if (!messageElement || !messageElement.value.trim()) {
			tgt_text.innerHTML = "Please enter some text to analyze.";
			return;
		}
		
		var src_lines = messageElement.value.split("\n");		
		var misra_arr = [];
		var misra_cvV = [];

		var i = 0;
		var j = 0;
		for (i = 0; i < src_lines.length; i++) {
			if (trim(src_lines[i], '') === '') { //skip blank lines
				continue;		
			}
			misra_arr[j++] = trim(src_lines[i]);
		}

		var k = 0;
		var cvV_struct = "";
		for (i = 0; i < misra_arr.length; i++) {			
			var misra = misra_arr[i];		
			for (j = 0; j < misra.length; j++) {				
				var chCode = misra.charCodeAt(j);
				if (chCode >= 2305 && chCode <= 2431) {
					var index = chCode - 2305;
					if (index < cvV_arr.length) {
						cvV_struct += cvV_arr[index];
					}
				} else {
					cvV_struct += misra.charAt(j);
				}
			}
			misra_cvV[k++] = cvV_struct;
			cvV_struct = "";
		}

		print_in_tables(misra_arr, misra_cvV);
	}







function print_in_tables(misra_arr, misra_cvV) {
	var divelement = document.getElementById("result");
	if (divelement.firstChild) {
		divelement.removeChild(divelement.firstChild);
	}

	var table = document.createElement("table");
	table.border = "1";
	table.style.borderCollapse = "collapse";
	table.style.width = "100%";
	
	var i = 0;
	for (i = 0; i < misra_arr.length; i++) {		
		var misra = misra_arr[i];
		var misra_words = misra.split(" ");

		var row = table.insertRow(table.rows.length);
		
		var j = 0;
		for (j = 0; j < misra_words.length; j++) {
			var izafat_words = misra_words[j].split("-");
			var k = 0;
			for (k = 0; k < izafat_words.length; k++) {
				addToCell(row, izafat_words[k]);
			}
		}
		
		var misra_syllable = misra_cvV[i];
		var misra_syllable_words = misra_syllable.split(" ");

		row = table.insertRow(table.rows.length);
		j = 0;
		for (j = 0; j < misra_syllable_words.length; j++) {
			var izafat_words = misra_syllable_words[j].split("-");
			k = 0;
			for (k = 0; k < izafat_words.length; k++) {
				addToCell(row, izafat_words[k]);
			}
		}
	}

	divelement.appendChild(table);
}



function addToCell(row, word) {
	var tablecell = row.insertCell(row.cells.length);
	tablecell.style.border = "1px solid #ccc";
	tablecell.style.padding = "4px";
	tablecell.style.textAlign = "center";
	
	var txtspan = document.createElement("span");
	txtspan.textContent = word;
	tablecell.appendChild(txtspan);
}


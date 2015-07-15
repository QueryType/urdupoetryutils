

var cvV_arr=["","","","V","v","V","v","V","v","V","C","C","V","V","V","V","V","V","V","V","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","C","","","","","V","v","V","v","V","C","C","","V","V","V","V","V","V","V","","","","","","","","","","","","C","C","C","C","C","C","C","C","C","C","C","C","","","","","","","","","","","","","","","","","","","","","","","","C","C","","C","C"];

	function allanalyze() {

		var tgt_text = document.getElementById("result");
		tgt_text.innerHTML = "";
		
		var src_lines = document.mtForm.message.value.split("\n");		
		var misra_arr = new Array();
		var misra_cvV = new Array();

		var i=0;
		var j=0;
		for(i=0; i<src_lines.length; i++) {
			if ( trim(src_lines[i],'') == '' )	{ //skip blank lines
					continue;		
			}
			
			misra_arr[j++] = trim(src_lines[i]);
		}

		var k=0;
		var cvV_struct = "";
		for(i=0; i<misra_arr.length; i++) {			
			var misra = misra_arr[i];		
			for (j=0; j< misra.length; j++)	{				
				var chCode = misra.charCodeAt(j);
				if (chCode >= 2305 && chCode <= 2431)	{
					cvV_struct += cvV_arr[chCode - 2305];
				} else {
					cvV_struct += misra.charAt(j);
				}
			}
			misra_cvV[k++] = cvV_struct;
			cvV_struct = "";
		}

		print_in_tables(misra_arr,misra_cvV);

		misra_arr = null;
		misra_cvV = null;
	}



function print_in_tables(misra_arr,misra_cvV) {

	var divelement = document.getElementById("result");
	if (divelement.firstChild) {
	    divelement.removeChild(divelement.firstChild);
	}

	table = document.createElement("table");
	table.border = "1";
	var i=0;
	for (i=0; i<misra_arr.length; i++)	{		
		var misra = misra_arr[i];
		var misra_words = misra.split(" ");

		row = table.insertRow(table.rows.length);
		
		var j=0;
		for (j=0; j<misra_words.length; j++)	{
			var izafat_words = misra_words[j].split("-");
			var k=0;
			for (k=0; k<izafat_words.length ; k++ ) {
				addToCell(row,izafat_words[k]);
			}

		}
		
		var misra_syllable = misra_cvV[i];
		var misra_syllable_words = misra_syllable.split(" ");

		row = table.insertRow(table.rows.length);
		j=0;
		for (j=0; j<misra_syllable_words.length; j++)	{
			izafat_words = misra_syllable_words[j].split("-");
			k=0;
			for (k=0; k<izafat_words.length ; k++ ) {
				addToCell(row,izafat_words[k]);
			}
		}


	}

	divelement.appendChild(table);
}

function addToCell(row,word) {

			var tablecell = row.insertCell(row.cells.length);
			var txtspan = document.createElement("txtspan");
			txtspan.innerHTML = word;
			tablecell.appendChild(txtspan);

}

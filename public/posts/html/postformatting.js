var divs = document.getElementsByTagName('div');

function get_divs_containing(text,divs) {
    const out = []

    for (var i = 0, len = divs.length; i < len; ++i) {

        var tmpbool1 = divs[i].parentElement.id == "notebook-container";
        var tmpbool2 = divs[i].classList.value == "cell border-box-sizing code_cell rendered";
        var tmpbool3 = divs[i].innerHTML.indexOf(text) !== -1;
        if (tmpbool1 && tmpbool2 && tmpbool3) {
            var tmpdict = {};
            for (var j = 0, innerlen = divs[i].children.length; j < innerlen; j++) {
                if(divs[i].children[j].classList.value == "input"){tmpdict["input"] = divs[i].children[j]}
                if(divs[i].children[j].classList.value == "output_wrapper"){tmpdict["output"] = divs[i].children[j]}}
            out.push(tmpdict)
        }
    }
    return out
}

function hide_inputs(divs) {
    // Takes #hide_input flags and hides input only
    var hide_input_cells = get_divs_containing("#hide_input",divs)
    
    for (var i = 0, len = hide_input_cells.length; i < len; ++i) {
        hide_input_cells[i]["input"].style.display = "none"}}

function hide_outputs(divs) {
    // Takes #hide_output flags and hides output only
    var hide_input_cells = get_divs_containing("#hide_output",divs)
    
    for (var i = 0, len = hide_input_cells.length; i < len; ++i) {
        hide_input_cells[i]["input"].style.display = "none"}}

function hide_all(divs) {
    // takes #hide flags and hides inputs and outputs if they exist
    var hide_input_cells = get_divs_containing("#hide",divs)
    
    for (var i = 0, len = hide_input_cells.length; i < len; ++i) {
        var tmpvar = hide_input_cells[i]["input"]

        if(tmpvar.innerHTML.indexOf("#hide_input") == -1 && tmpvar.innerHTML.indexOf("#hide_output") == -1){ 
            tmpvar.style.display = "none"
            if("output" in hide_input_cells[i]){
                hide_input_cells[i]["output"].style.display = "none";}
        }
    }
    
}

hide_inputs(divs);
hide_outputs(divs);
hide_all(divs);

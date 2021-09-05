function hide_cells() {
    var divs = document.getElementsByTagName('div');
    for (var i = 0, len = divs.length; i < len; ++i) {
        // console.log("Outer Loop");
        // console.log(i);

        var tmpbool = divs[i].parentElement.id == "notebook-container";
        // console.log(tmpbool);
        if (tmpbool) {

            var tmpbool = divs[i].classList.value == "cell border-box-sizing code_cell rendered";
            // console.log(tmpbool);
            if (tmpbool) {


                var tmpbool = divs[i].innerHTML.indexOf("#hide_input") !== -1
                // console.log(tmpbool);
                if (tmpbool) {


                    for (var j = 0, innerlen = divs[i].children.length; j < innerlen; j++) {
                        // console.log("InnerLoop : Input");
                        // console.log(j);

                        var tmpbool = divs[i].children[j].classList.value == "input"
                        // console.log(tmpbool);
                        if (tmpbool) {

                            divs[i].children[j].style.display = "none";
                            console.log("Hid Input");

                        }
                    }
                }

                var tmpbool = divs[i].innerHTML.indexOf("#hide_output") !== -1;
                // console.log(tmpbool);
                if (tmpbool) {

                    for (var j = 0, innerlen = divs[i].children.length; j < innerlen; j++) {
                        // console.log("InnerLoop : Output");
                        // console.log(j);

                        var tmpbool = divs[i].children[j].classList.value == "output_wrapper";
                        // console.log(tmpbool);
                        if (tmpbool) {

                            divs[i].children[j].style.display = "none";
                            console.log("Hid Output");
                        }

                    }
                }
            }
        }
    }
};

hide_cells();


var temptable;

function add_subcategory() {
    if ($("#addform").valid()) {
        var controls = document.getElementById("addform").elements;
        var formdata = new FormData();
        for (var i = 0; i < controls.length; i++) {
            if (controls[i].type == "file") {
                formdata.append(controls[i].name, controls[i].files[0]);
            } else {
                formdata.append(controls[i].name, controls[i].value);
            }
        }
        var xml = new XMLHttpRequest();
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var output = this.responseText;
                // alert(output);
                // console.log(output);
                var result = "";
                if (output == 0) {
                    result = "<span class='display-4 text-danger'>Sub Category Already Exists.</span>"
                } else if (output == 1) {
                    result = "<span class='display-4 text-success'>Sub Category Added Successfully</span>"
                } else {
                    result = "<span class='display-4 text-success'>Try Again Later</span>"
                }
                document.getElementById("output").innerHTML = result;
                document.getElementById("addform").reset();

                viewsubcategory();
            }
        };
        xml.open("POST", "subcategoryaction.php", true);
        xml.send(formdata);
    }
}

function viewsubcategory() {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var ar = JSON.parse(this.response);
            // console.log(ar);
            var tab = "";
            // tab +="<table class='table tablemera' id='mysubcategory'>";
            // tab +="<thead>";
            // tab +="<tr><th>Sr No.</th><th>Sub Category Name</th><th>Description</th><th>Category</th><th colspan='2'>Controls</th></tr>";
            // tab +="</thead>";
            // tab +="<tbody>";
            var srno = 1;
            for (var x in ar) {
                obj = ar[x];
                tab += "<tr>";
                tab += "<td>" + srno + "</td>";
                tab += "<td>" + obj.subcategoryname + "</td>";
                tab += "<td>" + obj.description + "</td>";
                tab += "<td>" + obj.category + "</td>";
                tab += "<td><i onclick='deletesubcategory(\"" + obj.subcategoryid + "\")'" + "class='fa fa-trash text-danger' style='cursor: pointer;'></i></td>";
                tab += "<td><i onclick='editsubcategory(" + JSON.stringify(obj) + ")'" + "class='fa fa-edit text-warning' style='cursor: pointer;'></i></td>";
                tab += "</tr>";
                srno++;
            }

            // tab +="</tbody>";
            // tab +="</table>";
            document.getElementById("tableforsubcategory").innerHTML = tab;
            try {
                if (temptable != undefined) {
                    temptable.destroy();
                }
                temptable = $("#mysubcategory").dataTable({
                    "bPaginate": false
                });
            } catch (e) {

            }
            // $('#mysubcategory').dataTable({
            //     // "bPaginate":false
            // });
        } else {
            document.getElementById("tableforsubcategory").innerHTML = "<span class='spinner-border'></span>";
        }
    };
    xml.open("GET", "subcategoryaction.php", true);
    xml.send();
}

function filtersubcategory(categoryname) {
    // alert(categoryname);
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var ar = JSON.parse(this.response);
            // alert(ar);
            // console.log(ar);
            var tab = "";
            var srno = 1;
            for (var x in ar) {
                obj = ar[x];
                tab += "<tr>";
                tab += "<td>" + srno + "</td>";
                tab += "<td>" + obj.subcategoryname + "</td>";
                tab += "<td>" + obj.description + "</td>";
                tab += "<td>" + obj.category + "</td>";
                tab += "<td><i onclick='deletesubcategory(\"" + obj.subcategoryid + "\")'" + " class='fa fa-trash text-danger' style='cursor: pointer;'></i></td>";
                tab += "<td><i onclick='editsubcategory(" + JSON.stringify(obj) + ")'" + " class='fa fa-edit text-warning' style='cursor: pointer;'></i></td>";
                tab += "</tr>";
                srno++;
            }

            // tab +="</tbody>";
            // tab +="</table>";
            document.getElementById("tableforsubcategory").innerHTML = tab;
            try {
                if (temptable != undefined) {
                    temptable.destroy();
                }
                temptable = $("#mysubcategory").dataTable({
                    "bPaginate": false
                });
            } catch (e) {

            }
            // $('#mysubcategory').dataTable({
                // "bPaginate":false
            // });
        } else {
            document.getElementById("tableforsubcategory").innerHTML = "<span class='spinner-border'></span>";
        }
    };
    xml.open("GET", "subcategoryaction.php?cat="+categoryname, true);
    xml.send();
}

function editsubcategory(obj) {
    $("#myModalforsubcategory").modal("show");
    document.getElementById("editsubcategoryid").value = obj.subcategoryid;
    document.getElementById("editsubcategoryname").value = obj.subcategoryname;
    document.getElementById("editsubcategorydescription").value = obj.description;
    document.getElementById("editcategory").value = obj.category;
}

function update_subcategory() {
    if ($("#updateform").valid()) {
        var controls = document.getElementById("updateform").elements;
        var formdata = new FormData();
        for (var i = 0; i < controls.length; i++) {
            if (controls[i].type == "file") {
                formdata.append(controls[i].name, controls[i].files[0]);
            } else {
                formdata.append(controls[i].name, controls[i].value);
            }
        }
        var xml = new XMLHttpRequest();
        xml.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                viewsubcategory();
                $("#myModalforsubcategory").modal('hide');
            }
        };
        xml.open("POST", "subcategoryaction.php", true);
        xml.send(formdata);
    }
}

function deletesubcategory(subcatid) {
    var cc = confirm("Are you sure to delete ?");
    if (cc) {
        var httpreg = new XMLHttpRequest();
        httpreg.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == 4) {
                viewsubcategory();
            }
        };
        httpreg.open("GET", "subcategoryaction.php?q=" + subcatid, true);
        httpreg.send();
    }
}


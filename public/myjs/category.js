var temptable;

function add_category() {
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
                    result = "<span class='display-4 text-danger'>Category Already Exists.</span>"
                } else if (output == 1) {
                    result = "<span class='display-4 text-success'>Category Added Successfully</span>"
                } else {
                    result = "<span class='display-4 text-success'>Try Again Later</span>"
                }
                document.getElementById("output").innerHTML = result;
                document.getElementById("addform").reset();
                viewcategory();
            }
        };
        xml.open("POST", "categoryaction.php", true);
        xml.send(formdata);
    }
}

function viewcategory() {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var ar = JSON.parse(this.response);
            console.log(ar);
            var tab = "";
            var srno = 1;
            for (var x in ar) {
                obj = ar[x];
                tab += "<tr>";
                tab += "<td>" + srno + "</td>";
                tab += "<td>" + obj.categoryname + "</td>";
                tab += "<td>" + obj.categorydescription + "</td>";
                tab += "<td>" + obj.supercategory + "</td>";
                tab += "<td><i onclick='deletecategory(\"" + obj.categoryname + "\")'" + "class='fa fa-trash text-danger' style='cursor: pointer;'></i></td>";
                tab += "<td><i onclick='editcategory(" + JSON.stringify(obj) + ")'" + "class='fa fa-edit text-warning' style='cursor: pointer;'></i></td>";
                tab += "</tr>";
                srno++;
            }

            document.getElementById("tableforcategory").innerHTML = tab;
            try {
                if (temptable != undefined) {
                    temptable.destroy();
                }
                temptable = $("#mycategory").dataTable({
                    "bPaginate": false
                });
            } catch (e) {

            }
        } else {
            document.getElementById("tableforcategory").innerHTML = "<span class='spinner-border'></span>";
        }
    };
    xml.open("GET", "categoryaction.php", true);
    xml.send();
}

function filtercategory(type) {
    // alert(type);
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var ar = JSON.parse(this.response);
            console.log(ar);
            var tab = "";
            var srno = 1;
            for (var x in ar) {
                obj = ar[x];
                tab += "<tr>";
                tab += "<td>" + srno + "</td>";
                tab += "<td>" + obj.categoryname + "</td>";
                tab += "<td>" + obj.categorydescription + "</td>";
                tab += "<td>" + obj.supercategory + "</td>";
                tab += "<td><i onclick='deletecategory(\"" + obj.categoryname + "\")'" + "class='fa fa-trash text-danger' style='cursor: pointer;'></i></td>";
                tab += "<td><i onclick='editcategory(" + JSON.stringify(obj) + ")'" + "class='fa fa-edit text-warning' style='cursor: pointer;'></i></td>";
                tab += "</tr>";
                srno++;
            }

            document.getElementById("tableforcategory").innerHTML = tab;
            try {
                if (temptable != undefined) {
                    temptable.destroy();
                }
                temptable = $("#mycategory").dataTable({
                    "bPaginate": false
                });
            } catch (e) {

            }
        } else {
            document.getElementById("tableforcategory").innerHTML = "<span class='spinner-border'></span>";
        }
    };
    xml.open("GET", "categoryaction.php?type="+type, true);
    xml.send();
}

function editcategory(obj) {
    $("#myModalforcategory").modal("show");
    document.getElementById("editcategoryname").value = obj.categoryname;
    document.getElementById("editcategorydescription").value = obj.categorydescription;
    document.getElementById("type").value = obj.supercategory;
}

function update_category() {
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
                viewcategory();
                $("#myModalforcategory").modal('hide');
            }
        };
        xml.open("POST", "categoryaction.php", true);
        xml.send(formdata);
    }
}

function deletecategory(catname) {
    var cc = confirm("Are you sure to delete ?");
    if (cc) {
        var httpreg = new XMLHttpRequest();
        httpreg.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == 4) {
                viewcategory();
            }
        };
        httpreg.open("GET", "categoryaction.php?q=" + catname, true);
        httpreg.send();
    }
}


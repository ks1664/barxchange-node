var temptable;
function add_staff() {
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
                    result = "<span class='display-4 text-danger'>Staff Already Exists.</span>"
                } else if (output == 1) {
                    result = "<span class='display-4 text-success'>Staff Added Successfully</span>"
                } else {
                    result = "<span class='display-4 text-success'>Try Again Later</span>"
                }
                document.getElementById("output").innerHTML = result;
                document.getElementById("addform").reset();
                viewstaff();
            }
        };
        xml.open("POST", "staffaction.php", true);
        xml.send(formdata);
    }
}

function viewstaff() {
    // alert();
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var ar = JSON.parse(this.response);
            // alert(ar);
            console.log(ar);
            var tab = "";
            var srno = 1;
            for (var x in ar) {
                obj = ar[x];
                tab += "<tr>";
                tab += "<td>" + srno + "</td>";
                tab += "<td>" + obj.staffname + "</td>";
                tab += "<td>" + obj.mobile + "</td>";
                tab += "<td>" + obj.status + "</td>";
                tab += "<td><i onclick='editstaff(" + JSON.stringify(obj) + ")'" + "class='fa fa-edit text-warning' style='cursor: pointer;'></i></td>";
                tab += "</tr>";
                srno++;
            }
            document.getElementById("tableforstaff").innerHTML = tab;
            try {
                if (temptable != undefined) {
                    temptable.destroy();
                }
                temptable = $("#mystaff").dataTable({
                    "bPaginate": false
                });
            } catch (e) {

            }
        } else {
            document.getElementById("tableforstaff").innerHTML = "<span class='spinner-border'></span>";
        }
    };
    xml.open("GET", "staffaction.php", true);
    xml.send();
}

function editstaff(obj) {
    $("#myModalforstaff").modal("show");
    document.getElementById("editstaffname").value = obj.staffname;
    document.getElementById("editmobile").value = obj.mobile;
    document.getElementById("status").value = obj.status;
}

function update_staff() {
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
                viewstaff();
                $("#myModalforstaff").modal('hide');
            }
        };
        xml.open("POST", "staffaction.php", true);
        xml.send(formdata);
    }
}

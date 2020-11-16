var temptable;

function add_product() {
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
                // if (output == 0) {
                //     result = "<span class='display-4 text-danger'>Product Already Exists.</span>"
                // } else if (output == 1) {
                //     result = "<span class='display-4 text-success'>Product Added Successfully</span>"
                // } else {
                //     result = "<span class='display-4 text-success'>Try Again Later</span>"
                // }
                document.getElementById("output").innerHTML = output;
                document.getElementById("addform").reset();
                document.getElementById("showimg").innerHTML = "";

                viewproduct();
            }
        };
        xml.open("POST", "productaction.php", true);
        xml.send(formdata);
    }
}

function savephoto() {
    if ($("#addphoto").valid()) {
        var controls = document.getElementById("addphoto").elements;
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
                // if (output == 0) {
                //     result = "<span class='display-4 text-danger'>Product Already Exists.</span>"
                // } else if (output == 1) {
                //     result = "<span class='display-4 text-success'>Product Added Successfully</span>"
                // } else {
                //     result = "<span class='display-4 text-success'>Try Again Later</span>"
                // }
                document.getElementById("output").innerHTML = output;
                document.getElementById("addphoto").reset();
                document.getElementById("showimg").innerHTML = "";
                $("#myModalforphoto").modal('hide');
                viewproduct();
            }
        };
        xml.open("POST", "productaction.php", true);
        xml.send(formdata);
    }
}

function viewproduct() {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // alert("122");
            var ar = JSON.parse(this.response);
            // console.log(ar);
            // alert(ar);
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
                tab += "<td>" + obj.productname + "</td>";
                tab += "<td>" + obj.price + "</td>";
                tab += "<td>" + obj.stock + "</td>";
                tab += "<td>" + obj.discount + "</td>";
                tab += "<td><img style='height: 200px;width: 200px' src='" + obj.photo + "' alt=''><span style=\"cursor: pointer;color: #327dff;font-weight: bold;\" title='" + obj.description + "'>View&nbsp;Description</span>\n</td>";
                tab += "<td>" + obj.subcategoryname + "</td>";
                tab += "<td>" + obj.category + "</td>";
                tab += "<td><i onclick='deleteproduct(\"" + obj.productid + "\")'" + " class='fa fa-trash text-danger' style='cursor: pointer;'></i></td>";
                tab += "<td><i onclick='editproduct(" + JSON.stringify(obj) + ")'" + " class='fa fa-edit text-warning' style='cursor: pointer;'></i></td>";
                tab += "<td><i onclick='addphoto(\"" + obj.productid + "\")'" + " class='fa fa-plus text-danger' aria-hidden='true' style='cursor: pointer;'></i></td>";
                tab += "<td><i onclick='viewproductphoto(\"" + obj.productid + "\")'" + " class='fa fa-photo text-danger' style='cursor: pointer;'></i></td>";
                tab += "</tr>";
                srno++;
            }
            // tab +="</tbody>";
            // tab +="</table>";
            document.getElementById("tableforproduct").innerHTML = tab;
            try {
                if (temptable != undefined) {
                    temptable.destroy();
                }
                temptable = $("#myproduct").dataTable({
                    // "bPaginate": false
                });
            } catch (e) {
            }
        } else {
            document.getElementById("tableforproduct").innerHTML = "<span class='spinner-border'></span>";
        }
    };
    xml.open("GET", "productaction.php", true);
    xml.send();
}


function viewproductphoto(productid) {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var ar = JSON.parse(this.response);
            // console.log(ar);
            // alert(ar);
            var tab = "";
            var srno = 1;
            for (var x in ar) {
                obj = ar[x];
                tab += "<tr>";
                tab += "<td>" + srno + "</td>";
                tab += "<td>" + obj.productname + "</td>";
                tab += "<td><img style='height: 200px;width: 250px' src='" + obj.photo + "' alt=''><span style=\"cursor: pointer;color: #327dff;font-weight: bold;\" title='" + obj.caption + "'>View&nbsp;Description</span>\n</td>";
                tab += "<td><i onclick='deleteproductphoto(\"" + obj.id + "\")'" + " class='fa fa-trash text-danger' style='cursor: pointer;'></i></td>";
                tab += "</tr>";
                srno++;
            }
            // tab +="</tbody>";
            // tab +="</table>";
            document.getElementById("tableforphoto").innerHTML = tab;
            $("#myModalforphototable").modal("show");
            try {
                if (temptable != undefined) {
                    temptable.destroy();
                }
                temptable = $("#myproductphoto").dataTable({
                    // "bPaginate": false
                });
            } catch (e) {
            }
        } else {
            document.getElementById("tableforphoto").innerHTML = "<span class='spinner-border'></span>";
        }
    };
    xml.open("GET", "productaction.php?pp=" + productid, true);
    xml.send();
}

function editproduct(obj) {
    // console.log(obj);
    $("#myModalforproduct").modal("show");
    document.getElementById("editproductid").value = obj.productid;
    document.getElementById("editproductname").value = obj.productname;
    document.getElementById("editprice").value = obj.price;
    document.getElementById("editstock").value = obj.stock;
    document.getElementById("editdiscount").value = obj.discount;
    document.getElementById("editphotoimg").src = obj.photo;
    document.getElementById("editdescription").value = obj.description;
    document.getElementById("editsubcategoryid").value = obj.subcategoryid;
    document.getElementById("editsubcategoryname").value = obj.subcategoryname;
    document.getElementById("editcategory").value = obj.category;
}

function addphoto(productid) {
    // console.log(productid);
    $("#myModalforphoto").modal("show");
    document.getElementById("pid").value = productid;
}

function update_product() {
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
                viewproduct();
                alert(this.response);
                $("#myModalforproduct").modal('hide');
            }
        };
        xml.open("POST", "productaction.php", true);
        xml.send(formdata);
    }
}

function deleteproduct(productid) {
    var cc = confirm("Are you sure to delete ?");
    if (cc) {
        var httpreg = new XMLHttpRequest();
        httpreg.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == 4) {
                alert(this.responseText);
                $("#myModalforproduct").modal('hide');
                viewproduct();

            }
        };
        httpreg.open("GET", "productaction.php?q=" + productid, true);
        httpreg.send();
    }
}

function deleteproductphoto(id) {
    var cc = confirm("Are you sure to delete photo ?");
    if (cc) {
        var httpreg = new XMLHttpRequest();
        httpreg.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == 4) {
                alert(this.responseText);
                $("#myModalforphototable").modal('hide');
                viewproduct();
            }
        };
        httpreg.open("GET", "productaction.php?ppp=" + id, true);
        httpreg.send();
    }
}

function showsubcat(str) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var output = JSON.parse(this.response);
            var tab = "";
            tab += "<select name='subcategory' class='input-field' id=''><option value=''>Select Sub Category</option>";

            // alert(output);
            for (var x in output) {
                var obj = output[x];
                // alert(obj);
                tab += "<option value='" + obj.subcategoryid + "'>" + obj.subcategoryname + "</option>";
            }
            tab += "</select>";
            document.getElementById("subcategory").innerHTML = tab;
        }
    };
    xmlhttp.open("GET", "productaction.php?category=" + str, true);
    xmlhttp.send();
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
            tab += "<option value=''>Select Sub Category</option>";
            for (var x in ar) {
                obj = ar[x];
                tab += "<option value='" + obj.subcategoryid + "'>" + obj.subcategoryname + "</option>";
            }
            document.getElementById("subcategoryname").innerHTML = tab;
        } else {
            document.getElementById("subcategoryname").innerHTML = "<span class='spinner-border'></span>";
        }
    };
    xml.open("GET", "productaction.php?cat=" + categoryname, true);
    xml.send();
}

function filtersubcategoryl(categoryname) {
    // alert(categoryname);
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var ar = JSON.parse(this.response);
            // alert(ar);
            // console.log(ar);
            var tab = "";
            tab += "<option value=''>Select Sub Category</option>";
            for (var x in ar) {
                obj = ar[x];
                tab += "<option value='" + obj.subcategoryid + "'>" + obj.subcategoryname + "</option>";
            }
            document.getElementById("subcategorynamel").innerHTML = tab;
        } else {
            document.getElementById("subcategorynamel").innerHTML = "<span class='spinner-border'></span>";
        }
    };
    xml.open("GET", "productaction.php?cat=" + categoryname, true);
    xml.send();
}

function filterproduct(subcatid) {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // alert("122");
            var ar = JSON.parse(this.response);
            // console.log(ar);
            // alert(ar);
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
                tab += "<td>" + obj.productname + "</td>";
                tab += "<td>" + obj.price + "</td>";
                tab += "<td>" + obj.stock + "</td>";
                tab += "<td>" + obj.discount + "</td>";
                tab += "<td><img style='height: 200px;width: 200px' src='" + obj.photo + "' alt=''><span style=\"cursor: pointer;color: #327dff;font-weight: bold;\" title='" + obj.description + "'>View&nbsp;Description</span>\n</td>";
                tab += "<td>" + obj.subcategoryname + "</td>";
                tab += "<td>" + obj.category + "</td>";
                tab += "<td><i onclick='deleteproduct(\"" + obj.productid + "\")'" + " class='fa fa-trash text-danger' style='cursor: pointer;'></i></td>";
                tab += "<td><i onclick='editproduct(" + JSON.stringify(obj) + ")'" + " class='fa fa-edit text-warning' style='cursor: pointer;'></i></td>";
                tab += "<td><i onclick='addphoto(\"" + obj.productid + "\")'" + " class='fa fa-plus text-danger' aria-hidden='true' style='cursor: pointer;'></i></td>";
                tab += "<td><i onclick='viewproductphoto(\"" + obj.productid + "\")'" + " class='fa fa-photo text-danger' style='cursor: pointer;'></i></td>";
                tab += "</tr>";
                srno++;
            }
            // tab +="</tbody>";
            // tab +="</table>";
            document.getElementById("tableforproduct").innerHTML = tab;
            try {
                if (temptable != undefined) {
                    temptable.destroy();
                }
                temptable = $("#myproduct").dataTable({
                    // "bPaginate": false
                });
            } catch (e) {
            }
        } else {
            document.getElementById("tableforproduct").innerHTML = "<span class='spinner-border'></span>";
        }
    };
    xml.open("GET", "productaction.php?subcat=" + subcatid, true);
    xml.send();
}

function filtermenu(subcatid) {
    // alert();
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var ar = JSON.parse(this.response);
            // console.log(ar);
            // alert(ar);
            var tab = "";
            var srno = 1;
            for (var x in ar) {
                obj = ar[x];
                tab += "<div class='col-lg-4 themenu_column'>";
                tab += "<div class='themenu_col trans_400'>";
                tab += "<div class='' style='font-size: 20px'>" + obj.category + "</div>";
                tab += "<div class='themenu_title' style='font-size: 25px'>" + obj.subcategoryname + "</div>";
                tab += "<div class='dish_list'><div class='dish'><div class='dish_title_container d-flex flex-xl-row flex-column align-items-start justify-content-start'><div class='dish_title'>" + obj.productname + "&nbsp;&nbsp;<img style='height: 55px;width: 55px' src='" + obj.photo + "' alt=''></div><div class='dish_price'>&#8377;";
                if ((obj.discount != 0) && (obj.discount > 0)) {
                    var discountedPrice = obj.price - (obj.price * obj.discount / 100);
                    tab += discountedPrice;
                } else {
                    tab += obj.price;
                }
                tab += "</div></div> <div class='dish_contents'>" + obj.description + "</div><div class='dish_order'><a onclick='addToCart(obj.productid,1)'>Order Now</a></div></div></div>";
                tab += "</div>";
                tab += "</div>";
                srno++;
            }
            document.getElementById("menuproduct").innerHTML = tab;
        } else {
            document.getElementById("menuproduct").innerHTML = "<span class='spinner-border'></span>";
        }
    };
    xml.open("GET", "productaction.php?subcat=" + subcatid, true);
    xml.send();
}

function filtermenul(subcatid) {
    // alert();
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var ar = JSON.parse(this.response);
            // console.log(ar);
            // alert(ar);
            var tab = "";
            var srno = 1;
            for (var x in ar) {
                obj = ar[x];
                tab += "<div class='col-lg-4 themenu_column'>";
                tab += "<div class='themenu_col trans_400'>";
                tab += "<div class='' style='font-size: 20px'>" + obj.category + "</div>";
                tab += "<div class='themenu_title' style='font-size: 25px'>" + obj.subcategoryname + "</div>";
                tab += "<div class='dish_list'><div class='dish'><div class='dish_title_container d-flex flex-xl-row flex-column align-items-start justify-content-start'><div class='dish_title'>" + obj.productname + "&nbsp;&nbsp;<img style='height: 55px;width: 55px' src='" + obj.photo + "' alt=''></div><div class='dish_price'>&#8377;";
                if ((obj.discount != 0) && (obj.discount > 0)) {
                    var discountedPrice = obj.price - (obj.price * obj.discount / 100);
                    tab += discountedPrice;
                } else {
                    tab += obj.price;
                }
                tab += "</div></div> <div class='dish_contents'>" + obj.description + "</div><div class='dish_order'><a onclick='addToCart(obj.productid,1)'>Order Now</a></div></div></div>";
                tab += "</div>";
                tab += "</div>";
                srno++;
            }
            document.getElementById("menuproductl").innerHTML = tab;
        } else {
            document.getElementById("menuproductl").innerHTML = "<span class='spinner-border'></span>";
        }
    };
    xml.open("GET", "productaction.php?subcat=" + subcatid, true);
    xml.send();
}

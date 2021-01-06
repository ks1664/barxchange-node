var express = require('express');
const Session = require('express-session')
var router = express.Router();
var conn = require('../connection')
const save_file_on_server = require('../uploadfile')
const nodemailer = require('nodemailer');
// import waterfall from 'async/waterfall';
/* GET users listing. */
router.get('/index', function (req, res, next) {
    res.send('respond with a resource');
});

router.get("/stafflogin", (req, res) => {
    // console.log('hello')
    res.render("staff/staff_login.ejs")
})

router.get("/staffhome", (req, res) => {
    res.render("staff/staff_home.ejs")
})

router.get("/menu", (req, res) => {
    res.render("staff/menu.ejs")
})

router.get("/staff_changepassword", (req, res) => {
    res.render("staff/staff_changepassword.ejs")
})

router.get("/kitchenorder", (req, res) => {
    res.render("staff/kitchenorder.ejs")
})

router.get("/stafflogout", (req, res) => {
    Session.staff = "";
    // console.log(Session.staff);
    res.render("staff/staff_login.ejs")
})

router.get('/viewcart', function (req, res) {
    if (Session.cart != null) {
        res.render("staff/viewcart.ejs")
    } else {
        res.render("staff/menu.ejs")
    }
})

router.get('/thanks', function (req, res) {
    res.render("staff/thanks.ejs")
})

router.get('/myorder', function (req, res) {
    res.render("staff/myorder.ejs")
})

router.get('/cashierorder', function (req, res) {
    res.render("staff/cashierorder.ejs")
})

router.post("/staffaction", (req, res) => {
        let action = req.body.action;
        let Query = '';
        if (action == "login") {
            let username = req.body.username;
            let password = req.body.password;
            //`username`, `email`, `password`, `type`
            Query = "select * from staff where staffname='" + username + "' and password='" + password + "' and status='Activated'";
            conn.query(Query, function (err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    let staffdata = rows;
                    Session.staff = username;
                    Session.type = staffdata[0]["type"];
                    // console.log(Session.type);
                    res.send("0");
                } else {
                    res.send("1");
                }
            })
        } else if (action == "changepassword") {
            let username = Session.staff;
            let oldpassword = req.body.oldpassword;
            let newpassword = req.body.newpassword;
            let newconpassword = req.body.newconpassword;
            Query = "select * from staff where staffname='" + username + "' and password='" + oldpassword + "'";
            conn.query(Query, function (err, rows) {
                if (err) throw err;
                if (rows.length <= 0) {
                    res.send(username + " Old Password does not match");
                } else {
                    Query = "UPDATE `staff` SET `password`='" + newpassword + "' WHERE `staffname`='" + Session.staff + "'";
                    conn.query(Query, function (err) {
                        if (err) throw  err;
                        res.send(Session.staff + " Your Password Changed Successfully");
                    })
                }
            })

        } else if (action == "myorder") {
            let staff = Session.staff
            let cdate = new Date();
            let currentDateTime = cdate.getFullYear() + '-' + cdate.getMonth() + '-' + cdate.getDate();
            Query = "SELECT * FROM `order` where date(datetime)='" + currentDateTime + "' and staffname='" + staff + "'";
            console.log(currentDateTime);
            console.log(Query);
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                // console.log(rows);
                res.send(rows);
            })

        } else if (action == "myorderdetail") {
            let orderid = req.body.orderid;
            Query = "SELECT * FROM `orderdetail` INNER JOIN `order` on orderdetail.orderid = `order`.orderid INNER JOIN product ON orderdetail.productid=product.productid where orderdetail.orderid='" + orderid + "'";
            console.log(Query);
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                // console.log(rows);
                res.send(rows);
            })

        } else if (action == "checksession") {
            if (Session.staff != "" && Session.staff != null) {
                let staff = {"name": Session.staff, "type": Session.type};
                res.send(staff);
            } else {
                let empty = {"name": ""}
                res.send(empty);
            }
        }
    }
)

router.post("/menuaction", (req, res) => {
        let action = req.body.action;
        let Query = '';
        if (action == "categoryview") {
            Query = "select * from category";
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                res.send(rows);
            })

        } else if (action == "subcategoryview") {
            let category = req.body.category;
            if (category != "") {
                Query = "select * from subcategory inner join category on category.categoryname=subcategory.category where subcategory.category='" + category + "'";
            } else {
                Query = "select * from subcategory inner join category on category.categoryname=subcategory.category";
            }
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                res.send(rows);
            })

        } else if (action == "menuview") {
            let subcatid = req.body.subcatid;
            if (subcatid != "") {
                Query = "select * from product inner join subcategory on subcategory.subcategoryid=product.subcatid inner join category on category.categoryname=subcategory.category where product.subcatid='" + subcatid + "'";
            } else {
                Query = "select * from product inner join subcategory on subcategory.subcategoryid=product.subcatid inner join category on category.categoryname=subcategory.category";
            }
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                res.send(rows);
            })

        }
    }
)


router.post("/addtoCart", (req, res) => {
        let qty, sqldata, flag;
        let cart = [];
        let action = req.body.action;
        if (action == "addtocart") {
            let productid = req.body.productid;
            let qtyval = req.body.qty;
            if (qtyval == 'index') {
                qty = 1;
            } else {
                qty = qtyval;
            }
            Query = "select * from product where productid='" + productid + "'";
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                // console.log("1------>" + err);
                sqldata = rows;
                // console.log("---->", sqldata);
                if (Session.cart != null) {
                    cart = Session.cart;
                    flag = 0;
                    // console.log("Reach1");
                    for (var i = 0; i <= cart.length - 1; i++) {
                        // console.log("Reach");
                        // console.log(productid);
                        // console.log(cart[i]["productid"]);
                        if (productid == cart[i].productid) {
                            if (qty == 'index') {
                                cart[i]["qty"] += 1;
                            } else {
                                cart[i]["qty"] = qty;
                            }
                            flag = 1;
                            break;
                        }
                    }
                    if (flag == 0) {
                        // console.log("Reach 2");
                        cart[cart.length] = {
                            'productid': sqldata[0]['productid'],
                            'productname': sqldata[0]['productname'],
                            'price': sqldata[0]['price'],
                            'discount': sqldata[0]['discount'],
                            'stock': sqldata[0]['stock'],
                            'photo': sqldata[0]['photo'],
                            'qty': qty,
                            'subcatid': sqldata[0]['subcatid']
                        };
                    }
                    Session.cart = cart;
                    // console.log(cart);
                } else {
                    // console.log("Reach 3 .1" + sqldata);
                    // console.log("Reach 3.2" + sqldata[0]['productid']);
                    cart[0] = {
                        'productid': sqldata[0]['productid'],
                        'productname': sqldata[0]['productname'],
                        'price': sqldata[0]['price'],
                        'discount': sqldata[0]['discount'],
                        'stock': sqldata[0]['stock'],
                        'photo': sqldata[0]['photo'],
                        'qty': qty,
                        'subcatid': sqldata[0]['subcatid']
                    };
                    Session.cart = cart;
                    // console.log(Session.cart);
                }
                res.send("" + cart.length);
            })


        } else if (action == "checkcart") {
            if (Session.cart != "" && Session.cart != null) {
                res.send("" + Session.cart.length);
            } else {
                res.send('cart_empty');
            }
        } else if (action == 'cartview') {
            let cart = [];
            if (Session.cart != undefined) {
                cart = Session.cart;
            }
            let obj = {cart: cart}
            res.send(cart)

        } else if (action == 'removecart') {
            let tempcart = [];
            let cart = Session.cart;
            let productid = req.body.productid;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].productid != productid) {
                    tempcart.push(cart[i]);
                }
            }
            Session.cart = tempcart;
            res.send("" + cart.length);
        } else if (action == "changeqty") {
            let qty = req.body.qty;
            let productid = req.body.productid;
            let cart = [];
            if (Session.cart != undefined) {
                cart = Session.cart;
                let flag = 0;
                let grandtotal = 0;
                let netprice = 0;
                // let netpricetotal = 0;
                for (var i = 0; i <= cart.length - 1; i++) {
                    if (productid == cart[i].productid) {
                        cart[i].qty = qty;
                        let discountedprice = Math.round(cart[i].price - ((cart[i].price * cart[i].discount) / 100), 2);
                        netprice = discountedprice * cart[i].qty;
                        flag = 1;
                        break;
                    }
                }
                for (var j = 0; j <= cart.length - 1; j++) {
                    let discounedpricetotal = Math.round(cart[j].price - ((cart[j].price * cart[j].discount) / 100), 2);
                    // console.log(discounedpricetotal);
                    let netpricetotal = discounedpricetotal * cart[j].qty;
                    // console.log(netpricetotal);
                    grandtotal += netpricetotal;
                    // console.log(grandtotal);
                }
                let newar = {"qty": qty, "netprice": Math.round(netprice, 2), "grandtotal": Math.round(grandtotal, 2)};
                // console.log(JSON.stringify(newar));
                res.send(JSON.stringify(newar));
            }
        }
    }
)

router.post("/checkout", (req, res) => {
    // let action = req.body.action;
    if (Session.staff != undefined && Session.cart != undefined) {

        let mobile = req.body.mobile;
        let grandtotal = req.body.grandtotal;
        let paymentmode = req.body.paymentmode;
        let staff = Session.staff;
        let cart = [];
        var date = new Date();
        // var currentdatetime = date.toLocaleDateString();
        cart = Session.cart;

        let cdate = new Date();
        let currentdatetime = cdate.getFullYear() + '-' + cdate.getMonth() + '-' + cdate.getDate() + ':' + cdate.getHours() + ':' + cdate.getSeconds();
        for (var j = 0; j <= cart.length - 1; j++) {
            let discounedpricetotal = Math.round(cart[j].price - ((cart[j].price * cart[j].discount) / 100), 2);
            let netpricetotal = discounedpricetotal * cart[j].qty;
            // grandtotal += netpricetotal;
        }
        let Query = "";
        if (paymentmode == "Cash") {
            Query = "INSERT INTO `order`(`orderid`, `amount`, `datetime`, `status`, `paymentmode`, `mobile`, `staffname`) VALUES (null ,'" + grandtotal + "','" + currentdatetime + "','pending','" + paymentmode + "','" + mobile + "','" + staff + "')";
        } else {
            Query = "INSERT INTO `order`(`orderid`, `amount`, `datetime`, `status`, `paymentmode`, `mobile`, `staffname`) VALUES (null ,'" + grandtotal + "','" + currentdatetime + "','paid','" + paymentmode + "','" + mobile + "','" + staff + "')";
        }
        conn.query(Query, function (err, result, fields) {
                if (err) throw  err;
                console.log("1 record inserted, ID: " + result.insertId);
                let insertedid = result.insertId;
                console.log(cart.length)
                for (var j = 0; j < cart.length; j++) {
                    let discounedpricetotal = Math.round(cart[j].price - ((cart[j].price * cart[j].discount) / 100), 2);
                    let netpricetotal = discounedpricetotal * cart[j].qty;
                    var sql = "INSERT INTO `orderdetail`(`orderdetailid`, `price`, `qty`, `discount`, `netprice`, `status`, `orderid`, `productid`) VALUES" +
                        " (null,'" + cart[j].price + "','" + cart[j].qty + "','" + cart[j].discount + "','" + netpricetotal + "','pending','" + insertedid + "','" + cart[j].productid + "')";
                    conn.query(sql, function (err) {

                    })

                }
                Session.cart = null;
                res.send("Order No." + insertedid + " Punched Successfully");
            }
        )
    }
})

router.post("/kitchenaction", (req, res) => {
        let action = req.body.action;
        let Query = '';
        if (action === "myorder") {
            let staff = Session.staff
            let cdate = new Date();
            let currentDateTime = cdate.getFullYear() + '-' + cdate.getMonth() + '-' + cdate.getDate();
            // Query = "SELECT distinct order.orderid FROM `order` INNER JOIN orderdetail ON order.orderid=orderdetail.orderid WHERE order.status !='completed' AND DATE(order.datetime)='" + currentDateTime + "' and orderdetail.status!='delivered' group BY orderdetail.orderid";
            Query = "select * from `order` where orderid in (SELECT distinct order.orderid FROM `order` INNER JOIN orderdetail ON order.orderid=orderdetail.orderid WHERE order.status !='completed' AND DATE(order.datetime)='" + currentDateTime + "' and orderdetail.status!='delivered')";
            // console.log(Query);
            let count = 0;
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                let order = rows;
                let data = []
                // console.log(order.length + ' length')
                for (let i = 0; i < order.length; i++) {
                    let orderdata = order[i];
                    Query = "select * from orderdetail inner join product on product.productid=orderdetail.productid where orderdetail.orderid='" + order[i].orderid + "'";
                    // console.log(Query);

                    conn.query(Query, function (err, rows) {
                        if (err) throw  err;
                        data.push({order: orderdata, orderdetail: rows});
                        count++;
                        // console.log(count)

                        if (count == order.length) {
                            // console.log("match");
                            // console.log(data);
                            res.send(data);
                        }
                    })
                }
            })

            // res.send(rows);

        } else {
            let orderid = req.body.orderid;
            let typeid = req.body.typeid;
            if (typeid == "orderdetail") {

                Query = "select * from orderdetail where orderdetailid='" + orderid + "'";
                console.log(Query);
                conn.query(Query, function (err, rows) {
                    if (err) throw  err;
                    let orderdata = rows;
                    console.log("---->>>>" + orderdata);
                    console.log("---->>>>" + orderdata['status']);
                    console.log("---->>>>" + orderdata.status);
                    if (orderdata[0].status == "cooked") {
                        Query = "UPDATE `orderdetail` SET `status`='delivered' WHERE `orderdetailid`='" + orderid + "'";
                        console.log(Query);
                        conn.query(Query, function (err) {
                            console.log("error --> " + err);
                        })
                    } else if (orderdata[0].status == "pending") {
                        Query = "UPDATE `orderdetail` SET `status`='cooked' WHERE `orderdetailid`='" + orderid + "'";
                        console.log(Query);
                        conn.query(Query, function (err) {
                            console.log("error --> " + err);
                        })
                    } else {
                        console.log("No idea");
                    }
                })
            } else {
                Query = "UPDATE `orderdetail` SET `status`='delivered' WHERE `orderid`='" + orderid + "'";
                console.log(Query);
                conn.query(Query, function (err) {
                    console.log("error --> " + err);
                })
            }
            res.send("Status Updated Successfully");

        }
    }
)


router.post("/cashieraction", (req, res) => {
        let action = req.body.action;
        let Query = '';
        if (action == "changestatus") {
            let orderid = req.body.orderid;
            Query = "UPDATE `order` SET `status`='paid' WHERE `orderid`='" + orderid + "'";
            conn.query(Query, function (err) {
                if (err) throw  err;
                res.send(Session.staff + " Payment Recieved Successfully for Order no. " + orderid);
            })

        } else if (action == "myorder") {
            let staff = Session.staff
            let cdate = new Date();
            let currentDateTime = cdate.getFullYear() + '-' + cdate.getMonth() + '-' + cdate.getDate();
            Query = "SELECT `order`.* FROM `order` INNER JOIN orderdetail ON order.orderid=orderdetail.orderid WHERE orderdetail.status ='delivered' group BY orderdetail.orderid order by(orderid) DESC";
            // Query = "SELECT `order`.* FROM `order` INNER JOIN orderdetail ON order.orderid=orderdetail.orderid WHERE order.status ='pending' and orderdetail.status ='delivered' group BY orderdetail.orderid";
            // console.log(currentDateTime);
            // console.log(Query);
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                // console.log(rows);
                res.send(rows);
            })

        } else if (action == "myorderdetail") {
            let orderid = req.body.orderid;
            Query = "SELECT * FROM `orderdetail` INNER JOIN product ON orderdetail.productid=product.productid where orderdetail.orderid='" + orderid + "'";
            console.log(Query);
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                // console.log(rows);
                res.send(rows);
            })

        }
    }
)


module.exports = router;

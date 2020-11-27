var express = require('express');
const Session = require('express-session')
var router = express.Router();
var conn = require('../connection')
const save_file_on_server = require('../uploadfile')
const nodemailer = require('nodemailer');
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

router.get("/stafflogout", (req, res) => {
    Session.staff = "";
    // console.log(Session.staff);
    res.render("staff/staff_login.ejs")
})

router.get('/viewcart', function (req, res) {
    res.render("staff/viewcart.ejs")
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

        } else if (action == "checksession") {
            if (Session.staff != "" && Session.staff != null) {
                res.send(Session.staff);
            } else {
                res.send('session_empty');
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
    }
})


module.exports = router;

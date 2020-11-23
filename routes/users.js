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
    console.log(Session.staff);
    res.render("staff/staff_login.ejs")
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
                    Session.staff = username;
                    Session.type = rows.type;
                    console.log(rows.type);
                    console.log(Session.type);
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

module.exports = router;

const express = require('express')
const Session = require('express-session')
const router = express.Router()
var conn = require('../connection')
const save_file_on_server = require('../uploadfile')
const nodemailer = require('nodemailer');

router.get("/adminlogin", (req, res) => {
    res.render("admin/adminlogin.ejs")
})

router.get("/adminlogout", (req, res) => {
    Session.admin = "";
    console.log(Session.admin);
    res.render("admin/adminlogin.ejs")
})

router.get("/adminhome", (req, res) => {
    res.render("admin/adminhome.ejs")
})

router.get("/admin_changepassword", (req, res) => {
    res.render("admin/admin_changepassword.ejs")
})

router.get("/manageadmin", (req, res) => {
    res.render("admin/manage_admin.ejs")
})

router.get("/managestaff", (req, res) => {
    res.render("admin/manage_staff.ejs")
})

router.get("/managecategory", (req, res) => {
    res.render("admin/manage_category.ejs")
})

router.get("/managesubcategory", (req, res) => {
    res.render("admin/manage_subcategory.ejs")
})

router.get("/manageproduct", (req, res) => {
    res.render("admin/manage_product.ejs")
})


router.post("/adminaction", (req, res) => {

        let action = req.body.action;


        let Query = '';

        if (action == "login") {
            let username = req.body.username;
            let password = req.body.password;
            //`username`, `email`, `password`, `type`
            Query = "select * from admin where username='" + username + "' and password='" + password + "'";
            conn.query(Query, function (err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    Session.admin = username;
                    res.send("0");
                } else {
                    res.send("1");
                }
            })
        } else if (action == "add") {
            let email = req.body.email;
            let username = req.body.username;
            let mobile = req.body.mobile;
            let fullname = req.body.fullname;
            let password = req.body.password;
            //`username`, `email`, `password`, `type`
            Query = "select * from admin where username='" + username + "'";
            conn.query(Query, function (err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    res.send(username + " Username already exist");
                } else {

                    Query = "INSERT INTO `admin`(`username`, `email`, `password`, `mobile`, `fullname`) VALUES ('" + username + "','" + email + "','" + password + "','" + mobile + "','" + fullname + "')"

                    conn.query(Query, function (err) {
                        if (err) throw  err;
                        res.send("Admin Added Successfully");
                    })
                }
            })
        } else if (action == "delete") {
            let username = req.body.username;
            Query = "delete from admin where username= '" + username + "'";
            conn.query(Query, function (err) {
                if (err) throw  err;
                res.send("Admin Deleted Successfully");
            })

        } else if (action == "view") {
            Query = "select * from admin";
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                res.send(rows);
            })

        } else if (action == "edit") {
            let email = req.body.editemail;
            let username = req.body.editusername;
            let mobile = req.body.editmobile;
            let fullname = req.body.editfullname;
            //`username`, `email`, `password`, `type`
            Query = "UPDATE `admin` SET `email`='" + email + "',`mobile`='" + mobile + "',`fullname`='" + fullname + "' WHERE `username`='" + username + "'";
            conn.query(Query, function (err) {
                if (err) throw  err;
                res.send('Admin Updated Successfully');
            })
        } else if (action == "changepassword") {
            let username = Session.admin;
            let oldpassword = req.body.oldpassword;
            let newpassword = req.body.newpassword;
            let newconpassword = req.body.newconpassword;
            Query = "select * from admin where username='" + username + "' and password='" + oldpassword + "'";
            conn.query(Query, function (err, rows) {
                if (err) throw err;
                if (rows.length <= 0) {
                    res.send(username + " Old Password does not match");
                } else {
                    Query = "UPDATE `admin` SET `password`='" + newpassword + "' WHERE `username`='" + Session.admin + "'";
                    conn.query(Query, function (err) {
                        if (err) throw  err;
                        res.send(Session.admin + " Your Password Changed Successfully");
                    })
                }
            })

        } else if (action == "checksession") {
            if (Session.admin != "" && Session.admin != null) {
                res.send(Session.admin);
            } else {
                res.send('session_empty');
            }
        }
    }
)


router.post("/staffaction", (req, res) => {
        let action = req.body.action;
        let Query = '';
        if (action == "add") {
            let email = req.body.email;
            let staffname = req.body.staffname;
            let mobile = req.body.mobile;
            let password = req.body.password;
            let message = "Dear '" + staffname + "'you are registered successfully. \n Your Login Credentials are Username: '" + staffname + "'' & Password: '" + password + "' .\n Thanks with Regards.";
            Query = "select * from staff where staffname='" + staffname + "'";
            conn.query(Query, function (err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    res.send(staffname + " Username already exist");
                } else {

                    Query = "INSERT INTO `staff`(`staffname`, `password`, `email`, `mobile`, `status`) VALUES ('" + staffname + "','" + password + "','" + email + "','" + mobile + "','Blocked')";

                    conn.query(Query, function (err) {
                        if (err) throw  err;
                        let mailTransporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'vmmstudents2020@gmail.com',
                                pass: 'Temp@1234#'
                            }
                        });

                        let mailDetails = {
                            from: 'vmmstudents2020@gmail.com',
                            to: email,
                            subject: 'Staff Registered',
                            text: message
                        };

                        mailTransporter.sendMail(mailDetails, function (err, data) {
                            if (err) {
                                console.log('Error Occurs' + err);
                            } else {
                                console.log('Email sent successfully');
                            }
                        });

                        res.send(staffname + " Staff Added Successfully");
                    })
                }
            })
        } else if (action == "delete") {
            let staffname = req.body.staffname;
            Query = "delete from staff where staffname= '" + staffname + "'";
            conn.query(Query, function (err) {
                if (err) throw  err;
                res.send("Staff Deleted Successfully");
            })

        } else if (action == "view") {
            Query = "select * from staff";
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                res.send(rows);
            })

        } else if (action == "edit") {
            let email = req.body.editemail;
            let staffname = req.body.editstaffname;
            let mobile = req.body.editmobile;
            let password = req.body.editpassword;
            let status = req.body.status;
            //`username`, `email`, `password`, `type`
            Query = "UPDATE `staff` SET `password`='" + password + "',`email`='" + email + "',`mobile`='" + mobile + "',`status`='" + status + "' WHERE `staffname`='" + staffname + "'";
            conn.query(Query, function (err) {
                if (err) throw  err;
                res.send('Staff Updated Successfully');
            })
        }
    }
)

router.post("/categoryaction", (req, res) => {
        let action = req.body.action;
        let Query = '';
        if (action == "add") {
            let type = req.body.supercategory;
            let categoryname = req.body.categoryname;
            let categorydescription = req.body.categorydescription;
            Query = "select * from category where categoryname='" + categoryname + "'";
            conn.query(Query, function (err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    res.send(categoryname + " Categoryname already exist");
                } else {
                    Query = "INSERT INTO `category`(`categoryname`, `categorydescription`, `supercategory`) VALUES ('" + categoryname + "','" + categorydescription + "','" + type + "')";
                    conn.query(Query, function (err) {
                        if (err) throw  err;
                        res.send(categoryname + " Category Added Successfully");
                    })
                }
            })
        } else if (action == "delete") {
            let catname = req.body.catname;
            Query = "delete from category where categoryname= '" + catname + "'";
            conn.query(Query, function (err) {
                if (err) throw  err;
                res.send("Category Deleted Successfully");
            })

        } else if (action == "view") {
            Query = "select * from category";
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                res.send(rows);
            })

        } else if (action == "filterview") {
            let type = req.body.type;
            if (type == "") {
                Query = "select * from category";
            } else {
                Query = "select * from category where supercategory='" + type + "'";
            }
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                res.send(rows);
            })

        } else if (action == "edit") {
            let type = req.body.type;
            let categoryname = req.body.editcategoryname;
            let categorydescription = req.body.editcategorydescription;
            Query = "UPDATE `category` SET `categorydescription`='" + categorydescription + "',`supercategory`='" + type + "' WHERE `categoryname`='" + categoryname + "'";
            conn.query(Query, function (err) {
                if (err) throw  err;
                res.send('Category Updated Successfully');
            })
        }
    }
)

router.post("/subcategoryaction", (req, res) => {
        let action = req.body.action;
        let Query = '';
        if (action == "add") {
            let category = req.body.category;
            let subcategoryname = req.body.subcategoryname;
            let description = req.body.subcategorydescription;
            Query = "select * from subcategory where subcategoryname='" + subcategoryname + "' and `category`='" + category + "'";
            conn.query(Query, function (err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    res.send(subcategoryname + "Sub categoryname already exist");
                } else {
                    Query = "INSERT INTO `subcategory`(`subcategoryid`, `subcategoryname`, `description`, `category`) VALUES ('' ,'" + subcategoryname + "','" + description + "','" + category + "')";
                    conn.query(Query, function (err) {
                        if (err) throw  err;
                        res.send(subcategoryname + "Sub Category Added Successfully");
                    })
                }
            })
        } else if (action == "delete") {
            let subcategoryid = req.body.subcatid;
            Query = "delete from subcategory where subcategoryid= '" + subcategoryid + "'";
            conn.query(Query, function (err) {
                if (err) throw  err;
                res.send("Sub Category Deleted Successfully");
            })

        } else if (action == "view") {
            Query = "select * from subcategory inner join category on subcategory.category=category.categoryname";
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                res.send(rows);
            })

        } else if (action == "filterview") {
            let categoryname = req.body.categoryname;
            if (categoryname == "") {
                Query = "select * from subcategory";
            } else {
                Query = "select * from subcategory where category='" + categoryname + "'";
            }
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                res.send(rows);
            })

        } else if (action == "edit") {
            let category = req.body.editcategory;
            let subcategoryid = req.body.editsubcategoryid;
            let subcategoryname = req.body.editsubcategoryname;
            let description = req.body.editsubcategorydescription;
            Query = "UPDATE `subcategory` SET `subcategoryname`='" + subcategoryname + "',`description`='" + description + "',`category`='" + category + "' WHERE `subcategoryid`='" + subcategoryid + "'";
            conn.query(Query, function (err) {
                if (err) throw  err;
                res.send('Sub Category Updated Successfully');
            })
        }
    }
)

router.post("/productaction", (req, res) => {
        let action = req.body.action;
        let Query = '';
        if (action == "add") {
            let category = req.body.category;
            let subcategory = req.body.subcategory;
            let photo = req.files.photo;
            let stock = req.body.stock;
            let productname = req.body.productname;
            let price = req.body.price;
            let discount = req.body.discount;
            let description = req.body.description;
            save_file_on_server(photo, 'photo');
            let photopath = 'photo/' + photo.name;
            Query = "select * from product where productname='" + productname + "' and `subcatid`='" + subcategory + "'";
            conn.query(Query, function (err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    res.send(productname + "Product Name already exist");
                } else {
                    Query = "INSERT INTO `product`(`productid`, `productname`, `price`, `stock`, `discount`, `photo`, `description`, `subcatid`) VALUES (null,'" + productname + "','" + price + "','" + stock + "','" + discount + "','" + photopath + "','" + description + "','" + subcategory + "')";
                    conn.query(Query, function (err) {
                        if (err) throw  err;
                        res.send(productname + " Product Added Successfully");
                    })
                }
            })
        } else if (action == "addphoto") {
            let photo = req.files.pphoto;
            let pid = req.body.pid;
            let caption = req.body.caption;
            let description = req.body.description;
            save_file_on_server(photo, 'photo');
            let photopath = 'photo/' + photo.name;
            Query = "INSERT INTO `product_photo`(`id`, `photo`, `caption`, `productid`) VALUES (null ,'" + photopath + "','" + caption + "','" + pid + "')";
            conn.query(Query, function (err) {
                if (err) throw  err;
                res.send(" Product Photo Added Successfully");
            })
        } else if (action == "delete") {
            let productid = req.body.productid;
            Query = "delete from product where productid= '" + productid + "'";
            conn.query(Query, function (err) {
                if (err) throw  err;
                res.send("Product Deleted Successfully");
            })

        } else if (action == "deletephoto") {
            let productphotoid = req.body.productphotoid;
            Query = "delete from product_photo where id= '" + productphotoid + "'";
            conn.query(Query, function (err) {
                if (err) throw  err;
                res.send("Product's Photo Deleted Successfully");
            })

        } else if (action == "view") {
            Query = "select * from product inner join subcategory on subcategory.subcategoryid=product.subcatid inner join category on subcategory.category=category.categoryname";
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                res.send(rows);
            })

        } else if (action == "viewphoto") {
            let productid = req.body.productid;
            Query = "select product_photo.*,product.productname from product_photo inner join product on product.productid=product_photo.productid where product_photo.productid='" + productid + "'";
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                res.send(rows);
            })
        } else if (action == "filterview") {
            let categoryname = req.body.categoryname;
            if (categoryname == "") {
                Query = "select * from subcategory";
            } else {
                Query = "select * from subcategory where category='" + categoryname + "'";
            }
            conn.query(Query, function (err, rows) {
                if (err) throw  err;
                res.send(rows);
            })

        } else if (action == "edit") {
            let category = req.body.editcategory;
            let subcategory = req.body.editsubcategoryid;
            let stock = req.body.editstock;
            let productid = req.body.editproductid;
            let productname = req.body.editproductname;
            let price = req.body.editprice;
            let discount = req.body.editdiscount;
            let description = req.body.editdescription;
            if (req.body.editphoto != "") {
                let photo = req.files.editphoto;
                save_file_on_server(photo, 'photo');
                let photopath = 'photo/' + photo.name;
                Query = "UPDATE `product` SET `productname`='" + productname + "',`price`='" + price + "',`stock`='" + stock + "',`discount`='" + discount + "',`photo`='" + photopath + "',`description`='" + description + "',`subcatid`='" + subcategory + "' WHERE `productid`='" + productid + "'";
            } else {
                Query = "UPDATE `product` SET `productname`='" + productname + "',`price`='" + price + "',`stock`='" + stock + "',`discount`='" + discount + "',`description`='" + description + "',`subcatid`='" + subcategory + "' WHERE `productid`='" + productid + "'";
            }
            conn.query(Query, function (err) {
                if (err) throw  err;
                res.send('Product Updated Successfully');
            })
        }
    }
)


module.exports = router

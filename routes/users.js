var express = require('express');
const Session = require('express-session')
var router = express.Router();
var conn = require('../connection')
const save_file_on_server = require('../uploadfile')
const nodemailer = require('nodemailer');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get("/stafflogin", (req, res) => {
  // console.log('hello')
    res.render("staff/staff_login.ejs")
})

module.exports = router;

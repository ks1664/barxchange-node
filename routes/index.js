var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/", (req, res) => {
  res.render("index2.ejs")
})

module.exports = router;

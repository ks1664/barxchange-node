const mysql = require('mysql')


var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'barxchange'

});
conn.connect(function (err) {
    if (err) throw err
    console.log("connection created (:)");
});

module.exports=conn

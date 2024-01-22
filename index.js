var express = require("express");
var app = express();

app.use(express.static('dist/vizzioncloud'));
app.get('/', function (req, res) {
    res.redirect('/');
})

app.listen(8080);
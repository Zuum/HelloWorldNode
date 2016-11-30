var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var handlebars = require('express-handlebars');

app.engine('hbs', handlebars({
  layoutsDir: path.join(__dirname, "public/views"),
  defaultLayout: 'echo',
  extname: '.hbs' }));
app.set('views', path.join(__dirname, "public/views"));
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function(req, res) {
  res.render('echo', { response: req.body.query });
});

app.get('/', function (req, res) {
  res.render('echo', {layout: false});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
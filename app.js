var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var handlebars = require('express-handlebars');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.engine('hbs', handlebars({
  layoutsDir: path.join(__dirname, "public/views"),
  defaultLayout: 'chat',
  extname: '.hbs' }));
app.set('views', path.join(__dirname, "public/views"));
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('chat', {layout: false});
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.all('/:anything', function (req, res) {
  res.send('We don\'t have one. Error 404');
});


http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
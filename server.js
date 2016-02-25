var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var api = require('./api');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

app.get('/', function (req, res) {
  fs.readFile('./public/index.html', 'utf-8', function(err, content) {
  	if(!err) {
  		return res.send(content);
  	} else {
      throw err;
    }
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

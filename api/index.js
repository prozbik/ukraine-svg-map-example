var express = require('express');
var fs = require('fs');
var router = express.Router();



var getData = function(req, res, next) {
  if(!req.query.id) {
    // make a req to db and retrive data
    fs.readFile('./api/data.json', function(err, content) {
      if(!err) return res.json(JSON.parse(content));
      console.error(err);
    });

  } else {
    // we have id, return only 1 by id
    fs.readFile('./api/data.json', function(err, content) {
      if(!err) {
        content = JSON.parse(content);

        var result = content.filter(function(region) {
          return req.query.id === region.id;
        })[0];

        return res.json(result);

      } else {
        console.error(err);
      }
    });

  }
}




router.get('/:id?', getData)




module.exports = router;

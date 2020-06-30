var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const mongodb = require('../database/dbmongo')
  const clientes = mongodb.getClientes()

  res.render('index', { title: 'Express', clientes });
  
});

module.exports = router;

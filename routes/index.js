var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const mongodb = require('../database/dbmongo')
  mongodb.getClientes(
    function(err, docs){
      if(err){
        res.render('index', { title: 'ERROR', clientes: [] });
      }else{
        res.render('index', { title: 'Express', clientes: docs });
      }
      
    }
  )  
});

module.exports = router;

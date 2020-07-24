const express = require('express');
const router = express.Router();

const mongodb = require('../database/dbmongo')

router.get('/', function(req, res, next){
    mongodb.getCustomers(function(err, docs){
        if(err) {
            res.status(500)
            res.json(err)
        }
            res.json(docs)        
      })
})




module.exports = router
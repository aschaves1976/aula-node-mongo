var express = require('express');
var router = express.Router();

const mongodb = require('../database/dbmongo')


/* GET home page. */
router.get('/', function(req, res, next) {
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

/* GET - Tela de Novo Cadastro*/
router.get('/new', function(req, res, next){
  res.render('new', { title: 'Novo Cadastro'})
})

/* POST - Tela de Novo Cadastro*/
router.post('/new', function(request, response, next){
  let nome = request.body.nome
  let idade = parseInt(request.body.idade)
  let cidade = request.body.cidade

  mongodb.insertCliente({nome, idade, cidade}, (err, result)=>{
    if (err){
      return console.log(`Erro no Cadastro do Novo Cliente - ${err}`)
    }
    response.redirect('/')
  })

})
module.exports = router;

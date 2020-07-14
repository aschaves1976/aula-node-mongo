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
  res.render('new', { title: 'Novo Cadastro', doc:{"nome":"", "idade":"", "cidade":""}, action: "/new" })
})

/* GET One Client to be Edited. */
router.get('/edit/:id', function(req, res, next) {
  let id = req.params.id
  // console.log(`(index.js)GET One Client to be Edited - ID: ${id}`)
  mongodb.getOneCliente(id,
    function(err, docs){
      if(err){
        console.log(`(index.js)GET One Client to be Edited - ERROR: ${err}`)
        res.render('new', { title: 'ERROR', clientes: [] });
      }else{
        res.render('new', { title: 'Edição de Cliente', doc: docs[0], action: '/edit/' + docs[0]._id});
      }
      
    }
  )  
});

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

/* POST - Editar um Cliente*/
router.post('/edit/:id', function(request, response, next){
  let id = request.params.id
  let nome = request.body.nome
  let idade = parseInt(request.body.idade)
  let cidade = request.body.cidade

  mongodb.updateCliente(id, {$set: {nome, idade, cidade} }, (err, result)=>{
    if (err){
      return console.log(`Erro ao Atualizar Cliente - ${err}`)
    }
    response.redirect('/')
  })

})

/* DELETE - Excluir um Cliente*/
router.get('/delete/:id', function(request, response, next){
  let id = request.params.id
  mongodb.deleteCliente(id, (err, result) =>{
    if (err){
      console.log(`Erro durante exclusão do cliente ${id} - Error: ${err}`)
    }else{
      response.redirect('/')
    }
  })
})

module.exports = router;

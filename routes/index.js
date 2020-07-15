var express = require('express');
var router = express.Router();

const mongodb = require('../database/dbmongo')

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


/* */
/**
 *  GET home page.
 * 
 * Esta rota foi movida para o final das demais rotas por causa da
 * inclusão da paginação.
 * 
 * Motivo: As rotas são testadas da primeira até a última para ver
 * qual que processará a requisição, assim está rota foi movida para
 * o final do arquivo para que a mesma não interfira nas demais avali
 * ações
 */
router.get('/:pagina?', function(req, res, next) {
  /**
   * Parametro pagina adicionado para fazer paginação de resultados;
   * Parâmetro opcional (?)
   * Se o parâmetro for omitido, então, o valor será 1 (constante page)
   */
  const page = parseInt(req.params.pagina || '1')
  mongodb.getClientes(page,
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

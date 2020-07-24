const mongoClient = require('mongodb').MongoClient

/** 
 * objectId sera utilizado para converter os "_id" retornados
 * da URL, pois estes virao como string e o Mongo não reconhece
 * "_id" como String e sim como um ObjectId
*/
const objectId = require('mongodb').ObjectId

// const url = 'mongodb://localhost:27017'
// Utilizando a variavel de ambiente criada no ".env"
const url = process.env.MONGO_CONNECTION
const dbName = 'aula_mongo01'
const customerCollection = 'clientes' // customer collection
const tamanho_pagina = 10 // determinar total de resultados por pagina

function conectar (callback){
    mongoClient.connect(url)
    .then(conn => global.database = conn.db(dbName),
    console.log(`Conectado na base de dados ${dbName}`),
    callback()
        )
    .catch(err => console.log(`Erro ao conectar na base de dados - ${err}`))
    
}

function getClientes(page, callback){
    /**
     * Parametro page utilizado para calcular o skip, ou seja, quantos
     * elementos da consulta serão ignorados.
     * Se a página for a primeira, serão apresentados até 10 elementos.
     * Se for a segunda página, serão apresentados mais 10, a partir da 11ª
     * posição e assim por diante.
     */
    const tamanhoSkip = tamanho_pagina * (page - 1)
    global.database.collection(customerCollection)
    .find({})
    .skip(tamanhoSkip)
    .limit(tamanho_pagina)
    .toArray(callback)
}

function getCustomers(callback){
    global.database.collection(customerCollection)
    .find({})
    .toArray(callback)
}


function getOneCliente(id, callback){
    global.database.collection(customerCollection).find(new objectId(id)).toArray(callback)
}

function insertCliente(cliente, callback){
    global.database.collection(customerCollection).insert(cliente, callback)
}

function updateCliente(id, cliente, callback){
    global.database.collection(customerCollection).updateOne({_id: new objectId(id)}, cliente, callback)
}

function deleteCliente(id, callback){
    global.database.collection(customerCollection).deleteOne({_id: objectId(id)}, callback)
}

function cntAll(callback){
    /**
     * Responsável por contar a quantidade de registros na coleção
     * O parâmetro callback deve retornar erro (opcional) e a quanti
     * dade de documentos na coleção.
     * 
     * Utilizando esta função será possível apresentar para o usuário
     * quantas páginas existem para consulta, neste caso, de clientes
     */
    global.database.collection(customerCollection).count(callback)
}

/* A constante de tamanho da pagina agora está sendo exportada, também*/
module.exports = {
      conectar
    , getClientes
    , getOneCliente
    , insertCliente
    , updateCliente
    , deleteCliente
    , cntAll
    , tamanho_pagina
    , getCustomers
}
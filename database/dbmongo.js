const mongoClient = require('mongodb').MongoClient
/** 
 * objectId sera utilizado para converter os "_id" retornados
 * da URL, pois estes virao como string e o Mongo não reconhece
 * "_id" como String e sim como um ObjectId
*/
const objectId = require('mongodb').ObjectId

const url = 'mongodb://localhost:27017'
const dbName = 'aula_mongo01'
const customerCollection = 'clientes' // customer collection

function conectar (callback){
    mongoClient.connect(url)
    .then(conn => global.database = conn.db(dbName),
    console.log(`Conectado na base de dados ${dbName}`),
    callback()
        )
    .catch(err => console.log(`Erro ao conectar na base de dados - ${err}`))
    
}

function getClientes(callback){
    global.database.collection(customerCollection).find({}).toArray(callback)
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

module.exports = {
      conectar
    , getClientes
    , getOneCliente
    , insertCliente
    , updateCliente
    , deleteCliente 
}
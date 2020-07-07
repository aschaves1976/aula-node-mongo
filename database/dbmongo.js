const mongoClient = require('mongodb').MongoClient
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

function insertCliente(cliente, callback){
    global.database.collection(customerCollection).insert(cliente, callback)
}

function updateCliente(cliente, callback){
    global.database.collection(customerCollection).update({_id: objectId(cliente._id)}, cliente, callback)
}

function deleteCliente(id, callback){
    global.database.collection(customerCollection).remove({_id: objectId(id)})
}

module.exports = { conectar, getClientes, insertCliente, updateCliente, deleteCliente }
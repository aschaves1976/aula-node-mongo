const mongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const dbName = 'aula_mongo01'
const customerCollection = 'clientes' // customer collection

mongoClient.connect(url)
.then(conn => global.database = conn.db(dbName),
console.log(`Conectado na base de dados ${dbName}`)
    )
.catch(err => console.log(`Erro ao conectar na base de dados - ${err}`))

function getClientes(callback){
    global.database.collection(customerCollection).find({}).toArray(callback)
}

module.exports = { getClientes }
const mongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'

mongoClient.connect(url)
.then(conn => global.database = conn.db('aula_mongo01'))
.catch(err => console.log(err))

function getClientes(callback){
    global.database.collection('clientes').find({}).toArray(callback)
}

module.exports = { getClientes }
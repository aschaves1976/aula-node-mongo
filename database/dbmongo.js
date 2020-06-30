const mongoClient = require('mongodb').mongoClient

const url = 'mongo://localhost:27017'

mongoClient.connect(url)
.then(conn => global.database = conn.db('clientes'))
.catch(err => console.log(err))

function getClientes(){
    global.database.collection('clientes').find().toArray(
        function(docs){
            return docs
        }
    )
}

module.exports = { getClientes }
const express = require ('express');
const bodyParser = require ('body-parser');
const app = express()
const mongoose = require ('mongoose')

//Config do server
    //Body-Parser
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        

    //Conexão com bando de dados MongoDB
        mongoose.connect('mongodb://localhost/nodeApiSushi').then(() => {
            console.log('Conectado ao Mongodb')
        }).catch((err) => {
            console.log('Erro ao se conectar:'+ err)
        });

        mongoose.Promise = global.Promise;

        module.exports = mongoose;

    //Router
    require('./controllers/crudController')(app)







app.listen(3000, () =>(
console.log('Server Running...')
))
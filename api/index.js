require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const userCrud = require('./database/userCrud')
const redis = require('./database/redis')
const mongodb = require('./database/mongo')
const neo4j = require('./database/neo4j')

app.get('/inserir/:nome/cpf/:cpf/email/:email/senha/:senha', userCrud.inserirUsuario);
app.get('/visualizar/:cpf', userCrud.visualizarUsuario);
app.get('/atualizar/:cpf/nome/:nome/email/:email/senha/:senha',userCrud.atualizarUsuario);
app.get('/excluir/:cpf',userCrud.deletarUsuario);

app.get('/salvarRascunho/:cpf/rascunho/:rascunho',redis.salvarRascunho);
app.get('/lerRascunho/:cpf',redis.lerRascunho);
app.get('/deletarRascunho/:cpf',redis.deletarRascunho);

app.get('/salvarPost/:titulo/texto/:texto/cpf/:cpf',mongodb.salvarPost);
app.get('/obterPosts/:cpf',mongodb.obterPosts);

app.post('/addUsuario', (req, res) => {
  neo4j.addUsuario(req.body.nome, req.body.cpf)
  res.end('adicionado')
})

app.post('/seguirUsuario', (req, res) => {
  neo4j.seguirUsuario(req.body.cpf1, req.body.cpf2)
  res.end('seguindo')
})


app.listen(process.env.PORT, () => { 
  console.log(`Server listening on port ${process.env.PORT}`); 
});
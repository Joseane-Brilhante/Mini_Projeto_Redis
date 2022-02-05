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

app.get('/inserir/:nome/cpf/:cpf/email/:email/senha/:senha', userCrud.inserirUsuario);
app.get('/visualizar/:cpf', userCrud.visualizarUsuario);
app.get('/atualizar/:cpf/nome/:nome/email/:email/senha/:senha',userCrud.atualizarUsuario);
app.get('/excluir/:cpf',userCrud.deletarUsuario);

app.get('/salvarRascunho/:cpf/rascunho/:rascunho',redis.salvarRascunho);
app.get('/lerRascunho/:cpf',redis.lerRascunho);
app.get('/deletarRascunho/:cpf',redis.deletarRascunho);

app.listen(process.env.PORT, () => { 
  console.log(`Server listening on port ${process.env.PORT}`); 
});
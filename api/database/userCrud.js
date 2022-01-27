const pool = require('./pool');

const inserirUsuario = (request, response) => {
    const nome = request.params.nome;
    const cpf = request.params.cpf;
    const email = request.params.email;
    const senha = request.params.senha;
    
    pool.query(`INSERT INTO usuario(nome, cpf, email, senha) VALUES('${nome}', '${cpf}', '${email}', '${senha}');`, (error, results) => {
      if (error) {
        response.status(200).json(error);
      }
      else {
        response.status(200).send(`O usuário ${nome} foi cadastrado com sucesso!`)
      }
    })
  };
  
  const atualizarUsuario = (request, response) => {
    const nome = request.params.nome;
    const cpf = request.params.cpf;
    const email = request.params.email;
    const senha = request.params.senha;

    pool.query(`UPDATE Usuario SET nome = '${nome}', email = '${email}', senha = '${senha}' WHERE cpf = '${cpf}'`, (error, results) => {
      if (error) {
        response.status(200).json(error);
      }
      else {
        response.status(200).send("Usuário atualizado com sucesso!");
      }
    });
  };

  const deletarUsuario = (request, response) => {
    pool.query(`DELETE FROM Usuario WHERE cpf = '${request.params.cpf}';`, (error, results) => {
      if (error) {
        response.status(200).json(error);
        throw error;
      }
      else{
        response.status(200).send("Usuário deletado com sucesso!");
      }
    });
  };

module.exports = {inserirUsuario, atualizarUsuario, deletarUsuario};
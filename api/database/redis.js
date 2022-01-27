const Redis = require("ioredis");

const client = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);

client.on('connect', (err) =>{
    console.log("Conectado")
})

const salvarRascunho = (request, response) => {
    const rascunho = request.params.rascunho;
    const cpf = request.params.cpf;
    client.set(cpf, rascunho, 'EX', 7200)
    response.status(200).send('Rascunho salvo!')
  };

const lerRascunho = (request, response) => {
    const cpf = request.params.cpf;
    client.get(cpf, (err, res) => {
        if(res != null){
            response.status(200).send(res)
        }
        else{
            response.status(200).send("null")
        }
    })
}

const deletarRascunho = (request, response) => {
    const cpf = request.params.cpf;
    client.del(cpf) 
    response.status(200).send(true)
}

module.exports = {salvarRascunho, lerRascunho, deletarRascunho}


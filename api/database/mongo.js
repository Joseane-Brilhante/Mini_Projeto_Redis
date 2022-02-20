const{MongoClient} = require('mongodb');

const usuario = new MongoClient(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`);
async function getPostagens(cpf) {
    let posts = [];
    try {
        await usuario.connect();
        const database = usuario.db(process.env.MONGO_DATABASE);
        const postagens = database.collection('postagens');

        await postagens.find({}, {'_id': 0, 'cpf': cpf}).forEach(p => posts.push(p));
    }
    finally {
        await usuario.close();
        return posts;
    }
}

async function salvarPostagem(obj) {
    try {
        await usuario.connect();
        const database = usuario.db(process.env.MONGO_DATABASE);
        const postagens = database.collection('postagens');

        await postagens.insertOne(obj).then(console.log('OK'))
    }
    finally {
        await usuario.close();
        return true;
    }
}

const obterPosts = async(request, response) => {
    const cpf = request.params.cpf;
    let postagens = await getPostagens(cpf);
    response.status(200).json(postagens);
}

const salvarPost = (request, response) => {
    const cpf = request.params.cpf;
    const titulo = request.params.titulo;
    const texto = request.params.texto;

    let post = {
        'cpf': cpf,
        'titulo': titulo,
        'texto': texto
    }
    salvarPostagem(post)
    response.status(200).send('OK');

}

module.exports = {obterPosts, salvarPost};


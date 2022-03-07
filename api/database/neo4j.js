require('dotenv').config();
const neo4j = require('neo4j-driver');

const url = `neo4j://${process.env.NEO4J_HOST}:${process.env.NEO4J_PORT}`;
const driver = neo4j.driver(url, neo4j.auth
    .basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD));
const session = driver.session();

async function addUsuario(nome, cpf){
    let status
    try{
        const query = `CREATE (p:Usuario{nome:"${nome}",cpf:"${cpf}"}) RETURN p`;
        await session.run(query).then(result => status = result.records[0].length>0);
    }
    finally{
        return status;
    }
}

async function seguirUsuario(cpf1, cpf2){
    let dateTime = new Date()
    let seguindoDesde = `Seguindo desde: ${dateTime.getDate()}/${dateTime.getMonth()+1}/${dateTime.getFullYear()} às ${dateTime.getHours()}:${dateTime.getMinutes()}`
    try{
        const query = `MATCH (p1:Usuario), (p2:Usuario)
        WHERE p1.cpf="${cpf1}" AND p2.cpf="${cpf2}"
        CREATE (p1)-[:SEGUINDO{desde:"${seguindoDesde}"}]->(p2)`;

        await session.run(query).then(result => console.log(
            result.summary.counters._stats.relationshipsCreated));
    }
    finally{

    }
}

module.exports = {addUsuario, seguirUsuario};
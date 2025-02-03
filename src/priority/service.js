
let pg = require("pgconnect-lite")
function createPriority(payload, dbConnection) {
    return new Promise(async (resolve, reject) => {
        try {
            let { name } = payload
            let sql = `insert into priorities(name) values($1) returning *`; ``
            let params = [name]
            let query = await pg.insert(dbConnection, sql, params);
            let { data } = query;
            let{items}=data;
            return resolve(items[0])
        } catch (err) {

            return reject(err)

        }
    })
}


function getProirityByName(dbConnection) {
    return new Promise(async (resolve, reject) => {
        let name = 'low';
        try {
            let sql = `select * from priorities where lower(name)=$1`;
            let param = [name]
            let priority = await pg.fetchOne(dbConnection, sql, param);
            return resolve(priority.data)
        } catch (err) {
            return reject(err)
        }

    })
}

function fetchPriority(payload,dbConnection) {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `select * from priorities`;
            let param = [];
            let priorities = await pg.fetch(dbConnection, sql, param);
            let{data}=priorities;
            let {items}=data;
            return resolve(items)
        } catch (err) {
            return reject(err)

        }

    })
}


module.exports = {
    createPriority,
    getProirityByName,
    fetchPriority
}
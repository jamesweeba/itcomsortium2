
let pg = require("pgconnect-lite")
function priorities(payload, dbConnection) {
    return new Promise(async (resolve, reject) => {
        try {
            let { name } = payload
            let sql = `insert into priorities(name) values($1) returning *`; ``
            let params = [name]
            let query = await pg.insert(dbConnection, sql, params);
            let { data } = query;
            return resolve(data)
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
            let status = await pg.fetchOne(dbConnection, sql, param);
            return resolve(status.data)
        } catch (err) {
            return reject(err)
        }

    })
}


module.exports = {
    priorities,
    getProirityByName
}
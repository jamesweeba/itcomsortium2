let pg = require("pgconnect-lite")

function getCount(tableName, dbConnection) {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `select count(*) from ${tableName}`;
            let query = await pg.fetchOne(dbConnection, sql, []);
            let { data } = query;
            return resolve(data)

        } catch (err) {
            return reject(err)
        }




    })



}

module.exports = {
    getCount
}
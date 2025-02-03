let pg = require("pgconnect-lite");

function status(payload, dbConnection) {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `insert into status(name) values($1) returning *`;
            let { name } = payload;
            let params = [name]
            let createdStatus = await pg.insert(dbConnection, sql, params);
            let { data } = createdStatus;
            let{items}=data;
            return resolve(items[0])

        } catch (err) {

            return reject(err)

        }

    })


}

function fetchSatus(payload, dbConnection) {
    return new Promise(async (resolve, reject) => {
        try {
            let sql=`select * from status`;
            let params=[];
            let retrivedStatus=await pg.fetch(dbConnection,sql,params);
            let{data}=retrivedStatus;
            let{items}=data;
            return resolve(items);

        } catch (err) {
            return reject(err)

        }
    })

}

function getAstatusByName(dbConnection) {
    return new Promise(async (resolve, reject) => {
        let name = 'todo'
        try {
            let sql = `select * from status where lower(name)=$1`;
            let param = [name]
            let status = await pg.fetchOne(dbConnection, sql, param);
            return resolve(status.data)

        } catch (err) {
            return reject(err)
        }

    })
}



module.exports = {
    status,
    getAstatusByName,
    fetchSatus
}
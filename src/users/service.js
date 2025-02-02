let pgstream = require("pgconnect-lite");
let { getCount } = require("../utils/utils");


function getUsers(payload, dbConnection) {
    return new Promise(async (resolve, reject) => {
        try {

            let { limit, page, user } = payload;
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;
            const offset = (page - 1) * limit;
            let totalUsersCount = await getCount("users", dbConnection);
            let totalPages = Math.ceil(totalUsersCount.count / limit);
            let sqlField = ["email", "role", "first_name", "last_name"];
            let modifiedFields = modifyUsersSearchFields(payload);
            let filteredsqlField = sqlField.filter(item => modifiedFields[item]);
            let sqlParams=sqlField.map(item=>modifiedFields[item]).filter(item=>item)
            let length = filteredsqlField.length;


            delete payload.limit;
            delete payload.page;

            let sql = `select id,first_name as "firstName",last_name as "lastName",email,created_at,role from users
            where ` + filteredsqlField.map((v, i) => v + `=$` + (i + 1)).join(` and `) +
                ` LIMIT $${length + 1} OFFSET $${length + 2}`;
            let params = [...sqlParams, limit, offset];
            let users = await pgstream.fetch(dbConnection, sql, params);
            let { data } = users;
            let { count,items } = data
            if (count < 1) {
                return resolve(null)
            }
            let results = {
                page,
                limit,
                totalPages,
                totalUsers: parseInt(totalUsersCount.count),
                items
            }
           
            return resolve(results)

        } catch (err) {
            return reject(err)

        }


    })

}


function modifyUsersSearchFields(payload) {
    if (payload.hasOwnProperty('firstName')) {
        payload.first_name = payload.firstName;
        delete payload.firstName;
    }
    if (payload.hasOwnProperty('lastName')) {
        payload.last_name = payload.lastName;
        delete payload.lastName;
    }
    return payload;
}




module.exports = {
    getUsers
}
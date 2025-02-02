
let pgstream = require("pgconnect-lite");
const bcrypt = require("bcryptjs");


function createUser(payload, dbConnection) {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `insert into users(email,password,first_name,last_name) values ($1,$2,$3,$4) returning *`;
            let { email, password, firstName, lastName } = payload;
            let passwordHash = bcrypt.hashSync(password);
            let params = [email, passwordHash, firstName, lastName]
            let query = await pgstream.insert(dbConnection, sql, params);
            let result = query.data.items[0];
            delete result.password;
            return resolve(result)
        } catch (err) {
            return reject(err);
        }
    })

}

function userLogin(payload, dbConnection) {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `select * from users where email=$1`;
            let { email, password: userpassword } = payload;
            let params = [email];
            let query = await pgstream.fetchOne(dbConnection, sql, params);
            let { password } = query.data;
            if (!password) return reject({ message: "Invalid Credentials" });
            let pwCompare = bcrypt.compareSync(userpassword, password);
            if (!pwCompare) return reject({ message: "Invalid Credentials" });
            let result = query.data;
            delete result.password;
            return resolve(result)
        } catch (err) {
            return reject(err)

        }

    })

}

//enyata

module.exports = {
    createUser,
    userLogin
}
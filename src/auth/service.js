
let pgstream = require("pgconnect-lite");
const bcrypt = require("bcryptjs");


function createUser(payload, dbConnection) {
    return new Promise(async (resolve, reject) => {
        try {
            let sql = `insert into users(email,password,first_name,last_name) values ($1,$2,$3,$4) returning *`;
            let { username, password, firstName, lastName } = payload;
            let passwordHash = bcrypt.hashSync(password);
            let params = [username.toLowerCase(), passwordHash, firstName, lastName]
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
            let sql = `select * from users where lower(email)=$1`;
            let { username, password: userpassword } = payload;
            let params = [username.toLowerCase()];
            let query = await pgstream.fetchOne(dbConnection, sql, params);
            console.log(query);
            console.log("llllllllllllllllllllllllllll")
            let { password, data} = query.data;
            if(!data){
                return reject({ message: "User Not Authorised" });

            }
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

const { createUser: user, userLogin } = require("./service");
const pgstream = require("pgconnect-lite");
const { signupSchema, loginSchema } = require("./schema");
const { validate } = require("../validator/validate");
const{jwtSecret}=require("../config/config")
let mySecretKey = "a4";
const jwt = require("jsonwebtoken");



async function createUser(req, res) {
    let dbConnection;
    try {
        let payload = req.body;
        let isValid = validate(signupSchema, payload);
        if (!isValid.isValid) {
            let { err } = isValid
            return res.status(400).json(err)
        }
        dbConnection = await pgstream.connect();
        let userCreated = await user(payload, dbConnection);
        let { id, email,role } = userCreated;
         let jwtToken=signToken({id,email,role});
        pgstream.commit(dbConnection)
        return res.status(201).json({data:userCreated,token:jwtToken});

    } catch (err) {
        pgstream.commit(dbConnection)
        let { code } = err;
        if (code == 23505) {
            return res.status(409).json({ "message": "Credentials  taken" });
        }
        console.log(err)

    }


}


async function login(req, res) {
    let dbConnection;
    try {
        let payload = req.body;
        let isValid = validate(loginSchema, payload);
        if (!isValid.isValid) {
            let { err } = isValid
            return res.status(400).json(err)
        }
        dbConnection = await pgstream.connect();
        let loggedIn = await userLogin(payload, dbConnection);
        let { id, email,role } = loggedIn;
        let jwtToken=signToken({id,email,role})
        pgstream.commit(dbConnection)
        return res.status(201).json({data:loggedIn,token:jwtToken});
    } catch (err) {
        pgstream.commit(dbConnection)
        return res.status(401).json(err)
    }

}



function signToken(payload) {

    const token = jwt.sign(payload, mySecretKey, {
        expiresIn: "7d"
    });
    return token;

}



module.exports = {
    createUser,
    login
}
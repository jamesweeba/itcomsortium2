
let pgstream = require("pgconnect-lite");
let { status: taskStatus, fetchSatus } = require("./service")
const { validate } = require("../validator/validate");
let { statusSchema } = require("./schema");



async function status(req, res) {
    let dbConnection;
    try {
        let payload = req.body;
        if (req.user.role != "admin") {
            return res.status(403).json({ message: "User Unauthorised", statusCode: 403 })
        }
        let isValid = validate(statusSchema, payload);
        if (!isValid) {
            return res.status(400).json({ message: "Bad Request", statusCode: 400 })
        }
        dbConnection = await pgstream.connect();
        let status = await taskStatus(payload, dbConnection);
        pgstream.commit(dbConnection)
        return res.status(201).json({ statusCode: 201, message: "Created", data: status })
    } catch (err) {
        pgstream.commit(dbConnection)
        if (err.code == "22P02") {
            return res.status(400).json({ statusCode: 400, message: "Bad Request" })
        }
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" })
        // console.log(err)
    }

}

async function getStatus(req, res) {
    let dbConnection;
    req.user.role = 'admin';
    try {
        if (req.user.role != "admin") {
            return res.status(403).json({ message: "User Unauthorised", statusCode: 403 })
        }
        let payload = req.body;
        dbConnection = await pgstream.connect();
        let status = await fetchSatus(payload, dbConnection);
        pgstream.commit(dbConnection)
        return res.status(200).json({ message: "Success", statusCode: 200, data: status })
    } catch (err) {
        pgstream.commit(dbConnection)
        if (err.code == "22P02") {
            return res.status(400).json({ statusCode: 400, message: "Bad Request" })
        }
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" })
        // console.log(err)
    }

}

module.exports = {
    status,
    getStatus
}
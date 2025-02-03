let pgstream = require("pgconnect-lite");
let { createPriority: cPrioirity, fetchPriority } = require("./service");
let { prioritySchema } = require("./schema");
const { validate } = require("../validator/validate");



async function createpriority(req, res) {
    let dbConnection;
    try {
        let payload = req.body;
        if (req.user.role != "admin") {
            return res.status(403).json({ message: "User Unauthorised", statusCode: 403 })
        }
        let isValid = validate(prioritySchema, payload);
        if (!isValid) {
            return res.status(400).json({ message: "Bad Request", statusCode: 400 })
        }
        dbConnection = await pgstream.connect();
        let createdPrority = await cPrioirity(payload, dbConnection);
        pgstream.commit(dbConnection)
        return res.status(201).json({message:"Created",statusCode:201,data:createdPrority})

    } catch (err) {
        pgstream.commit(dbConnection);
        return res.status(500).json({ message: "Internal server error", statusCode: 500 })
    }

}

async function getPriority(req, res) {
    let dbConnection;
    try {
        if (req.user.role != "admin") {
            return res.status(403).json({ message: "User Unauthorised", statusCode: 403 })
        }
        let payload = req.query;
        dbConnection = await pgstream.connect();
        let fpriorities = await fetchPriority(payload, dbConnection);
        pgstream.commit(dbConnection);
        return res.status(200).json({message:"Success",statusCode:200,data:fpriorities});
    } catch (err) {
        pgstream.commit(dbConnection);
        return res.status(500).json({ message: "Internal server error", statusCode: 500 })


    }

}


module.exports = {
    createpriority,
    getPriority
}

let pgstream = require("pgconnect-lite");
let { status: taskStatus,fetchSatus } = require("./service")

async function status(req, res) {
    let dbConnection;
    try {
        if(req.user.role!="admin"){
            return res.status(201).json(status)


        }
        let payload = req.body;
        dbConnection = await pgstream.connect();
        let status = await taskStatus(payload, dbConnection);
        pgstream.commit(dbConnection)
        return res.status(201).json(status)
    } catch (err) {
        console.log(err)

    }

}

async function getStatus(req, res) {
    let dbConnection;
    try {
        let payload = req.body;
        dbConnection = await pgstream.connect();
        let status = await fetchSatus(payload, dbConnection);
        pgstream.commit(dbConnection)
        return res.status(201).json(status)
    } catch (err) {
        console.log(err)
    }

}

module.exports = {
    status,
    getStatus
}
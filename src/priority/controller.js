let pgstream = require("pgconnect-lite");
let { priorities: createPrority } = require("./service")

async function priorities(req, res) {
    let dbConnection;
    try {
        dbConnection = await pgstream.connect();
        let payload = req.body;
        let createdPrority = await createPrority(payload, dbConnection);
        pgstream.commit(dbConnection)
        return res.status(201).json(createdPrority)

    } catch (err) {
        console.log(err)

    }


}



module.exports = {
    priorities
}
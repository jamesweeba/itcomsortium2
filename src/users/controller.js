
let pgstream = require("pgconnect-lite");
let { getUsers } = require("./service");

async function users(req, res) {
    let dbConnection;
    try {
        dbConnection = await pgstream.connect();
        let payload = req.query;
        let users = await getUsers(payload, dbConnection);
        // console.log(users);
        // console.log("ppppppppppppppppppppppppppppppp")
        pgstream.commit(dbConnection)
        if (!users) {
            return res.status(404).json({ statusCode: 404, message: "Not Found" })
        }
        return res.status(200).json(users)
        

    } catch (err) {
        pgstream.commit(dbConnection)
        return res.status(500).json(err)

    }
}


module.exports = {
    users
}
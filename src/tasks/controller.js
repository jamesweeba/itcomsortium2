let { createTask, getTasks: fetchTasks, getTask: fetchTask, updateTask: updatedTask, deleteTask: dTask } = require("./service");
let pgstream = require("pgconnect-lite");
const { validate } = require("../validator/validate");
let { taskSchema, taskSearchSchema, aTaskSchema, updateSchema } = require("./schema");
const { connect } = require("./router");


async function creatTask(req, res) {
    let dbConnection;
    try {
        let payload = req.body;
        let isValid = validate(taskSchema, payload);
        if (!isValid.isValid) {
            let { err } = isValid
            return res.status(400).json(err)
        }
        payload.userId = req.user.id;
        payload.user=req.user;
        dbConnection = await pgstream.connect();
        let task = await createTask(payload, dbConnection);
        pgstream.commit(dbConnection);
        return res.status(201).json({message:"Created",statusCode:201,data:task})
    } catch (err) {
        pgstream.commit(dbConnection);
        return res.status(500).json(err)
    }

}


async function getTasks(req, res) {
    let dbConnection;
    try {
        let payload = req.query;
        let isValid = validate(taskSearchSchema, payload);
        if (!isValid.isValid) {
            let { err } = isValid
            return res.status(400).json(err)
        }
        payload.user = req.user;
        dbConnection = await pgstream.connect();
        let task = await fetchTasks(payload, dbConnection);
        pgstream.commit(dbConnection);
        if (!task) {
            return res.status(404).json({ message: "Not Found", statusCode: 404 })
        }
        return res.status(200).json(task)

    } catch (err) {
        console.log(err)
        pgstream.commit(dbConnection);
        if (err.code == "22P02") {
            return res.status(400).json({ statusCode: 400, message: "Bad Request" })
        }
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" })
    }

}


async function getTask(req, res) {
    let dbConnection;
    try {
        let payload = req.params;
        let isValid = validate(aTaskSchema, payload);
        if (!isValid.isValid) {
            let { err } = isValid
            return res.status(400).json(err)
        }

        payload.user = req.user
        dbConnection = await pgstream.connect();
        let task = await fetchTask(payload, dbConnection);
        pgstream.commit(dbConnection)
        if (!task) {
            return res.status(404).json({ statusCode: 404, message: "Not Found" })
        }
        return res.status(200).json({message:"success", statusCode:200,data:task})

    } catch (err) {
        pgstream.commit(dbConnection)
        if (err.code == "22P02") {
            return res.status(400).json({ statusCode: 400, message: "Bad Request" })
        }
        return res.status(500).json({ statusCode: 500, message: "Internal Server Error" })

    }
}

async function updateTask(req, res) {
    let dbConnection;
    try {
        let payload = req.params;
        payload = { ...payload, ...req.body }
        let isValid = validate(updateSchema, payload);
        if (!isValid.isValid) {
            let { err } = isValid
            return res.status(400).json(err)
        }
        payload.user = req.user
        dbConnection = await pgstream.connect();
        let task = await updatedTask(payload, dbConnection);
        pgstream.commit(dbConnection)
        return res.status(200).json({message:"success",statusCode:200,data:task})
    } catch (err) {
        console.log(err)
        pgstream.commit(dbConnection)
        return res.status(500).json(err)

    }


}

async function deleteTask(req, res) {
    let dbConnection;
    try {
        let payload = req.params
        dbConnection = await pgstream.connect();
        let task = await dTask(payload, dbConnection);
        pgstream.commit(dbConnection)
        return res.status(200).json(task);
    } catch (err) {
        pgstream.commit(dbConnection)
        return res.status(500).json(err)
    }

}


module.exports = {
    creatTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
}
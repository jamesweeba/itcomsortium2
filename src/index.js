const express = require("express");
const app = express();
const PORT = process.argv[2] || 1600;
const pgstream = require("pgconnect-lite");
const auth = require("./auth/router");
const user=require("./users/router");
const task = require("./tasks/router")
const status = require("./status/router")
const priority = require("./priority/router")
const { postgresdb } = require("./dbConfig/dbConfig");




pgstream.init(postgresdb["local"])



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/auth", auth);
app.use("/api/v1/tasks", task);
app.use("/api/v1/status", status);
app.use("/api/v1/priorities", priority);
app.use("/api/v1/users",user)



app.listen(PORT, () => {
    console.log(`magic happens on ${PORT}`)
})
const express = require("express");
const app = express();
const swaggerJSDoc =require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express')
const cors = require("cors");



const PORT = process.argv[2] || 1600;
const pgstream = require("pgconnect-lite");
const auth = require("./auth/router");
const user=require("./users/router");
const task = require("./tasks/router")
const status = require("./status/router")
const priority = require("./priority/router")
const { postgresdb } = require("./dbConfig/dbConfig");
const{taskBaseUrl}=require("./config/config")




const swaggerOption={
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Auth For Task  api",
            version: "1.0.0",       
            servers: [
                {
                    url: taskBaseUrl
                }
            ]
        }
    },
    apis: [`${__dirname}/auth/router.js`,
        `${__dirname}/tasks/router.js`,
        `${__dirname}/status/router.js`,
        `${__dirname}/priority/router.js`
    ]
}
const specs=swaggerJSDoc(swaggerOption);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs));




pgstream.init(postgresdb["local"]);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); 


app.use("/api/v1/auth", auth);
app.use("/api/v1/tasks", task);
app.use("/api/v1/status", status);
app.use("/api/v1/priorities", priority);
app.use("/api/v1/users",user)

//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

app.listen(PORT, () => {
    console.log(`magic happens on ${PORT}`)
})
const apiAppVersion = require('../../package.json').version;
module.exports = {
    jwtSecret: process.env.INSYT_JWT_SECRET || "a4",
    taskBaseUrl:process.env.TASK_URL||"http://localhost:1600"

};


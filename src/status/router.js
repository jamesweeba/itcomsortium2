let router = require("express").Router();
let {status:taskStatus,getStatus}=require("./controller");


router.post("/",taskStatus);
router.get("/",getStatus)

module.exports = router;
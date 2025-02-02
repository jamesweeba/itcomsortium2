let router = require("express").Router();
let {priorities}=require("./controller");

router.post("/",priorities)
router.get("/",)


module.exports=router;
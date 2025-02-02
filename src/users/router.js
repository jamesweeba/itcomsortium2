let router=require("express").Router();
let {users}=require("./controller")

router.get("/",users)



module.exports=router;
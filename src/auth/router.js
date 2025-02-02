
const router=require("express").Router();
const {createUser,login}=require("./controller");


router.post("/signup",createUser);
router.post("/login",login)


module.exports=router;
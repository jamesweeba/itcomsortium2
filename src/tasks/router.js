let router = require("express").Router();
const { creatTask, getTasks,getTask ,updateTask,deleteTask} = require("./controller");
const { authorize } = require("../middlewares/authorize")


router.use(authorize)

router.post("/", creatTask);
router.get("/", getTasks);
router.get("/:id",getTask);
router.put("/:id",updateTask);
router.delete("/:id",deleteTask);



module.exports = router;
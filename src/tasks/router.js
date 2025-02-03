let router = require("express").Router();
const { creatTask, getTasks, getTask, updateTask, deleteTask } = require("./controller");
const { authorize } = require("../middlewares/authorize")





/**
 * @swagger
 * components:
 *  securitySchemes:
 *     TokenAuth:
 *       type: apiKey
 *       in: header
 *       name: x-access-token
 *       description: Enter your JWT token in the format 
 *  schemas:
 *   Task:
 *     type: object
 *     required:
 *      - title
 *      - description
 
 *     properties:
 *      title:
 *        type: string
 *        description: title of task
 * 
 *      description:
 *        type: string
 *        description: description of task
 */


/**
 * @swagger
 * components:
 *  schemas:
 *   Task_saved:
 *     type: object
 *     required:
 *      - title
 *      - description
 
 *     properties:
 *       title:
 *        type: string
 *        description: title of task
 * 
 *       id:
 *        type: string
 *        description: id of task
 * 
 *       created_at:
 *        type: string
 *        description: date  of created task
 * 
 *       modified_at:
 *        type: string
 *        description: modified date of task
 * 
 *       postedby_id:
 *        type: string
 *        description: user who created task
 * 
 *       status_id:
 *        type: string
 *        description: task status id
 *      
 *       state:
 *        type: string
 *        description: task state
 * 
 *       priority_id:
 *        type: string
 *        description: task priority id
 * 
 *       assinged_to:
 *        type: string
 *        description: id to whom the task is assned to
 * 
 *       expires_at:
 *        type: string
 *        description: date on which task expires
 * 
 *       status:
 *        type: string
 *        description: status of task
 * 
 * 
 *       priority:
 *        type: string
 *        description: proirty of task
 * 
 *        
 */

/**
 * @swagger
 * /api/v1/tasks:
 *  post:
 *   summary: Task Create
 *   tags: [Task]
 *   security:
 *       - TokenAuth: [] 
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *        $ref: '#/components/schemas/Task'
 * 
 *   responses:
 *     201:
 *       description: Task Successfully Created
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Task_saved'
 *     400:
 *       description: Bad Request
 *     409:
 *       description: Credentails Taken
 *     498:
 *       description: User Not Authorised
 *     500: 
 *       description: Internal server error
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *      summary: Task Fetch
 *      tags: [Task]
 *      security:
 *       - TokenAuth: [] 
 *      
 *      parameters:
 *       - in: query
 *         name: title
 *         schema: 
 *           type: string
 *         description: the title of the task
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: the description of the task
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *         description: the priority of the task
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: the status of the task
 * 
 * 
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: number of items to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: the page number
 *      responses:
 *         200:
 *           description: task report search
 *           content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Task_saved'
 *         404:
 *           description: Not found
 *         400:
 *          description:  Bad Request
 *         500:
 *          description: Sever Error
 * 
 *    
 */

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *  get:
 *   summary: Get A Task
 *   tags: [Task]
 *   security:
 *       - TokenAuth: [] 
 *   parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to retrieve.
 *         schema:
 *           type: string
 
 * 
 *   responses:
 *     200:
 *       description: Task Successfully Created
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Task_saved'
 *     400:
 *       description: Bad Request
 *     498:
 *       description: User Not Authorised
 *     500: 
 *       description: Internal server error
 *     404:
 *       description: Not Found
 */

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *  put:
 *   summary: update A Task
 *   tags: [Task]
 *   security:
 *       - TokenAuth: [] 
 *   parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to retrieve.
 *         schema:
 *           type: string
 *   requestBody:
 *    required: false
 *    content:
 *     application/json:
 *       schema:
 *        $ref: '#/components/schemas/Task_update'
 
 * 
 *   responses:
 *     200:
 *       description: Task Successfully Created
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Task_saved'
 *     400:
 *       description: Bad Request
 *     498:
 *       description: User Not Authorised
 *     500: 
 *       description: Internal server error
 *     404:
 *       description: Not Found
 */

/**
 * @swagger
 * components:
 *  securitySchemes:
 *     TokenAuth:
 *       type: apiKey
 *       in: header
 *       name: x-access-token
 *       description: Enter your JWT token in the format 
 *  schemas:
 *   Task_update:
 *     type: object
 *     required:
 *      - title
 *      - description
 
 *     properties:
 *      title:
 *        type: string
 *        description: title of task
 * 
 *      assingedTo:
 *        type: string
 *        description: the assignt to id
 * 
 *      statusId:
 *        type: string
 *        description: status id of task
 
 *      priorityId:
 *        type: string
 *        description: proirtyId of task
 
 *      state:
 *        type: string
 *        description: state of task
 */


router.use(authorize)

router.post("/", creatTask);
router.put("/:id", updateTask);
router.get("/:id", getTask);
router.get("/", getTasks);


router.delete("/:id", deleteTask);



module.exports = router;
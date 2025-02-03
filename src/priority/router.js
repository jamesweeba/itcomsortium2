let router = require("express").Router();
let {createpriority,getPriority}=require("./controller");
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
 *   Priority:
 *     type: object
 *     required:
 *      - title
 *      - description
 
 *     properties:
 *      name:
 *        type: string
 *        description: name of priority
 * 
 */



/**
 * @swagger
 * /api/v1/priorities:
 *  post:
 *   summary: Create Priority
 *   tags: [Priority]
 *   security:
 *       - TokenAuth: [] 
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *        $ref: '#/components/schemas/Priority_request'
 * 
 *   responses:
 *     201:
 *       description: Priority Successfully Created
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Priority_response'
 *     400:
 *       description: Bad Request
 *     498:
 *       description: User Not Authorised
 *     500: 
 *       description: Internal server error
 */


/**
 * @swagger
 * /api/v1/priorities:
 *  get:
 *   summary: Fetch Priority
 *   tags: [priorities]
 *   security:
 *       - TokenAuth: [] 
 *   responses:
 *     200:
 *       description: success 
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Priority_response'
 *     400:
 *       description: Bad Request
 *     498:
 *       description: User Not Authorised
 *     500: 
 *       description: Internal server error
 */






/**
 * @swagger
 * components:
 *  schemas:
 *   Priority_request:
 *     type: object
 *     required:
 *      - title
 *      - description
 
 *     properties:
 *       name:
 *        type: string
 *        description: name of priority
 
 */


/**
 * @swagger
 * components:
 *  schemas:
 *  Priority_response:
 *     type: object
 *     required:
 *      - title
 *      - description
 
 *     properties:
 *       name:
 *        type: string
 *        description: name of priority
 *       id:
 *        type: string
 *        description: id of status
 
 */


router.use(authorize)
router.post("/",createpriority)
router.get("/",getPriority)


module.exports=router;
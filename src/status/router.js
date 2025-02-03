let router = require("express").Router();
let { status: taskStatus, getStatus } = require("./controller");
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
 *   Status:
 *     type: object
 *     required:
 *      - title
 *      - description
 
 *     properties:
 *      name:
 *        type: string
 *        description: name of status
 * 
 */



/**
 * @swagger
 * /api/v1/status:
 *  post:
 *   summary: Create Status
 *   tags: [Status]
 *   security:
 *       - TokenAuth: [] 
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *        $ref: '#/components/schemas/Status_request'
 * 
 *   responses:
 *     201:
 *       description: Task Successfully Created
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Status_response'
 *     400:
 *       description: Bad Request
 *     498:
 *       description: User Not Authorised
 *     500: 
 *       description: Internal server error
 */


/**
 * @swagger
 * /api/v1/status:
 *  get:
 *   summary: Fetch Status
 *   tags: [Status]
 *   security:
 *       - TokenAuth: [] 
 *   responses:
 *     200:
 *       description: success 
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Status_response'
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
 *   Status_request:
 *     type: object
 *     required:
 *      - title
 *      - description
 
 *     properties:
 *       name:
 *        type: string
 *        description: name of status
 
 */


/**
 * @swagger
 * components:
 *  schemas:
 *   Status_response:
 *     type: object
 *     required:
 *      - title
 *      - description
 
 *     properties:
 *       name:
 *        type: string
 *        description: name of status
 *       id:
 *        type: string
 *        description: id of status
 
 */



router.use(authorize)

router.post("/", taskStatus);
router.get("/", getStatus)

module.exports = router;
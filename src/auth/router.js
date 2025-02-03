
const router=require("express").Router();
const {createUser,login}=require("./controller");


/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: The Auth Api for Task Management
 */


/**
 * @swagger
 * components:
 *  schemas:
 *   Auth:
 *     type: object
 *     required:
 *      - username
 *      - password
 *      - firstName
 *      - lastName
 *     properties:
 *      username:
 *        type: string
 *        description: the  username or email of user 
 * 
 *      password:
 *        type: string
 *        description: the user password
 * 
 *      firstName:
 *        type: string
 *        description: the first name of user
 * 
 *      lastName:
 *        type: string
 *        description: the last name of user    
 */



/**
 * @swagger
 * components:
 *  schemas:
 *   Auth_Login:
 *     type: object
 *     required:
 *      - username
 *      - password
 *     properties:
 *      username:
 *        type: string
 *        description: the  username or email of user 
 * 
 *      password:
 *        type: string
 *        description: the user password  
 */




/**
 * @swagger
 * /api/v1/auth/signup:
 *  post:
 *   summary: Signup User
 *   tags: [auth]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *        $ref: '#/components/schemas/Auth'
 * 
 *   responses:
 *     201:
 *       description: Signup Successfully Created
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Auth'
 *     400:
 *       description: Bad Request
 *     409:
 *       description: Credentails Taken
 *     500: 
 *       description: Internal server error
 */
router.post("/signup",createUser);



/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *   summary: Login User
 *   tags: [auth]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *        $ref: '#/components/schemas/Auth_Login'
 * 
 *   responses:
 *     200:
 *       description: Login Successfull
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schemas/Auth_Login'
 *     404:
 *       description: Not Found
 *     400:
 *       description: Bad Request
 *     409:
 *       description: Credentails Taken
 *     500: 
 *       description: Internal server error
 */
router.post("/login",login)


module.exports=router;
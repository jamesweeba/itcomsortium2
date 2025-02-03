

let signupSchema = {
    type: 'object',
    properties: {
        username: { type: "string", format: "email" },
        password: { type: "string", minLength: 5 },
        firstName: { type: "string", minLength: 2 },
        lastName: { type: "string", minLength: 2 }
    },
    additionalProperties: false,
    required: ['username',"password","firstName","lastName"]
}


let loginSchema={
    type: 'object',
    properties: {
        username: { type: "string", format: "email" },
        password: { type: "string", minLength: 5 },
    
    },
    additionalProperties: false,
    required: ['username',"password"]

}

module.exports = {
    signupSchema,
    loginSchema
}


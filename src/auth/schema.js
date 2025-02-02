

let signupSchema = {
    type: 'object',
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 5 },
        firstName: { type: "string", minLength: 2 },
        lastName: { type: "string", minLength: 2 }
    },
    additionalProperties: false,
    required: ['email',"password","firstName","lastName"]
}


let loginSchema={
    type: 'object',
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 5 },
    
    },
    additionalProperties: false,
    required: ['email',"password"]

}

module.exports = {
    signupSchema,
    loginSchema
}


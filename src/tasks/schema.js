

let taskSchema = {
    type: 'object',
    properties: {
        title: { type: "string", minLength: 5 },
        description: { type: "string", minLength: 5 },
    },
    additionalProperties: false,
    required: ['description', "title"]
}

let taskSearchSchema = {
    type: 'object',
    properties: {
        title: { type: "string", minLength: 2 },
        status: { type: "string", minLength: 2 },
        priority: { type: "string", minLength: 2 },
    },
    additionalProperties: true,
}
let aTaskSchema = {
        type: 'object',
        properties: {
            id: { type: "string", minLength:36, maxLength:36 },
        },
        additionalProperties: false,
    

}

let updateSchema={
    type: 'object',
    properties: {
        id: { type: "string", minLength: 36,maxLength:36 },
        assingedTo: { type: "string", minLength: 1 },
        title: { type: "string", minLength: 2 },
        statusId: { type: "string",  minLength: 36,maxLength:36 },
        priorityId: { type: "string",  minLength: 36,maxLength:36 },
        state: { type: "string", minLength: 1 },
        description: { type: "string", minLength: 2 },
    },
    additionalProperties: false,

}


module.exports = {
    taskSchema,
    taskSearchSchema,
    aTaskSchema,
    updateSchema

}


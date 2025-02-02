

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
/*
{ id: '1188745e-974b-45fe-9c5d-67dafa129586',
  assingedTo: '3',
  title: 'go to schoo1l',
  statusId: 'a049080e-5173-485d-b44b-166dc1046da9',
  priorityId: '3adffdca-75d6-4335-a615-163571ffe87a',
  state: 'A',
  description: 'ppp' }
        console.log("mmmmmmmmmmmmmmmmmmmm")


*/

module.exports = {
    taskSchema,
    taskSearchSchema,
    aTaskSchema,
    updateSchema

}


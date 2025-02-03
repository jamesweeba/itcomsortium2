let statusSchema={
    type: 'object',
    properties: {
        name: { type: "string", minLength: 5 },
    },
    additionalProperties: false,
    required: ["name"]

}

module.exports={
    statusSchema
}
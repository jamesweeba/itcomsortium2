
let jwt = require("jsonwebtoken");
let{jwtSecret}=require("../config/config")
let mySecretKey = "a4";



function authorize(req, res, next) {
    return new Promise(async (resolve, reject) => {
        try {
            let token = req.headers['x-access-token'];
            if (!token) {
                return res.status(498).json({ statusCode: 498, message: 'User Not Authorized' });
            }
            let decoded = await verifyToken(token);
            req.user = decoded;
            next()
            //req.user = user;

        } catch (err) {
            return res.status(err.statusCode).json(err);

        }


    })
}


function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err, res) => {
            if (err) {
                console.log(err)
                return reject({ statusCode: 498, message: 'User Not Authorized' })
            }
            console.log(res)
            return resolve(res)

        });



    })

}

module.exports = {
    authorize
}
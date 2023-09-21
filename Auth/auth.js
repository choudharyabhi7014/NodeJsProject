const UserData = require('../Model/userModel')
const jwt = require('jsonwebtoken')
const secret_key = "My name Abhishek"
exports.auth = (req, res, next) => {
    const auth = req.get('Authorization')
    // console.log(auth)
    if (!auth) {
        return res.status(401).json({
            message: 'No token provided'
        })
    } else {
        jwt.verify(auth, secret_key, function (err, data) {
            // console.log("token", data);
            if (data == null || err != null) {
                console.log(data)
                return res.sendStatus(503)
            }
            if (!UserData.findById(data.userId)) {
                return res.sendStatus(503)
            }
            req.user = data.userId;
            next();
        });
    };

}


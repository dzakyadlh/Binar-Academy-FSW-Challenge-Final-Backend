const {user} = require("../models")

const format = (User) => {
    const {id, email} = User;

    return {
        id,
        email,
        token: User.generateToken()
    }
}

exports.register = (req, res) => {
    user.register(req.body)
    .then((data) => {        
        res.json({ status:"Register Success", data: data});
    })
    .catch((err) => {
        res.status(500).json({status: "Register Failed", msg: err})
    })
}

exports.login = (req, res) => {
    try{
    user.authentication(req.body)
    .then((data) => {
        res.json({ status:"Login Success", data: format(data)});
    })
    .catch((err) => {
        res.status(400).json({status: "Login Failed", msg: err})
    })
    } catch (err) {
        res.status(500).json({status: "Login Failed", msg: err.message})
    }
}
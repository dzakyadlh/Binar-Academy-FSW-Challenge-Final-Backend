const {user} = require("../models")

const format = (User) => {
    const {id, username, email} = User;

    return {
        id,
        username,
        email,
        token: User.generateToken()
    }
}

exports.register = (req, res) => {
    try {
    user.register(req.body)
    .then((data) => {        
        res.json({ status:"Register Success", data: data});
    })
    .catch((err) => {
        res.status(400).json({status: "Register Failed", msg: err})
    })
    } catch (err) {
        res.status(500).json({status: "Register Failed", msg: err})
    }
}

exports.login = (req, res) => {
    try{
    user.authentication(req.body)
    .then((data) => {
        res.json({ status:"Login Success", data: format(data)});
    })
    .catch((err) => {
        console.log(err)
        res.status(401).json({status: "Login Failed", msg: err})
    })
    } catch (err) {
        res.status(500).json({status: "Login Failed", msg: err.message})
    }
}

exports.forgotpassword = (req, res) => {
    try {
    user.forgotpass(req.body).then(() => {
        res.json({message: "Update Success"});
    })
    .catch((err)=> {
        res.status(400).json({message: "Update failed", msg: err});
    })
    } catch (err) {
        res.status(500).json({message: "Update failed", msg: err});
    }
}
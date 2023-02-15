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
    try {
    user.register(req.body)
    .then((data) => {        
        res.json({ status:"Register Success", data: data});
    })
    .catch((err) => {
        res.status(409).json({status: "Register Failed", msg: err})
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
        res.status(401).json({status: "Login Failed", msg: err})
    })
    } catch (err) {
        res.status(500).json({status: "Login Failed", msg: err.message})
    }
}

exports.showAll = (req, res) => {
    try{
    user.findAll().then((data) => {
        res.json({status: "Successfully Show All Data", data: data});
    }).catch((err) => {
        res.status(400).json({status: "Failed Show Data", msg: err});
    })
    } catch (err) {
        res.status(500).json({status: "Failed Show Data", msg: err});
    }
}

exports.findId = (req, res) => {
    try{
    const {id} = req.params;

    user.findOne({where: { id: id }}).then((user) => {
        res.json({message: "User found", data: user});
    }).catch((err) => {
        res.status(400).json({status: "Failed Show Data", msg: err});
    })
    } catch (err) {
        res.status(500).json({status: "Failed Show Data", msg: err});
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

exports.deleteacc = (req, res) => {
    try {
    user.deleteacc(req.body).then(() => {
        res.json({message: "Delete Success"});
    })
    .catch((err)=> {
        res.status(400).json({message: "Delete failed", msg: err});
    })
    } catch (err) {
        res.status(500).json({message: "Delete failed", msg: err});
    }
}
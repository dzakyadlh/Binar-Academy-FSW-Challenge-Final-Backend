const {user} = require("../models")

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
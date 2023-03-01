const {user} = require("../models");
const { all } = require("../routes");

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
        const User = req.user.username;
        user.destroy({where: {username: User}})
        .then(() => {
            res.json({message: "Delete Success"});
        })
        .catch((err)=> {
            res.status(400).json({message: "Delete failed", msg: err});
        })
    } catch (err) {
        res.status(500).json({message: "Delete failed", msg: err});
    }
}

exports.userUpdate = (req, res) => {
    try {
        user.userUpdate(req.user, req.body)
        .then((data) => {
            res.json({message: "Update Success", data: data});
        })
        .catch((err)=> {
            res.status(400).json({message: "Update failed", msg: err});
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Update failed", msg: err});
    }
}
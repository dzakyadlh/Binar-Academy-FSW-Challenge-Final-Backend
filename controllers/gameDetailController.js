const { GameDetail } = require("../models");

exports.get = (req, res) => {
  GameDetail.findAll().then((result) => {
    res.json({ status: "Fetch success", result });
  });
};

exports.createGameDetail = (req, res) => {
  GameDetail.createGameDetail(req.body)
    .then((data) => {
      res.json({ status: "Create game success", data });
    })
    .catch((err) => {
      res.status(500).json({ status: "Create game failed", msg: err });
    });
};

exports.updateGameDetail = (req, res) => {
  GameDetail.updateGameDetail(req.body)
    .then((data) => {
      res.json({ message: "Update game detail success", data });
    })
    .catch((err) => {
      res.status(400).json({ status: "Update game detail failed", msg: err });
    });
};

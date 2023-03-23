const { GameList } = require("../models");

exports.get = (req, res) => {
  GameList.findAll({}).then((result) => {
    res.status(200).json({ status: "Fetch success", result });
  });
};

exports.getDetail = (req, res) => {
  const gameId = req.params.id;

  GameList.findOne({
    where: {
      id: gameId,
    },
    attributes: ["name", "image", "detail", "video"],
  }).then((result) => {
    if (result) {
      res.status(200).json({ status: "Fetch success", result });
    } else {
      res.status(404).json({ status: "Game not found" });
    }
  });
};

exports.createGame = (req, res) => {
  GameList.createGame(req.body)
    .then((data) => {
      res.status(200).json({ status: "Create game success", data });
    })
    .catch((err) => {
      res.status(500).json({ status: "Create game failed", msg: err });
    });
};

exports.updateGame = (req, res) => {
  GameList.updateGame(req.body)
    .then((data) => {
      res.status(200).json({ message: "Update game success", data });
    })
    .catch((err) => {
      res.status(400).json({ status: "Update game failed", msg: err });
    });
};

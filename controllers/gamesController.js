const { GameList } = require("../models");

exports.get = (req, res) => {
  GameList.findAll({
    // include: [
    //   {
    //     model: GameDetail,
    //     as: "game_detail",
    //     attributes: { exclude: ["id", "name", "game_id"] },
    //   },
    // ],
  }).then((result) => {
    res.json({ status: "Fetch success", result });
  });
};

exports.getDetail = (req, res) => {
  GameList.findAll({
    exclude: [
      "id",
      "name",
      "genre",
      "image",
      "game_id",
      "createdAt",
      "updatedAt",
    ],
  }).then((result) => {
    res.json({ status: "Fetch success", result });
  });
};

exports.createGame = (req, res) => {
  GameList.createGame(req.body)
    .then((data) => {
      res.json({ status: "Create game success", data });
    })
    .catch((err) => {
      res.status(500).json({ status: "Create game failed", msg: err });
    });
};

exports.updateGame = (req, res) => {
  GameList.updateGame(req.body)
    .then((data) => {
      res.json({ message: "Update game success", data });
    })
    .catch((err) => {
      res.status(400).json({ status: "Update game failed", msg: err });
    });
};

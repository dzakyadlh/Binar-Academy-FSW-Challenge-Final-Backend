const { GameList } = require("../models");

exports.get = (req, res) => {
  try {
    GameList.findAll({}).then((result) => {
      res.status(200).json({ status: "Fetch success", result });
    });
  } catch (err) {
    res.status(500).json({ status: "Fetch data failed", msg: err });
  }
};

exports.getDetail = (req, res) => {
  try {
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
        res
          .status(400)
          .json({
            status: "Fetch failed",
            msg: `Game with id: ${gameId} is not exist`,
          });
      }
    });
  } catch (err) {
    res.status(500).json({ status: "Fetch data failed", msg: err });
  }
};

exports.createGame = (req, res) => {
  try {
    GameList.createGame(req.body)
      .then((data) => {
        res.status(200).json({ status: "Create game success", data });
      })
      .catch((err) => {
        res.status(400).json({ status: "Create game failed", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Create game failed", msg: err });
  }
};

exports.updateGame = (req, res) => {
  try {
    GameList.updateGame(req.body)
      .then((data) => {
        res.status(200).json({ message: "Update game success", data });
      })
      .catch((err) => {
        res.status(400).json({ status: "Update game failed", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Update game failed", msg: err });
  }
};

exports.deleteGame = (req, res) => {
  try {
    GameList.deleteGame({ id: req.params.id })
      .then((data) => {
        res.status(200).json({ message: "Game deleted", data });
      })
      .catch((err) => {
        res.status(400).json({ status: "Delete game failed", msg: err });
      });
  } catch (err) {
    res.status(500).json({ status: "Delete game failed", msg: err });
  }
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GameList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.GameList.hasOne(models.GameDetail, {
        foreignKey: "game_id",
        as: "game_detail",
      });
    }

    static createGame = ({ name, genre, image }) => {
      return this.create({ name, genre, image });
    };

    static updateGame = async ({ id, name, genre, image }) => {
      const game = await this.findOne({ where: { id } });
      game.update({ name, genre, image });
      return game;
    };
  }
  GameList.init(
    {
      name: DataTypes.STRING,
      genre: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "GameList",
    }
  );
  return GameList;
};

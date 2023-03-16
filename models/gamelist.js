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
    }

    static createGame = ({ name, genre, image, detail }) => {
      return this.create({ name, genre, image, detail });
    };

    static updateGame = async ({ id, name, image, detail }) => {
      const game = await this.findOne({ where: { id } });
      game.update({
        ...(name && { name }),
        ...(image && { image }),
        ...(detail && { detail }),
      });
      return game;
    };
  }
  GameList.init(
    {
      name: DataTypes.STRING,
      genre: DataTypes.STRING,
      image: DataTypes.STRING,
      detail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "GameList",
    }
  );
  return GameList;
};

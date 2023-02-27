"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GameDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.GameDetail.belongsTo(models.GameList, {
        foreignKey: "game_id",
        as: "game_detail",
      });
    }

    static createGameDetail = ({ name, detail, game_id }) => {
      return this.create({ name, detail, game_id });
    };

    static updateGameDetail = async ({ id, name, detail }) => {
      const game = await this.findOne({ where: { id } });
      game.update({ name, detail });
      return game;
    };
  }
  GameDetail.init(
    {
      name: DataTypes.STRING,
      detail: DataTypes.STRING,
      game_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "GameDetail",
    }
  );
  return GameDetail;
};

'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static #encrypt = (password) => bcrypt.hashSync(password, 10);

    static register = async ({username, email, password}) => {
      const encryptedPassword = this.#encrypt(password);

      const isUserExist = await this.findOne({where: {username: username}})
      const isEmailExist = await this.findOne({where: {email: email}})

      if (!isUserExist){
        if (!isEmailExist){
        return this.create({
          username,
          email,
          password: encryptedPassword
        })
        }else {
        return Promise.reject("Email Exist");
        }
      } else {
        return Promise.reject("Username Exist");
      }
    }

    checkPassword = (password) => bcrypt.compareSync(password, this.password);

    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username
      }

      const secret = "This is my secret"
      const token = jwt.sign(payload, secret)

      return token;
    }

    static authentication = async({user, password}) => {
      try {
        const isUserExist = await this.findOne({where: {username: user}})
        const isEmailExist = await this.findOne({where: {email: user}})
        if (!isUserExist) {
          if (isEmailExist) {
            const isPassValid = isEmailExist.checkPassword(password);
            if (!isPassValid) 
            return Promise.reject("Wrong Password");
            return Promise.resolve(isEmailExist);
          } else {
            return Promise.reject("username or email not found");
          }
        } else {
          const isPassValid = isUserExist.checkPassword(password);
            if (!isPassValid) 
            return Promise.reject("Wrong Password");
            return Promise.resolve(isUserExist);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    }

    static forgotpass = async({email, password}) => {
      const encryptedPass = this.#encrypt(password);
      const EmailExist = await this.findOne({where: {email: email}})
      if (!EmailExist) {
        return Promise.reject("Email Not Found!");
      } else {
        return this.update({
          password: encryptedPass
        }, {where: {email: email}})
      }
    }

    static deleteacc = async({password}) => {
    try {
      const User = req.user;

      const isPassValid = User.checkPassword(password);
      if (!isPassValid) return Promise.reject("Wrong Password");
      return this.destroy({where: {User}})
    } catch (err) {
      return Promise.reject(err);
    }}
}
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
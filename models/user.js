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

      if(username==="") return Promise.reject("Fill username first");
      if(password==="") return Promise.reject("Fill password first");
      if(email==="") return Promise.reject("Fill email first");

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

    static userUpdate = async({username},{NewUsername, NewEmail, OldPassword, NewPassword}) => {
      const isUserExist = await this.findOne({where: {username: username}})
      const isPassValid = isUserExist.checkPassword(OldPassword);
      const isUsernameExist = await this.findOne({where: {username: NewUsername}})
      const isEmailExist = await this.findOne({where: {email: NewEmail}})

      if(NewUsername=="") return Promise.reject("Please fill the username")
      if(NewEmail=="") return Promise.reject("Please fill the email")

      if (NewPassword == ""){
        const encryptedPass = this.#encrypt(OldPassword);
        if (!isUsernameExist){
          if (!isEmailExist){
            if (!isUserExist) {
              return Promise.reject("User Not Found!");
            } else {
              if (!isPassValid) {
                return Promise.reject("Wrong Password");
              } else {
                this.update({
                  username: NewUsername,
                  email: NewEmail,
                  password: encryptedPass
                }, {where: {username: username}})
                const NewUser = this.findOne({where: {username: NewUsername}})
                return Promise.resolve(NewUser)
              }
            }
          }else {
            if(isUserExist.email === NewEmail) {
              if (!isUserExist) {
                return Promise.reject("User Not Found!");
              } else {
                if (!isPassValid) {
                  return Promise.reject("Wrong Password");
                } else {
                  this.update({
                    username: NewUsername,
                    email: NewEmail,
                    password: encryptedPass
                  }, {where: {username: username}})
                  const NewUser = this.findOne({where: {username: NewUsername}})
                  return Promise.resolve(NewUser)
                }
              }
            } else {
              return Promise.reject("Your New Email is Already Exist");
            }
          }
        } else {
          if(isUserExist.username === NewUsername) {
            if (!isEmailExist){
              if (!isUserExist) {
                return Promise.reject("User Not Found!");
              } else {
                if (!isPassValid) {
                  return Promise.reject("Wrong Password");
                } else {
                  this.update({
                    username: NewUsername,
                    email: NewEmail,
                    password: encryptedPass
                  }, {where: {username: username}})
                  const NewUser = this.findOne({where: {username: NewUsername}})
                  return Promise.resolve(NewUser)
                }
              }
            }else {
              if(isUserExist.email === NewEmail) {
                if (!isUserExist) {
                  return Promise.reject("User Not Found!");
                } else {
                  if (!isPassValid) {
                    return Promise.reject("Wrong Password");
                  } else {
                    this.update({
                      username: NewUsername,
                      email: NewEmail,
                      password: encryptedPass
                    }, {where: {username: username}})
                    const NewUser = this.findOne({where: {username: NewUsername}})
                    return Promise.resolve(NewUser)
                  }
                }
              } else {
                return Promise.reject("Your New Email is Already Exist");
              }
            }
          } else {
            return Promise.reject("Your New Username is Already Exist");
          }
        }
      } else {
        const encryptedPass = this.#encrypt(NewPassword);
        if (!isUsernameExist){
          if (!isEmailExist){
            if (!isUserExist) {
              return Promise.reject("User Not Found!");
            } else {
              if (!isPassValid) {
                return Promise.reject("Wrong Password");
              } else {
                this.update({
                  username: NewUsername,
                  email: NewEmail,
                  password: encryptedPass
                }, {where: {username: username}})
                const NewUser = this.findOne({where: {username: NewUsername}})
                return Promise.resolve(NewUser)
              }
            }
          }else {
            if(isUserExist.email === NewEmail) {
              if (!isUserExist) {
                return Promise.reject("User Not Found!");
              } else {
                if (!isPassValid) {
                  return Promise.reject("Wrong Password");
                } else {
                  this.update({
                    username: NewUsername,
                    email: NewEmail,
                    password: encryptedPass
                  }, {where: {username: username}})
                  const NewUser = this.findOne({where: {username: NewUsername}})
                  return Promise.resolve(NewUser)
                }
              }
            } else {
              return Promise.reject("Your New Email is Already Exist");
            }
          }
        } else {
          if(isUserExist.username === NewUsername) {
            if (!isEmailExist){
              if (!isUserExist) {
                return Promise.reject("User Not Found!");
              } else {
                if (!isPassValid) {
                  return Promise.reject("Wrong Password");
                } else {
                  this.update({
                    username: NewUsername,
                    email: NewEmail,
                    password: encryptedPass
                  }, {where: {username: username}})
                  const NewUser = this.findOne({where: {username: NewUsername}})
                  return Promise.resolve(NewUser)
                }
              }
            }else {
              if(isUserExist.email === NewEmail) {
                if (!isUserExist) {
                  return Promise.reject("User Not Found!");
                } else {
                  if (!isPassValid) {
                    return Promise.reject("Wrong Password");
                  } else {
                    this.update({
                      username: NewUsername,
                      email: NewEmail,
                      password: encryptedPass
                    }, {where: {username: username}})
                    const NewUser = this.findOne({where: {username: NewUsername}})
                    return Promise.resolve(NewUser)
                  }
                }
              } else {
                return Promise.reject("Your New Email is Already Exist");
              }
            }
          } else {
            return Promise.reject("Your New Username is Already Exist");
          }
        }
      }
    }
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
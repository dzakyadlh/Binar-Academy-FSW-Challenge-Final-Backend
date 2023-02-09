const passport = require("passport");
const {user} = require("../models")
const {Strategy: JwtStrategy, ExtractJwt} = require("passport-jwt");

const options = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: "This is my secret",
}

passport.use(
    new JwtStrategy(options, async(payload, done) => {
        user.findByPk(payload.id)
        .then((user) => done(null, user))
        .catch((err) => done(err, false))
    }))

module.exports = passport;
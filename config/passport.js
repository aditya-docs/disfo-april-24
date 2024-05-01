const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const secret = process.env.JWT_SECRET_KEY;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const strategy = new JWTStrategy(options, async (payload, done) => {
  try {
    const user = await UserServiceInstance.findById(payload.userId);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

const configureStrategy = (passport) => {
  passport.use(strategy);
};

module.exports = configureStrategy;

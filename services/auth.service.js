const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("./user.service");

const UserServiceInstance = new UserService();

class AuthService {
  signup = async (user) => {
    try {
      const hashedPassword = await this.encryptPassword(user.password);
      const result = await UserServiceInstance.register({
        ...user,
        password: hashedPassword,
      });
      return result;
    } catch (error) {
      throw error;
    }
  };
  login = async (user) => {
    try {
      const userObj = await UserServiceInstance.findByUsername(user.username);
      if (userObj === null) return { isLoggedIn: false };
      const { password: hashedPassword, _id } = userObj;
      return {
        isLoggedIn: await this.comparePassword(user.password, hashedPassword),
        userId: _id,
        token: await this.generateToken({ userId: _id }),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
  comparePassword = async (password, hashedPassword) => {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.log(error);
    }
  };
  generateToken = async (payload) =>
    await jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "30s" });
}

module.exports = AuthService;

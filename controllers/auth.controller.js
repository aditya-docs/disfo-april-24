const AuthService = require("../services/auth.service")

const authServiceInstance = new AuthService()

const postSignUp = async (req, res) => {
    try {
        const result = await authServiceInstance.signup(req.body)
        return res.status(201).json(result)
    } catch (error) {
        if(error?.code === 11000)
            return res.status(400).json({message: `A user with this ${Object.keys(error.keyValue)[0]} already exists. Please login instead`})
        return res.status(500).json({message: "Something went wrong!", error})
    }
}

const postLogin = async (req, res) => {
    try {
        const {userId, token, isLoggedIn} = await authServiceInstance.login(req.body)
        if(isLoggedIn){
            res.cookie("token", token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                secure: true
            });
            return res.status(200).json({token, userId})
        }
        return res.status(401).json({message: "Please check the username or password"})
    } catch (error) {
        return res.status(500).json({message: "Something went wrong!", error})
    }
}

module.exports = {postSignUp, postLogin}
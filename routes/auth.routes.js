const router = require("express").Router();
const {
    postSignUp,
    postLogin
} = require("../controllers/auth.controller");
const { userValidationSchema, loginBodyValidationSchema } = require("../validations/user.validator");
const { validateSchema } = require("../middlewares/validate.middleware");

const validateSignup = validateSchema(userValidationSchema);
const validateLogin = validateSchema(loginBodyValidationSchema);

router.post("/signup", validateSignup, postSignUp)
router.post("/login", validateLogin, postLogin)

module.exports = router
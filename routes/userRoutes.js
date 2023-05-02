const { sendEmail } = require("../controller/MailController");
const { register, login, getUser, getUserName, setAvatar, changePass } = require("../controller/userController");

const router = require("express").Router();

router.post("/register",register);
router.post("/login",login);
router.post("/changepassword",changePass);
router.get("/users/:id",getUser);
router.get("/user/:username",getUserName);
router.post("/setAvatar/:id",setAvatar);
router.post("/mail",sendEmail);

module.exports = router;
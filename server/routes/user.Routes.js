const express = require("express");
const { getUsersHandler, loginUserHandler, registerUserHandler, getUserHandler } = require("../controllers/user.Controller.js");
const { verifyToken, logRequests } = require("../middlewares/authorization.js");

const router = express.Router();

router.use(logRequests);

router.get("/usuarios", verifyToken, getUserHandler);
router.post("/login", loginUserHandler);
router.post("/usuarios", registerUserHandler);

module.exports = router;

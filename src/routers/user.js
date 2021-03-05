const express = require('express');

const router = express.Router();
const {addNewUser , displayAllUser , displayUserById , updateUserById , deleteUserById , userLogin }  = require('./user-route-functions');

router.post("/user", addNewUser);
router.get("/users", displayAllUser);
router.get("/users/:id", displayUserById );
router.patch("/users/:id", updateUserById);
router.delete("/users/:id", deleteUserById);
router.post("/users/login", userLogin);

module.exports = router;
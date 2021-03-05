const express = require('express');
const router = express.Router();
const { insertTask , displayAllTask , displayTaskById , updateTask , deleteTask} = require('./task-route-functions.js');

router.post("/task", insertTask );
router.get("/tasks", displayAllTask );
router.get("/tasks/:id", displayTaskById);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
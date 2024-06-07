const express = require("express");
const router = express();
const userVerifyToken = require("../helpers/jwt").verifyTokenUser;

/**
 * IMPORT CONTROLLER
 */
const {
  addTodo,
  listTodo,
  deleteTodo,
  updateTodo,
} = require("../controller/todoController/index");

/**
 * ADD Todo
 */
router.post("/", userVerifyToken, async (req, res) => {
  try {
    var ctrlResponse = await addTodo.add(req);
    res.status(ctrlResponse.code).send(ctrlResponse);
  } catch (err) {

    console.log(err);

    res.send(err);
  }
});

/**
 * LIST OF TodoS
 */
router.get("/", userVerifyToken, async (req, res) => {
  try {
    var ctrlResponse = await listTodo.list(req);
    res.send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});

/**
 * UPDATE Todo
 */
router.put("/:id", userVerifyToken, async (req, res) => {
  try {
    var ctrlResponse = await updateTodo.update(req);
    res.send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});

/**
 * DELETE Todo
 */
router.delete("/:id", userVerifyToken, async (req, res) => {
  try {
    var ctrlResponse = await deleteTodo.delete(req);
    res.send(ctrlResponse);
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;

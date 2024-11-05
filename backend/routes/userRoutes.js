/**
 * User Routes:
 * Entry points that specify how incoming requests related to user
 * accounts should be handled.
 */
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User account management routes
router.get("/:userId", userController.getUser);
router.put("/update/:userId", userController.updateUser);
router.delete("/delete/:userId", userController.deleteUser);

module.exports = router;

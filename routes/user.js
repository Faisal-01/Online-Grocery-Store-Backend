const express = require("express");
const router = express.Router();

const {getAllUsers, getUser, getUserFromToken, updateUser, deleteUser, searchUser} = require("../controllers/user")

router.get('/', getAllUsers);
router.post('/search', searchUser);
router.get("/token", getUserFromToken);
router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

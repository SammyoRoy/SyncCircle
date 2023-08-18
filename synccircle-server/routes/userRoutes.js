const express = require('express');
const router = express.Router();

const {
    getUsers,
    addUser,
    deleteUser,
    getUser,
    bookSlot,
    unbookSlot,
    massChangeSlot
} = require('../controllers/userController');

router.route('/:groupid').get(getUsers).post(addUser);

router.route('/:groupid/:userid').get(getUser).delete(deleteUser);

router.route('/book/:groupid/:userid').post(bookSlot);

router.route('/unbook/:groupid/:userid').post(unbookSlot);

router.route('/massbook/:groupid/:userid').post(massChangeSlot);







module.exports = router;
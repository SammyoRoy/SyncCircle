const express = require('express');
const router = express.Router();

const {
    getAuthUsers,
    getAuthUserById,
    createAuthUser,
    updateAuthUser,
    deleteAuthUser,
    addGroupToUser,
    removeGroupFromUser,
    getGroupsOfUser
} = require('../controllers/authUserController');

router.route('/').get(getAuthUsers).post(createAuthUser);

router.route('/:email').get(getAuthUserById).put(updateAuthUser).delete(deleteAuthUser);

router.route('/groups/:email').get(getGroupsOfUser).put(addGroupToUser);

router.route('/removegroup/:email').put(removeGroupFromUser);

module.exports = router;
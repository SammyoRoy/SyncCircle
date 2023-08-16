const express = require('express');
const router = express.Router();

const {
    getGroups,
    getGroupById,
    createGroup,
    deleteGroup,
    displayGroup,
    numberOfMembers,
    allMembers,
    findMember,
    slot,
    slotSize
} = require('../controllers/groupController');

router.route('/').get(getGroups).post(createGroup);

router.route('/:groupId').get(getGroupById).delete(deleteGroup);
 

router.route('/display/:groupId').get(displayGroup);

router.route('/nummem/:groupId').get(numberOfMembers);

router.route('/allmem/:groupId').get(allMembers);

router.route('/findmem/:groupId').get(findMember);

router.route('/slot/:groupId').get(slot);

router.route('/slot/size/:groupId').get(slotSize);


module.exports = router;


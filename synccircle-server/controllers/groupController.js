const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const Group = require('../models/groupModel');

// @desc    Fetch all groups
// @route   GET /groups
// @access  Public
const getGroups = asyncHandler(async (req, res) => {
    const groups = await Group.find({});
    res.json(groups);
});

// @desc    Fetch single group
// @route   GET /groups/:groupId
// @access  Public
const getGroupById = asyncHandler(async (req, res) => {
    const group = await Group.findOne({ group_id: req.params.groupId });
    if (group) {
        res.json(group);
    }
    else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc    Create a group
// @route   POST /groups
// @access  Public
const createGroup = asyncHandler(async (req, res) => {
    const {name, startTime, endTime, days} = req.body;
    const days_array = days.split(',');
    const groupId = uuidv4();
    const users = [];
    const start = moment(startTime, 'h:mm a');
    const end = moment(endTime, 'h:mm a');
    let hours = Math.abs(end.diff(start, 'hours'));
    if (end.isBefore(start)) {
        hours = 24 - hours;
    }
    const master_array = Array(hours+1).fill().map(() => Array(days_array.length).fill([]));
    const group = new Group({
        group_id: groupId,
        group_name: name,
        start_time: start._i,
        end_time: end._i,
        days: days_array,
        users: users,
        master_array: master_array
    });
    const createdGroup = await group.save();
    res.status(201).json(createdGroup);
});

// @desc    Delete a group
// @route   DELETE groups/:groupId
// @access  Public
const deleteGroup = asyncHandler(async (req, res) => {
    const group = await Group.findOne({ group_id: req.params.groupId });
    if (group) {
        await Group.deleteOne({ group_id: req.params.groupId });
        res.json({ message: 'Group removed' });
    }
    else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc Display the master array of a group
// @route GET groups/display/:groupId
// @access Public
const displayGroup = asyncHandler(async (req, res) => {
    const group = await Group.findOne({ group_id: req.params.groupId });
    if (group) {
        res.json(group.master_array);
    }
    else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc Display the number of members in a group
// @route GET groups/nummem/:groupId
// @access Public
const numberOfMembers = asyncHandler(async (req, res) => {
    const group = await Group.findOne({ group_id: req.params.groupId });
    if (group) {
        res.json(group.users.length);
    }
    else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc Display the names of all members in a group
// @route GET groups/allmem/:groupId
// @access Public
const allMembers = asyncHandler(async (req, res) => {
    const group = await Group.findOne({ group_id: req.params.groupId });
    if (group) {
        const userNames = group.users.map(user => user.user_name);
        res.json(userNames);
    }
    else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc Display the id of a member in a group
// @route GET groups/findmem/:groupId
// @access Public
const findMember = asyncHandler(async (req, res) => {
    const group = await Group.findOne({ group_id: req.params.groupId });
    const userName = req.query.userName;
    if (group) {
        const user = group.users.find(user => user.user_name === userName);
        if (user) {
            res.status(200).json({user_id: user.user_id, users: group.users });
        }
        else {
            res.json("False");
        }
    }
    else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc Display a slot
// @route GET groups/slot/:groupId
// @access Public
const slot = asyncHandler(async (req, res) => {
    const group = await Group.findOne({ group_id: req.params.groupId });
    const row = parseInt(req.query.row, 10);
    const col = parseInt(req.query.col, 10);
    if (group) {
        const slot = group.master_array[row][col];
        res.json(slot);
    }
    else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc Display the size of a slot
// @route GET groups/slotsize/:groupId
// @access Public
const slotSize = asyncHandler(async (req, res) => {
    const group = await Group.findOne({ group_id: req.params.groupId });
    const row = parseInt(req.query.row, 10);
    const col = parseInt(req.query.col, 10);
    if (group) {
        const slot = group.master_array[row][col];
        res.json(slot.length);
    }
    else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc   Update Name of Group
// @route  POST /groups/:groupid
// @access Public
const updateName = asyncHandler(async (req, res) => {
    const {name} = req.body;

    const group = await Group.findOneAndUpdate({ group_id: req.params.groupId }, { group_name: name }, { new: true });

    if (group) {
        res.status(200).json({ success: true, group: group });
    }
    else {
        res.status(404);
        throw new Error('Group not found');
    }
});

module.exports = {
    getGroups,
    getGroupById,
    createGroup,
    deleteGroup,
    displayGroup,
    numberOfMembers,
    allMembers,
    findMember,
    slot,
    slotSize,
    updateName
}


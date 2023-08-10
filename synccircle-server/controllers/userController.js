const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const Group = require('../models/groupModel');

// @desc   Fetch all users
// @route  GET /users/:groupid/
// @access Public
const getUsers = asyncHandler(async (req, res) => {
    const group = await Group.findOne({ group_id: req.params.groupid });

    if (group) {
        res.json(group.users);
    }
    else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc   Add a user to a group
// @route  POST /users/:groupid
// @access Public
const addUser = asyncHandler(async (req, res) => {
    const { name, startTime, endTime, days } = req.body;
    const groupId = req.params.groupid;
    const userId = uuidv4();
    const start = moment(startTime, 'h:mm a');
    const end = moment(endTime, 'h:mm a');
    let hours = Math.abs(end.diff(start, 'hours'));
    if (end.isBefore(start)) {
        hours = 24 - hours;
    }
    const availability_array = Array(days.length).fill().map(() => Array(hours + 1).fill(0));
    const user = {
        user_id: userId,
        user_name: name,
        availability_array: availability_array
    };
    const updatedGroup = await Group.findOneAndUpdate(
        { group_id: groupId },
        { $push: { users: user } },
        { new: true }
    );
    if (updatedGroup) {
        res.status(200).json({ success: true, user_id: userId });
    }
    else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc   Delete a user from a group
// @route  DELETE /users/:groupid/:userid
// @access Public
const deleteUser = asyncHandler(async (req, res) => {
    const groupId = req.params.groupid;
    const userId = req.params.userid;
    const updatedGroup = await Group.findOneAndUpdate(
        { group_id: groupId },
        { $pull: { users: { user_id: userId } } },
        { new: true }
    );
    if (updatedGroup) {
        res.status(200).json({ success: true });
    }
    else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc   Fetch a user from a group
// @route  GET /users/:groupid/:userid
// @access Public
const getUser = asyncHandler(async (req, res) => {
    const groupId = req.params.groupid;
    const userId = req.params.userid;

    const group = await Group.findOne({ group_id: groupId });

    if (group) {
        const user = group.users.find(user => user.user_id === userId);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404);
            throw new Error('User not found in group');
        }
    }
    else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc   Book a slot for a user
// @route  POST /users/book/:groupid/:userid
// @access Public
const bookSlot = asyncHandler(async (req, res) => {
    const groupId = req.params.groupid;
    const userId = req.params.userid;
    const row = req.body.row;
    const col = req.body.col;

    const group = await Group.findOne({ group_id: groupId });

    if (group) {
        const user = group.users.find(user => user.user_id === userId);
        if (user) {
            user.availability_array[row][col] = 1;
            group.master_array[row][col].push(user.user_name);
            group.markModified('master_array');
            group.markModified('users');
            await group.save();
            res.status(200).json({ message: 'Booking successful.'});
        }
        else {
            res.status(404);
            throw new Error('User not found in group');
        }
    }
    else {
        res.status(404);
        throw new Error('Group not found');
    }
});

// @desc   Unbook a slot for a user
// @route  POST /users/unbook/:groupid/:userid
// @access Public
const unbookSlot = asyncHandler(async (req, res) => {
    const groupId = req.params.groupid;
    const userId = req.params.userid;
    const row = req.body.row;
    const col = req.body.col;

    const group = await Group.findOne({ group_id: groupId });

    if (group) {
        const user = group.users.find(user => user.user_id === userId);
        if (user) {
            user.availability_array[row][col] = 0;
            group.master_array[row][col] = group.master_array[row][col].filter(name => name !== user.user_name);
            group.markModified('master_array');
            group.markModified('users');
            await group.save();
            res.status(200).json({ message: 'Unbooking successful.' });
        }
        else {
            res.status(404);
            throw new Error('User not found in group');
        }
    }
    else {
        res.status(404);
        throw new Error('Group not found');
    }
});

module.exports = { getUsers, addUser, deleteUser, getUser, bookSlot, unbookSlot };
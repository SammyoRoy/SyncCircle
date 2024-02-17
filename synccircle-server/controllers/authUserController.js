const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const authUser = require('../models/authUserModal');

// @desc    Fetch all users
// @route   GET /authUsers
// @access  Public
const getAuthUsers = asyncHandler(async (req, res) => {
    const authUsers = await authUser.find({});
    res.json(authUsers);
});

// @desc    Fetch single user
// @route   GET /authUsers/:email
// @access  Public
const getAuthUserById = asyncHandler(async (req, res) => {
    const user = await
    authUser.findOne({ email: req.params.email });
    if (user) {
        res.json(user);
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Create a user
// @route   POST /authUsers
// @access  Public
const createAuthUser = asyncHandler(async (req, res) => {
    const { email, photoUrl, login_type} = req.body;
    const user = new authUser({
        email: email,
        photoUrl: photoUrl,
        groups: [],
        login_type: login_type
    });
    const createdUser = await user.save();
    res.status(201).json(createdUser);
});

// @desc   Update a user
// @route  PUT /authUsers/:email
// @access Public
const updateAuthUser = asyncHandler(async (req, res) => {
    const user = await
    authUser.findOne({ email: req.params.email });
    if (user) {
        user.email = req.body.email || user.email;
        user.photoUrl = req.body.photoUrl || user.photoUrl;
        user.groups = req.body.groups || user.groups;
        user.login_type = req.body.login_type || user.login_type;
        const updatedUser = await user.save();
        res.json(updatedUser);
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Delete a user
// @route   DELETE /authUsers/:email
// @access  Public
const deleteAuthUser = asyncHandler(async (req, res) => {
    const user = await
    authUser.findOne({ email: req.params.email });
    if (user) {
        await authUser.deleteOne({ email: req.params.email });
        res.json({ message: 'User removed' });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});

//@desc Add a group to a user
//@route PUT /authUsers/groups/:email
//@access Public

const addGroupToUser = asyncHandler(async (req, res) => {
    const user = await
    authUser.findOne({ email: req.params.email });
    if (user) {
        user.groups.push(req.body.group);
        const updatedUser = await user.save();
        res.json(updatedUser);
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});

//@desc Remove a group from a user
//@route PUT /authUsers/removegroup/:email
//@access Public

const removeGroupFromUser = asyncHandler(async (req, res) => {
    const user = await
    authUser.findOne({ email: req.params.email });
    if (user) {
        user.groups = user.groups.filter(group => group !== req.body.group);
        const updatedUser = await user.save();
        res.json(updatedUser);
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});

//@desc Fetch all groups of a user
//@route GET /authUsers/groups/:email
//@access Public

const getGroupsOfUser = asyncHandler(async (req, res) => {
    const user = await
    authUser.findOne({ email: req.params.email });
    if (user) {
        res.json(user.groups);
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = { getAuthUsers, getAuthUserById, createAuthUser, updateAuthUser, deleteAuthUser, addGroupToUser, removeGroupFromUser, getGroupsOfUser };
const express = require('express');
const { getDb } = require('../db');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');


const router = express.Router();

router.get('/:groupid', (req, res) => {
    const db = getDb();
    const groupId = req.params.groupid;
    db.collection('Groups').findOne({ group_id: groupId }).then((group) => {
        if (group) {
            res.status(200).json(group.user_ids);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});

router.post('/:groupid', (req, res) => {
    const db = getDb();
    let name = req.body.name;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let days = req.body.days;
    days = days.split(',');

    const groupId = req.params.groupid;

    const userId = uuidv4();
    let start = moment(startTime, 'h:mm a');
    let end = moment(endTime, 'h:mm a');
    let hours = Math.abs(end.diff(start, 'hours'));
    if (end.isBefore(start)) {
        hours = 24 - hours;
    }

    let availability_array = Array(days.length).fill().map(() => Array(hours + 1).fill(0));

    db.collection('Users').insertOne({ user_id: userId, user_name: name, availability_array: availability_array })
        .then(() => {
            return db.collection('Groups').updateOne({ group_id: groupId }, { $push: { users: {user_id: userId, user_name: name, availability_array: availability_array} } })
        })
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

router.get('/:groupid/:userid', (req, res) => {
    const db = getDb();
    const groupId = req.params.groupid;
    const userId = req.params.userid;
    db.collection('Groups').findOne({ group_id: groupId }).then((group) => {
        if (group) {
            group.users.forEach((user) => {
                if (user.user_id === userId) {
                    res.status(200).json(user);
                }
            });
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});

router.post('/book/:groupid/:userid', (req, res) => {
    const db = getDb();
    const groupId = req.params.groupid;
    const userId = req.params.userid;
    const name = req.body.name;
    const row = req.body.row;
    const col = req.body.col;

    db.collection('Groups').findOne({ group_id: groupId }).then((group) => {
        if (group) {
            group.users.forEach((user) => {
                if (user.user_id === userId) {
                    user.availability_array[row][col] = 1;
                    group.master_array[row][col] += user.user_name;
                }
            });
            db.collection('Groups').updateOne({ group_id: groupId }, { $set: { users: group.users, master_array: group.master_array } });
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});

router.post('/unbook/:groupid/:userid', (req, res) => {
    const db = getDb();
    const groupId = req.params.groupid;
    const userId = req.params.userid;
    const name = req.body.name;
    const row = req.body.row;
    const col = req.body.col;

    db.collection('Groups').findOne({ group_id: groupId }).then((group) => {
        if (group) {
            group.users.forEach((user) => {
                if (user.user_id === userId) {
                    user.availability_array[row][col] = 0;
                    group.master_array[row][col] = group.master_array[row][col].replace(user.user_name, '');
                }
            });
            db.collection('Groups').updateOne({ group_id: groupId }, { $set: { users: group.users, master_array: group.master_array } });
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});






module.exports = router;
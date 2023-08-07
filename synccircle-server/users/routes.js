const express = require('express');
const { getDb } = require('../db');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');


const router = express.Router();

router.get('/:groupId', (req, res) => {
    const db = getDb();
    const groupId = req.params.groupId;
    db.collection('Groups').findOne({ group_id: groupId }).then((group) => {
        if (group) {
            res.status(200).json(group.users);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});

router.post('/:groupId', (req, res) => {
    const db = getDb();
    let name = req.body.name;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let days = req.body.days;
    if (typeof days === 'string'){
        days = days.split(",");
    }

    const groupId = req.params.groupId;

    const userId = uuidv4();
    let start = moment(startTime, 'h:mm a');
    let end = moment(endTime, 'h:mm a');
    let hours = Math.abs(end.diff(start, 'hours'));
    if (end.isBefore(start)) {
        hours = 24 - hours;
    }

    let availability_array = Array(days.length).fill().map(() => Array(hours + 1).fill(0));

    db.collection('Users').insertOne({ users: {user_id: userId, user_name: name, availability_array: availability_array }})
        .then(() => {
            db.collection('Groups').updateOne({ group_id: groupId }, { $push: { users: {user_id: userId, user_name: name, availability_array: availability_array} } })
        })
        .then(() => {
            res.status(200).json({ success: true, user_id: userId });
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
            const user = group.users.find(user => user.user_id === userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found in group' });
            }
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
    const row = req.body.row;
    const col = req.body.col;

    db.collection('Groups').findOne({ group_id: groupId }).then((group) => {
        if (group) {
            let userFound = false;
            group.users.forEach((user) => {
                if (user.user_id === userId) {
                    user.availability_array[row][col] = 1;
                    group.master_array[row][col].push(user.user_name);
                    userFound = true;
                }
            });
            if(userFound){
                db.collection('Groups').updateOne({ group_id: groupId }, { $set: { users: group.users, master_array: group.master_array } });
                res.status(200).json({ message: 'Booking successful.' });
            } else {
                res.status(404).json({ error: 'User not found in group' });
            }
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
    const row = req.body.row;
    const col = req.body.col;

    db.collection('Groups').findOne({ group_id: groupId }).then((group) => {
        if (group) {
            let userExists = false;

            group.users.forEach((user) => {
                if (user.user_id === userId) {
                    userExists = true;
                    user.availability_array[row][col] = 0;
                    group.master_array[row][col] = group.master_array[row][col].filter(userName => userName !== user.user_name);
                }
            });

            if (userExists) {
                db.collection('Groups').updateOne({ group_id: groupId }, { $set: { users: group.users, master_array: group.master_array } })
                .then(() => {
                    res.status(200).json({ success: true });
                })
                .catch((err) => {
                    res.status(500).json({ error: err });
                });
            } else {
                res.status(404).json({ error: 'User not found in group' });
            }
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});







module.exports = router;
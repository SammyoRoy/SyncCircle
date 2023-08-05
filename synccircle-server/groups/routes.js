const express = require('express');
const { getDb } = require('../db');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');


const router = express.Router();

router.get('/', (req, res) => {
    const db = getDb();
    db.collection('Groups').find().toArray().then((groups) => {
        res.status(200).json(groups);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});

router.post('/', (req, res) => {
    const db = getDb();
    let name = req.body.name;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let days = req.body.days;
    days = days.split(',');
    const groupId = uuidv4();
    let start = moment(startTime, 'h:mm a');
    let end = moment(endTime, 'h:mm a');
    let hours = Math.abs(end.diff(start, 'hours'));
    if (end.isBefore(start)) {
        hours = 24 - hours;
    }

    let master_array = Array(days.length).fill().map(() => Array(hours + 1).fill(0));

    db.collection('Groups').insertOne({ group_id: groupId, group_name: name,start_time: start._i, end_time: end._i, days: days, user_ids: [], master_array: master_array }).then((result) => {
        res.status(200).json({ success: true });
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});

router.get('/:groupId', (req, res) => {
    const db = getDb();
    const groupId = req.params.groupId;
    db.collection('Groups').findOne({ group_id: groupId }).then((group) => {
        if (group) {
            res.status(200).json(group);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});

router.get('/display/:groupId', (req, res) => {
    const db = getDb();
    const groupId = req.params.groupId;
    db.collection('Groups').findOne({ group_id: groupId }).then((group) => {
        if (group) {
            res.status(200).json(group.master_array);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});

router.get('/nummem/:groupId', (req, res) => {
    const db = getDb();
    const groupId = req.params.groupId;
    db.collection('Groups').findOne({ group_id: groupId }).then((group) => {
        if (group) {
            res.status(200).json(group.user_ids.length);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});

router.get('/slot/:groupId', (req, res) => {
    const db = getDb();
    const groupId = req.params.groupId;
    const row = req.body.row;
    const col = req.body.col;
    db.collection('Groups').findOne({ group_id: groupId }).then((group) => {
        if (group) {
            res.status(200).json(group.master_array[row][col]);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});

router.get('/slot/size/:groupId', (req, res) => {
    const db = getDb();
    const groupId = req.params.groupId;
    const row = req.body.row;
    const col = req.body.col;
    db.collection('Groups').findOne({ group_id: groupId }).then((group) => {
        if (group) {
            res.status(200).json(group.master_array[row][col].length);
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});



module.exports = router;


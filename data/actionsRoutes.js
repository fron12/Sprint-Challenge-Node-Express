const express = require('express');
const router = express.Router();

const actionModel = require('./helpers/actionModel');

router.get('/', (req, res) => {
    actionModel
        .get()
        .then(actions => res.status(200).json(actions))
        .catch(err => res.status(500).json({ errorMsg: 'Could not retrieve actions.' }))
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    actionModel
        .get(id)
        .then(action => {
            if(action) {
                res.status(200).json(action);
            }
            else{
                res.status(404).json({ errorMsg: `The action with id:${id} could not be found.` })
            }
        })
        .catch(err => res.status(500).json({ errorMsg: 'Could not retrieve action.' }))
})

module.exports = router;
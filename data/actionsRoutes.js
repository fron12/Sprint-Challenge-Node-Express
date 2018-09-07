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

router.post('/', (req, res) => {
    const { project_id, description, notes, completed } = req.body;
    const body = { project_id, description, notes, completed };

    if(!project_id || !description || !notes) {
        res.status(400).json({ errorMsg: 'Actions require a project_id, description, and notes.'})
    }
    actionModel
        .insert(body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => res.status(500).json({ errorMsg: 'Could not add action.' }))
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    actionModel
        .remove(id)
        .then(action => {
            if(action) {
                res.status(204).end();
            }
            else{
                res.status(404).json({ errorMsg: `Could not find an action with the id:${id}` })
            }
        })
        .catch(err => res.status(500).json({ errorMsg: 'Could not delete action.' }))
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes, completed } = req.body;
    const body = { project_id, description, notes, completed };

    actionModel
        .update(id, body)
        .then(action => res.status(200).json(action))
        .catch(err => res.status(500).json({ errorMsg: 'Could not edit the action.' }))
})

module.exports = router;
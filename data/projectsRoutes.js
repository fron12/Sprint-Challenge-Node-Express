const express = require('express');
const router = express.Router();

const projectModel = require('./helpers/projectModel');

router.get('/', (req, res) => {
    projectModel
        .get()
        .then(projects => res.status(200).json(projects))
        .catch(err => res.status(500).json({ errorMsg: 'Could not retrieve projects.' }))
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    projectModel
        .get(id)
        .then(project => {
            if(project) {
                res.status(200).json(project);
            }
            else{
                res.status(404).json({ errorMsg: `The project with id:${id} could not be found.` })
            }
        })
        .catch(err => res.status(500).json({ errorMsg: 'Could not retrieve project.' }))
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;
    projectModel
        .getProjectActions(id)
        .then(project => {
            if(project) {
                res.status(200).json(project)
            }
            else{
                res.status(400).json({ errorMsg: `Unable to find project with id:${id}` })
            }
        })
        .catch(err => res.status(500).json({ errorMsg: 'Could not retrieve project.' }))
})

router.post('/', (req, res) => {
    const { name, description, completed } = req.body;
    const body = { name, description, completed };

    if(!name || !description ) {
        res.status(400).json({ errorMsg: 'projects require a name and description.'})
    }
    projectModel
        .insert(body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => res.status(500).json({ errorMsg: 'Could not add project.' }))
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    projectModel
        .remove(id)
        .then(project => {
            if(project) {
                res.status(204).end();
            }
            else{
                res.status(404).json({ errorMsg: `Could not find an project with the id:${id}` })
            }
        })
        .catch(err => res.status(500).json({ errorMsg: 'Could not delete project.' }))
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    const body = { name, description, completed };

    projectModel
        .update(id, body)
        .then(project => {
            if(project){
                res.status(200).json(project)
            }
            else{
                res.status(404).json({ errorMsg: 'Could not find project with that id.' })
            }
        })   
        .catch(err => res.status(500).json({ errorMsg: 'Could not edit the project.' }))
})

module.exports = router;
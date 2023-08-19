//this for Notes Model to manage notes and rounting 

const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
//route:- get all the notes using : GET "/api/auth/fetchallnotes". Login required;
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.userrr.id });
        res.json(notes);
    } catch (error) {
        res.status(500).send("Internal server error");
    }

})

//-------------------------------------------------------------------------end----------------------------------------------------------------------------------

//Route 2 Add a new Note using POST: '/api/auth/addnote'
router.post('/addnote', fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 character').isLength({ min: 5 })],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //if there are error, return Bad request and the errors 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ errors: errors.array() })
            }
            const note = new Notes({
                title, description, tag, user: req.userrr.id
            })
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error")
        }
    })

module.exports = router  
//this for Notes Model to manage notes and rounting 

const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Route 1:- get all the notes using : GET "/api/auth/fetchallnotes". Login required;
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
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
            const { title, description, tag } = req.body;               //coming from frontend NoteState addnote.
            //if there are error, return Bad request and the errors 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ errors: errors.array() })
            }

            //Below :- when we are creating a note to store in mongo title , description , tag is coming from frontend using req.body but... but... but.. when we are storing this note in db we will also store user_id of that user who are adding this note which we will get from user model of mongo using middleware . **req.user.id**  getting it from middleware.

            //for NoteAdda:-  we will add subject_id in the notes model so that we can fetch all the note corresponding to that subject;
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();     //save function is saving notes
            res.json(savedNote);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error")
        }
    })

    //-------------------------------------------------------------------------end----------------------------------------------------------------------------------
//route 2 Updation an existing Notes :Post "/api/auth/updatenotes".Login required

router.put('/updatenote/:id' ,fetchuser,async(req, res)=>{

const{title,description,tag}=req.body;

//create a newnote object
const newNote={};

if(title){newNote.title=title}
if(description){newNote.description=description}
if(tag){newNote.tag=tag}
//find the note to be updated and update it;
let note=await Notes.findById(req.params.id);
if(!note){return res.status(404).send("Not Found")}

//below: yadi ye uhi user nhi hai to not allowed     //I think unnecessary but not tested yet. 
if(note.user.toString() !==req.user.id){    //ye uhhi fetchuser bala hai and note.user is coming from Notes schema; 
    return res.status(401).send("Not Allowed");
}

note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})     
res.json(note);                                                                 //after updation of notes send it to the frontend 
})

    //-------------------------------------------------------------------------end----------------------------------------------------------------------------------

   // Route 4:- Delete an existing Noet using:DELETE "/api/notes/deletenote" .Login required
   router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
try{
//Find the note to be delete and delete it
let note=await Notes.findById(req.params.id);
if(!note){return res.status(404).send("Not Found")}

//Allow deletions only to be delete and delete it
if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not Allowed");
}

    note=await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted",note:note});
}catch(error){
    console.error(error.massage);
    res.status(500).send("Iternal server error");
}




   })
module.exports = router  
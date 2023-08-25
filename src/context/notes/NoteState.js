import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    
   const notesInitial= [
        {
          "_id": "64e1adffb57e36d415b32",
          "user": "64e1acc70a0f2a3f7bb017b3",
          "title": "11110001",
          "description": "plase wake up early",
          "tag": "personal",
          "date": "2023-08-20T06:09:03.705Z",
          "__v": 0
        },
        {
          "_id": "64e1adffb536d415b32",
          "user": "64e1acc70a0f2a3f7bb017b3",
          "title": "11110001",
          "description": "plase wak up early",
          "tag": "personal",
          "date": "2023-08-20T06:09:03.705Z",
          "__v": 0
        },
        {
          "_id": "6e1adffb57e36d415b32",
          "user": "64e1acc70a0f2a3f7bb017b3",
          "title": "11110001",
          "description": "plase wake up rly",
          "tag": "personal",
          "date": "2023-08-20T06:09:03.705Z",
          "__v": 0
        }
      ]
const [notes,setNotes]=useState(notesInitial);

//Add a Note

const addNote = (title, description, tag)=>{
  // TODO: API Call
  console.log("Adding a new note")
  

  //is note ko add karna hai
  const note = {
    "_id": "61322f119553781a8ca8d0e08",
    "user": "6131dc5e3e4037cd4734a0664",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "2021-09-03T14:20:09.668Z",
    "__v": 0
  };
  setNotes(notes.concat(note))  //here e are using concate note instead of save()      //    notes me note ko add  kar rahe hai with the help of useStatehook 
}

// Delete a Note
const deleteNote = (id)=>{
  // TODO: API Call
  console.log("Deleting the note with id" + id);
  const newNotes = notes.filter((note)=>{return note._id!==id})
  setNotes(newNotes)
}
// Edit a Note
const editNote = (id, title, description, tag)=>{


} 
    return (
    <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote}}>          
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
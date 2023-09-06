import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //const [n,nn]=useState("hello");

  /*
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
   // setNotes(notes.concat(note))  //here e are using concate note instead of save()      //    notes me note ko add  kar rahe hai with the help of useStatehook 
  }
  */




  // Get all Notes
  const getNotes = async () => {
    // API Call 

    //fetching the data corresponding to the token later here we will add login and signup auth;

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      }
    });
    const json = await response.json()     //we are getting data in the form of json and sending to noteitems through useState setNote();
  
    setNotes(json);
  }






  // Add a Note
  const addNote = async (title, description, tag) => {

    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })    //sending to the backend notes route
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }



  // Delete a Note
  const deleteNote = async (id) => {

    // TODO: API Call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });

   const json = response.json();
console.log(json);

    //above code delete note from the database but note update in the Noteitems ,for that we have to update notes again using setNote useState

  
    const newNotes = notes.filter((note) => { return note._id !== id })         //new note me bo sare notes rahenge jinki note_id!==id;
    setNotes(newNotes);                                                           //uske baad notes jo the unko newNotes bna do
  }


  // let v="lello";   
  //nn(v);
  //console.log(n);                                               


  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }

    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}              {/*this syntax means values that are passing here will we availble in all the component that are wrabbed under NoteContext.provider component */}
    </NoteContext.Provider>
  )

}

export default NoteState;
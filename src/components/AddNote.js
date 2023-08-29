import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext);

    const { addNote } = context;           //addnote function defined in newsstate

    const [note, setNote] = useState({ title: "", description: "", tag: "" })      //coming from input areas

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);      //calling add function with the help of useContext  from newsState and passing argument with the help  of setNote
        setNote({title: "", description: "", tag: ""}); //after clicking on addnotes tiitle,description,tag area should become blank.this is setting note to blank 
        props.showAlert("Added successfully","Success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}  minLength={5} required/>
                </div>
              
                <button disabled={note.titlelength<5||note.description.length<5}type="submit" className="btn btn-primary" onClick={handleClick}>AddNote</button>
            </form >
        </div >
    )
}

export default AddNote
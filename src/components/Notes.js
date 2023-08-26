import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';

import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes ,editNote} = context;             //notes and getNotes are coming from NoteState component through api calls

    useEffect(() => {
        getNotes();
    }, [])

    //All to upadate the notes

    const ref = useRef(null)
    const refClose=useRef(null);      //useRef is a hook

    const [note, setNote] = useState({id: "",  etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {            //currentNote coming from Noteitemsv  or jo actual me note tha bo value i help  se form ke fields me bhara milege uske baad jo bhi change karenge bo onChange ki help se change hota rahega usek baad vedio 67 se........   
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }

    const handleClick = (e)=>{ 
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <AddNote />
            {/* ref ki help se we has referenced this button by edit button */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        {/*this form will pop as we click on edit button and with the help of value is input area default contains notes value  */}

                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>You Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}

            </div>
        </>
    )
}

export default Notes
 
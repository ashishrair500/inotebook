import {useContext} from 'react';
import noteContext from "../context/notes/noteContext"
import React from 'react'

const Noteitem = (props) => {

const context =useContext(noteContext);
//since we have to delete notes through delete icon
const {deleteNote}=context;

    const { note,updateNote} = props;
    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>

                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successfully","Success")
}}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}
                    </p>


                </div>
            </div>
        </div>
    )
}

export default Noteitem

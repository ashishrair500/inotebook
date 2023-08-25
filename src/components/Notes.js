import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';

import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
  const { notes} = context;


//Add a note
//TODO: api call



    return (
        <>
        <AddNote/>
        <div className="row my-3">
            <h2>Yournotes</h2>

            {notes.map((note) => {
                return <Noteitem key={note._id} note={note} />
            })}

        </div>
        </>
    )
}

export default Notes

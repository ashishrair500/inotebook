import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    
   const notesInitial= [
        {
          "_id": "64e1adffb57e36d415b32601",
          "user": "64e1acc70a0f2a3f7bb017b3",
          "title": "11110001",
          "description": "plase wake up early",
          "tag": "personal",
          "date": "2023-08-20T06:09:03.705Z",
          "__v": 0
        },
        {
          "_id": "64e1fb57e36d415b32601",
          "user": "64e1acc70a0f2a3f7bb017b3",
          "title": "second title",
          "description": "pleasewake up early",
          "tag": "personal",
          "date": "2023-08-20T06:09:03.705Z",
          "__v": 0
        },
        {
          "_id": "64e1fb57e15b32601",
          "user": "64e1acc70a0f2a3f7bb017b3",
          "title": "3 title",
          "description": "please wake up erly",
          "tag": "personal",
          "date": "2023-08-20T06:09:03.705Z",
          "__v": 0
        },
        {
          "_id": "64e1fb5715b32601",
          "user": "64e1acc70a0f2a3f7bb017b3",
          "title": " 4 title",
          "description": "please wake up ely",
          "tag": "personal",
          "date": "2023-08-20T06:09:03.705Z",
          "__v": 0
        },
        {
          "_id": "64e1fb5715b32601",
          "user": "64e1acc70a0f2a3f7bb017b3",
          "title": " 4 tite",
          "description": "please wake early",
          "tag": "personal",
          "date": "2023-08-20T06:09:03.705Z",
          "__v": 0
        },
        {
          "_id": "64e1fb5715b32601",
          "user": "64e1acc70a0f2a3f7bb017b3",
          "title": " 4 ttle",
          "description": "please wake ly",
          "tag": "personal",
          "date": "2023-08-20T06:09:03.705Z",
          "__v": 0
        },
        {
          "_id": "64e1fb5715b32601",
          "user": "64e1acc70a0f2a3f7bb017b3",
          "title": " 4 itle",
          "description": "please wake uarly",
          "tag": "personal",
          "date": "2023-08-20T06:09:03.705Z",
          "__v": 0
        }
      ]
const [notes,setNotes]=useState(notesInitial);
    
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
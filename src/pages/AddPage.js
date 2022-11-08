import React from "react";
import { addNote } from "../utils/api";
import NoteForm from "../components/NoteForm";
import {useNavigate} from 'react-router-dom';

function AddPage(){
    const navigate = useNavigate();

    async function onAddNoteHandler(note){
        await addNote(note);
        navigate('/');
    }
    

    return(
        <section>
            <h2>Tambah Note</h2>
            <NoteForm addNote={onAddNoteHandler} />
        </section>
    )
}

export default AddPage;
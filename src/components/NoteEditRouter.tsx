import React from 'react'
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypeSelector";
import NotesList from './NotesList';
import NoteFormEdit from './NoteFormEdit'

const NoteEditRouter:React.FC = () => {

    const params = useParams();
    const noteId = params.id || '';
    const { notes } = useTypedSelector((state) => state.notes);
    
    const note = notes.find(note=>note.id === +noteId);
    if (!note) {
        return <NotesList />
    }
    return (
    <NoteFormEdit note={{...note}}/>
)
}
export default NoteEditRouter
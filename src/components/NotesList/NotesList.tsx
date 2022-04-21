import './NotesList.css'
import React from "react";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import Note from "./Note";
import { Link } from "react-router-dom";

const NotesList: React.FC = () => {
  const { notes } = useTypedSelector((state) => state.notes);
 const active = useTypedSelector((state) => state.app.active);
  const notesFiltered = notes.filter(note => note.active === active)
  return (
    <>
      {notesFiltered.map((note) => (
        <Note note={note} key={note.id} />
      ))}
      <Link className="button-create" to={'/add'}><button className="button-create" >Create Note</button></Link>
    </>
  );
};

export default NotesList;

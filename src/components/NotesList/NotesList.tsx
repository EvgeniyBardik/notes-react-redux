import "./NotesList.css";
import React from "react";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import Note from "./Note";
import { Link } from "react-router-dom";

const NotesList: React.FC = () => {
  const { notes } = useTypedSelector((state) => state.notes);
  const active = useTypedSelector((state) => state.app.active);
  const notesFiltered = notes.filter((note) => note.active === active);
  return (
    <>
      {notesFiltered.map((note) => (
        <Note note={note} key={note.id} />
      ))}
      <div className="flex justify-center md:justify-end">
        <Link className="button-link-add" to={"/add"}>
          <button>Create Note</button>
        </Link>
      </div>
    </>
  );
};

export default NotesList;

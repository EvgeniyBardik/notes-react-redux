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
      <div className='flex justify-end'>
      <Link className=" bg-indigo-500  text-white hover:bg-indigo-400 focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-600 inline-block px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 uppercase tracking-wider font-semibold text-sm sm:text-base shadow-lg transform transition hover:-translate-y-0.5" to={'/add'}><button className="" >Create Note</button></Link>
      </div>
    </>
  );
};

export default NotesList;

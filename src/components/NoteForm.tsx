import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { noteCreate, ShowActive } from "../redux/actions";
import uniqid from "uniqid";

interface noteIn {
  id: string;
  name: string;
  created: string;
  category: number;
  content: string;
  active: boolean;
}
const NoteForm: React.FC = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const { notes } = useTypedSelector((state) => state.notes);
  const getDateCreated = () => {
    const options: {} = { month: "long", day: "numeric", year: "numeric" };
    const date = new Date();
    return date.toLocaleString("en-US", options);
  };
  const [newNote, setNewNote] = useState<noteIn>({
    active: true,
    category: 1,
    content: "",
    created: "",
    id: "",
    name: "",
  });
  const { categories } = useTypedSelector((state) => state.categories);
  const changeHandlerName = (e: React.ChangeEvent<HTMLInputElement>) =>
    {setError(null)
    setNewNote({ ...newNote, name: e.target.value })};
  const changeHandlerCategory = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setNewNote({ ...newNote, category: +e.target.value });
  const changeHandlerContent = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setNewNote({ ...newNote, content: e.target.value });
  const changeHandlerActive = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewNote({ ...newNote, active: e.target.checked });
  const changeHandlerCancel = () => {
    goHome();
  };
  const [error, setError] = useState<null | string>(null)
  const changeHandlerCreate = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewNote({ ...newNote, created: getDateCreated(), id: uniqid()});
    
    const have = notes.find((note) => note.name === newNote.name);
    if (newNote.name === "") {
      setError("Enter note name");
    } else if (have) {
      setError("Enter another name");
    } else {
      dispatch(noteCreate(newNote));
      dispatch(ShowActive());
      goHome();
    }
  };
  return (
    <>
      <form className="form-note" onSubmit={changeHandlerCreate}>
        <h1 className="form-note__title">Create Note</h1>
        <div className="form-note__label1">Name:</div>
        <input className="form-note__name" onChange={changeHandlerName} />
        <p className='form-error'>{error}</p>
        <div className="form-note__label2">Category:</div>
        <select className="form-note__select" onChange={changeHandlerCategory}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="form-note__label3">Content:</div>
        <textarea
          className="form-note__content"
          onChange={changeHandlerContent}
        ></textarea>
        <div className="form-note__checkboxdiv">
          <input
            className="form-note__checkbox"
            type="checkbox"
            defaultChecked
            onChange={changeHandlerActive}
          />
          <span className="form-note__label4">Active</span>
        </div>
        <div>
          <input className="form-note__button1" type="submit" value="Create" />
          <input
            className="form-note__button2"
            type="reset"
            value="Cancel"
            onClick={changeHandlerCancel}
          />
        </div>
      </form>
    </>
  );
};

export default NoteForm;

import "./NoteForms.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { noteCreate, ShowActive } from "../../redux/actions";
import uniqid from "uniqid";

interface noteIn {
  id: string;
  name: string;
  created: string;
  category: number;
  content: string;
  active: boolean;
}
const NoteFormCreate: React.FC = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  const [error, setError] = useState<null | string>(null);
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
    id: uniqid(),
    name: "",
  });
  const { categories } = useTypedSelector((state) => state.categories);
  const changeHandlerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setNewNote({ ...newNote, name: e.target.value });
  };
  const changeHandlerCategory = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setNewNote({ ...newNote, category: +e.target.value });
  const changeHandlerContent = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setNewNote({ ...newNote, content: e.target.value });
  const changeHandlerActive = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewNote({ ...newNote, active: e.target.checked });
  const changeHandlerCancel = () => {
    goHome();
  };

  const changeHandlerCreate = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const have = notes.find((note) => note.name === newNote.name);
    if (newNote.name === "") {
      setError("Enter note name");
    } else if (have) {
      setError("Enter another name");
    } else {
      const newNoteForSave: noteIn = {
        ...newNote,
        created: getDateCreated(),
        id: uniqid(),
      };
      dispatch(noteCreate(newNoteForSave));
      dispatch(ShowActive());
      goHome();
    }
  };
  return (
    <>
      <div className="w-full max-w-md mt-6 mb-5 mx-auto">
        <form
          className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
          onSubmit={changeHandlerCreate}
        >
          <h1 className="font-semibold text-3xl text-center mt-2 mb-8">
            Create Note
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="notename"
            >
              Note name
            </label>
            <div className="relative">
              <input
                className="input-create-edit"
                id="notename"
                type="text"
                placeholder="Note name"
                onChange={changeHandlerName}
              />
              <p className="text-red-500 absolute botton-1 left-1 text-xs italic">
                {error}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="select"
            >
              Category
            </label>
            <div className="inline-block relative w-64">
              <select
                id="select"
                className="select-create-edit"
                onChange={changeHandlerCategory}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              onChange={changeHandlerContent}
              className="textarea-create-edit"
              id="content"
              placeholder="Your content"
            ></textarea>
          </div>
          <div className="form-check">
            <input
              className="checkbox-create-edit"
              type="checkbox"
              value=""
              id="active"
              defaultChecked
              onChange={changeHandlerActive}
            />
            <label
              className="form-check-label text-gray-700 text-sm font-bold mb-2 inline-block "
              htmlFor="flexCheckDefault"
            >
              Active
            </label>
          </div>
          <div className="flex justify-between mt-10">
            <input className="button-submit" type="submit" value="Create" />
            <input
              className="button-cancel"
              type="reset"
              value="Cancel"
              onClick={changeHandlerCancel}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default NoteFormCreate;

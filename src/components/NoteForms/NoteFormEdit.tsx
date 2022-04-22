import "./NoteForms.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { ShowActive, noteUpdate } from "../../redux/actions";

interface NoteItemProps {
  note: {
    active: boolean;
    category: number;
    content: string;
    created: string;
    id: string;
    name: string;
  };
}
const NoteFormEdit: React.FC<NoteItemProps> = ({ note }) => {
  const dispatch = useDispatch();
  const [noteEdit, setNoteEdit] = useState({
    active: note.active,
    category: note.category,
    content: note.content,
    created: note.created,
    id: note.id,
    name: note.name,
  });

  let navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  const { categories } = useTypedSelector((state) => state.categories);
  const changeHandlerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setNoteEdit({ ...noteEdit, name: e.target.value });
  };
  const changeHandlerCategory = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setNoteEdit({ ...noteEdit, category: +e.target.value });
  const changeHandlerContent = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setNoteEdit({ ...noteEdit, content: e.target.value });
  const changeHandlerActive = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNoteEdit({ ...noteEdit, active: e.target.checked });
  const changeHandlerCancel = () => {
    goHome();
  };
  const { notes } = useTypedSelector((state) => state.notes);
  const [error, setError] = useState<null | string>(null);
  const changeHandlerCreate = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const haveSameName = notes.find((note) => note.name === noteEdit.name);
    if (noteEdit.name === "") {
      setError("Enter note name");
    } else if (haveSameName && haveSameName.id !== note.id) {
      setError("Enter another name");
    } else {
      dispatch(noteUpdate(noteEdit));
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
            Edit note
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
                value={noteEdit.name}
                onChange={changeHandlerName}
              />
              <p className="text-red-500 absolute left-1 text-xs italic">
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
                value={noteEdit.category}
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
              value={noteEdit.content}
            ></textarea>
          </div>
          <div className="form-check">
            <input
              className="checkbox-create-edit"
              type="checkbox"
              value=""
              id="active"
              checked={noteEdit.active}
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
            <input className="button-submit" type="submit" value="Save" />
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

export default NoteFormEdit;

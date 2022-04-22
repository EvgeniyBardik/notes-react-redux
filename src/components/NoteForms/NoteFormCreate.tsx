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
          <h1 className="font-semibold text-2xl text-center mt-2 mb-8">
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
                className="shadow relative appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="block appearance-none w-full bg-white border border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={changeHandlerCategory}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
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
              className="
        h-48
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        min-h-5
      "
              id="content"
              placeholder="Your content"
            ></textarea>
          </div>
          <div className="form-check">
            <input
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-xl bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
            <input
              className="bg-indigo-500  text-white hover:bg-indigo-400 focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-600 inline-block px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 tracking-wider font-semibold text-sm sm:text-base shadow-lg transform transition hover:-translate-y-0.5 hover:cursor-pointer"
              type="submit"
              value="Create"
            />
            <input
              className="bg-gray-500  text-white hover:bg-gray-400 focus:ring-gray-500 focus:ring-opacity-50 active:bg-grey-600 inline-block px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 tracking-wider font-semibold text-sm sm:text-base shadow-lg transform transition hover:-translate-y-0.5 hover:cursor-pointer"
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

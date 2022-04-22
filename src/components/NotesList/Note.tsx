import { toggleActiveNote, noteRemove } from "../../redux/actions";
import { useTypedSelector } from "../../hooks/useTypeSelector";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
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

const Note: React.FC<NoteItemProps> = ({ note }) => {
  const dispatch = useDispatch();
  const { categories } = useTypedSelector((state) => state.categories);
  const contentPreview = (content: string) => {
    if (content.length > 15) {
      return content.slice(0, 15) + "...";
    } else {
      return content;
    }
  };
  const getCategory = (noteCategoryId: number) => {
    const catName = categories.find((cat) => cat.id === noteCategoryId);
    return catName.name;
  };
  const iconName = (categoryId: number) => {
    if (categoryId === 1) {
      return "local_grocery_store";
    }
    if (categoryId === 2) {
      return "lightbulb_outline";
    }
    if (categoryId === 3) {
      return "help_outline";
    } else {
      return "info_outline";
    }
  };

  const dates = (text: string) => {
    const result = text.match(/\d+\/\d+\/\d+/g) || [];
    return result.join(", ");
  };
  return (
    <div className="grid grid-cols-12 py-4 pr-3 items-center bg-orange-100 text-sm text-gray-700 md:text-base lg:text-lg rounded-lg shadow-md my-4 gap-2" data-id={note.id}>
      <i className="material-icons col-span-1 justify-self-center text-md md:text-2xl lg:text-4xl">{iconName(note.category)}</i>
      <div className="col-span-2 font-bold break-words">{note.name}</div>
      <div className="col-span-2">{note.created}</div>
      <div className="col-span-2">{getCategory(note.category)}</div>
      <div
        className="col-span-2 hover:cursor-pointer hover:underline"
        onClick={(e) =>
          e.currentTarget.textContent === note.content
            ? (e.currentTarget.textContent = contentPreview(note.content))
            : (e.currentTarget.textContent = note.content)
        }
      >
        {contentPreview(note.content)}
      </div>
      <div className="md:col-span-1 text-sm lg:text-lg xl:col-span-2">{dates(note.content)}</div>
      <div className=' col-start-10 col-end-13 md:col-span-2 xl:col-span-1 grid grid-cols-3 md:items-center md:justify-items-center'>
      <Link to={`/edit/${note.id}`} className="justify-self-center">
        <i className=" material-icons text-2xl md:text-2xl lg:text-3xl hover:text-amber-500 duration-500 transform transition hover:-translate-y-0.5">create</i>
      </Link>
      <button className="">
        <i
          className="material-icons text-2xl md:text-2xl lg:text-3xl hover:text-blue-500 duration-500 transform transition hover:-translate-y-0.5"
          onClick={() => dispatch(toggleActiveNote(note.id))}
        >
          archive
        </i>
      </button>
      <button className="">
        <i
          className="material-icons text-2xl md:text-2xl lg:text-3xl hover:text-red-500 duration-500 transform transition hover:-translate-y-0.5"
          onClick={() => dispatch(noteRemove(note.id))}
        >
          delete
        </i>
      </button>
      </div>
    </div>
  );
};
export default Note;

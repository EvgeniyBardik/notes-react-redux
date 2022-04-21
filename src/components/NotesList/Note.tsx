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
    <div className="item" data-id={note.id}>
      <div className="item__ico">
        <i className="material-icons">{iconName(note.category)}</i>
      </div>
      <div className="item__name">{note.name}</div>
      <div className="item__created">{note.created}</div>
      <div className="item__category">{getCategory(note.category)}</div>
      <div
        className="item__content"
        onClick={(e) =>
          e.currentTarget.textContent === note.content
            ? (e.currentTarget.textContent = contentPreview(note.content))
            : (e.currentTarget.textContent = note.content)
        }
      >
        {contentPreview(note.content)}
      </div>
      <div className="item__dates">{dates(note.content)}</div>
      <Link to={`/edit/${note.id}`} className="item__edit">
        <i className="material-icons">create</i>
      </Link>
      <button className="item__active">
        <i
          className="material-icons"
          onClick={() => dispatch(toggleActiveNote(note.id))}
        >
          archive
        </i>
      </button>
      <button className="item__delete">
        <i
          className="material-icons"
          onClick={() => dispatch(noteRemove(note.id))}
        >
          delete
        </i>
      </button>
    </div>
  );
};
export default Note;

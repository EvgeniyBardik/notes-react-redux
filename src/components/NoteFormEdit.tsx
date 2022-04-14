import { useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from "../hooks/useTypeSelector";
import {ShowActive, noteUpdate} from "../redux/actions"

interface NoteItemProps {
    note: {
        active: boolean,
        category: number,
        content: string,
        created: string,
        id: number,
        name: string
    };
}
const NoteFormEdit:React.FC<NoteItemProps> = ({note}) => {
    const dispatch = useDispatch()
    const [noteEdit, setNoteEdit] = useState(
        {
            active: note.active, 
            category: note.category,
            content: note.content,
            created: note.created,
            id: note.id,
            name: note.name
        }
    )

    let navigate = useNavigate();
    
    const goHome = () => {
        navigate("/");
      };

    const { categories } = useTypedSelector((state) => state.categories)
    const changeHandlerName = (e:React.ChangeEvent<HTMLInputElement>) => setNoteEdit({...noteEdit , name:e.target.value})
    const changeHandlerCategory = (e:React.ChangeEvent<HTMLSelectElement>) => setNoteEdit({...noteEdit , category:+e.target.value})
    const changeHandlerContent = (e:React.ChangeEvent<HTMLTextAreaElement>) => setNoteEdit({...noteEdit , content:e.target.value})
    const changeHandlerActive = (e:React.ChangeEvent<HTMLInputElement>) => setNoteEdit({...noteEdit , active:e.target.checked})
    const changeHandlerCancel = () => {goHome()}
    const changeHandlerCreate = (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (noteEdit.name === '') {
        alert('Enter note name')}
        else {
        dispatch(noteUpdate(noteEdit))   
        dispatch(ShowActive())
        goHome()
    }
    }
    return (
    <>
        <form className="form-note" onSubmit={changeHandlerCreate}>
            <h1 className="form-note__title">{noteEdit.name}</h1>
            <div className="form-note__label1">Name:</div>
            <input className="form-note__name" value={noteEdit.name} onChange={changeHandlerName}/>
            <div className="form-note__label2">Category:</div>
            <select className="form-note__select" value={noteEdit.category} onChange={changeHandlerCategory}>
            {
               categories.map((category) => (
               <option key={category.id} value={category.id}>{category.name}</option>))
            }
            </select>
            <div className="form-note__label3">Content:</div>
            <textarea className="form-note__content" value={noteEdit.content} onChange={changeHandlerContent}></textarea>
            <div className="form-note__checkboxdiv">
                <input className="form-note__checkbox" type="checkbox" checked={noteEdit.active} onChange={changeHandlerActive}/>
                <span className="form-note__label4">Active</span>           
            </div>
            <div>
                <input className="form-note__button1" type="submit" value="Save" />
                <input className="form-note__button2" type="reset" value="Cancel" onClick={changeHandlerCancel}/>
            </div>
        </form>
   </>
)
}


export default NoteFormEdit
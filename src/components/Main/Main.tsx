import './Main.css'
import NotesList from '../NotesList/NotesList'; 
import NoteFormCreate from '../NoteForms/NoteFormCreate';
import { Routes, Route } from 'react-router-dom';
import NotesStatisticsHeader from "../NotesStatistics/NotesStatisticsHeader";
import NotesStaistics from "../NotesStatistics/NotesStatistics"
import NoteEditRouter from '../NoteForms/NoteEditRouter';
const Main: React.FC = () => {
    return (
        <>
        <div className='container'>
        <div className="header1">
            <div></div>
            <div>Name</div>
            <div>Created</div>
            <div>Category</div>
            <div>Content</div>
            <div>Dates</div>
            <button className="header1__button1"><i className="material-icons">archive</i></button>
            <button className="header1__button2"><i className="material-icons">delete</i></button>
        </div>
        <Routes>
        <Route path="" element={<NotesList />} />
        <Route path="add" element={<NoteFormCreate />} />
        <Route path="edit" element={<NoteEditRouter />} >
        <Route path=":id" element={<NoteEditRouter />} />
        </Route>
        </Routes>
           <NotesStatisticsHeader />
           <NotesStaistics />
        </div>
        </>
    )
}

export default Main;
import "./Main.css";
import NotesList from "../NotesList/NotesList";
import NoteFormCreate from "../NoteForms/NoteFormCreate";
import { Routes, Route } from "react-router-dom";
import NotesStatisticsHeader from "../NotesStatistics/NotesStatisticsHeader";
import NotesStaistics from "../NotesStatistics/NotesStatistics";
import NoteEditRouter from "../NoteForms/NoteEditRouter";
const Main: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100 font-roboto">
        <div className="mx-4 pt-4">
          <div className="grid grid-cols-12 py-1 pr-3 items-center bg-emerald-200 text-sm text-gray-500 md:text-base lg:text-lg rounded-lg shadow-md mb-4">
            <div className="col-start-2 col-span-2 font-semibold">Name</div>
            <div className="col-span-2">Created</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Content</div>
            <div className="col-span-1 xl:col-span-2">Dates</div>
            <div className="col-span-2 xl:col-span-1 grid grid-cols-3 justify-items-center">
              <i className="hidden md:block col-start-2 text-sm md:text-xl lg:text-2xl material-icons">
                archive
              </i>
              <i className="hidden md:block col-span-1 text-sm md:text-xl lg:text-2xl material-icons">
                delete
              </i>
            </div>
          </div>
          <Routes>
            <Route path="" element={<NotesList />} />
            <Route path="add" element={<NoteFormCreate />} />
            <Route path="edit" element={<NoteEditRouter />}>
              <Route path=":id" element={<NoteEditRouter />} />
            </Route>
          </Routes>
          <NotesStatisticsHeader />
          <NotesStaistics />
        </div>
      </div>
    </>
  );
};

export default Main;

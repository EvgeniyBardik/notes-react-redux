import { appReducer } from './appReducer';
import { combineReducers } from "redux";
import { notesReducer } from "./notesReducer";
import { categoriesReducer } from "./categoriesReducer";


export const rootReducer = combineReducers({
    notes: notesReducer,
    categories: categoriesReducer,
    app: appReducer

})

export type RootState = ReturnType<typeof rootReducer>
import { CREATE_NOTE, UPDATE_NOTE, REMOVE_NOTE, TOGGLE_ACTIVE_NOTE } from './types';

interface NotesState {
    notes: Notes
}
interface NotesAction {
    type: string;
    payload?: any;
    id?: number
}
interface noteIn {
    id: number;
    name: string;
    created: string;
    category: number;
    content: string;
    active: boolean;
}
interface Notes extends Array<noteIn> { };

const initialState: NotesState = {
    notes: [
        { id: 1, name: 'Book', created: 'April 20, 2022', content: 'Read new book', category: 1, active: true, },
        { id: 2, name: 'Shop', created: 'April 17, 2022', content: 'Tea, Bread', category: 1, active: true, },
        { id: 3, name: 'Denis', created: 'April 15, 2022', content: 'I have to call Dennis 7/4/2022', category: 1, active: true, },
        { id: 4, name: 'Dentist', created: 'April 14, 2022', content: "I'm gonna have a dentist appointment on the 15/6/2022, I moves it From 20/7/2022", category: 1, active: true, },
        { id: 5, name: 'New Feature', created: 'April 10, 2022', content: 'Implement new feature', category: 2, active: false, },
        { id: 6, name: 'The Theory Of Evolution', created: 'April 5, 2022', content: 'Read new book', category: 3, active: true, },
        { id: 7, name: 'New project', created: 'April 2, 2022', content: 'Idea of the new', category: 2, active: true, },
        { id: 8, name: 'Cat', created: 'April 1, 2022', content: 'Can I get a cat?', category: 3, active: false, },
        { id: 9, name: 'New Technologies', created: 'February 25, 2022', content: 'Find about new technologies', category: 3, active: true, }
    ]
}


export const notesReducer = (state = initialState, action: NotesAction): NotesState => {
    switch (action.type) {
        case CREATE_NOTE:
            return { ...state, notes: [...state.notes, action.payload ]}
        case UPDATE_NOTE:
            const { payload } = action;
            const {notes}  = state
            const itemIndex = notes.findIndex(res => res.id === payload.id);

            const updatedNotes = [
                ...notes.slice(0, itemIndex),
                payload,
                ...notes.slice(itemIndex + 1)
            ]
            return {...state, notes: updatedNotes}
        
        case REMOVE_NOTE:
            return (() => {
                const { id } = action;
                const {notes}  = state
                const itemIndex = notes.findIndex(res => res.id === id);
    
                const updatedNotes = [
                    ...notes.slice(0, itemIndex),
                    ...notes.slice(itemIndex + 1)
                ]
                return {...state, notes: updatedNotes}               
            })();
        case TOGGLE_ACTIVE_NOTE:
            return (() => {
                const { id } = action;
 //               const {notes}  = state
                const updatedNotes = 
                state.notes.map(note =>
                    note.id === action.id ? { ...note, active: !note.active } : note) 
                return {...state, notes: updatedNotes}               
            })();
        default: return state
    }
}
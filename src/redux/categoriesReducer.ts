import { CREATE_CATEGORY, UPDATE_CATEGORY, REMOVE_CATEGORY } from './types';

interface CategoriesState {
    categories: any[]
}
interface CategoriesAction {
    type: string;
    payload?: any;
    id?: number
}

const initialState: CategoriesState = {
    categories: [
        { id: 1, name: 'Task'},
        { id: 2, name: 'Idea' },
        { id: 3, name: 'Random Thougth' }
    ]
}


export const categoriesReducer = (state = initialState, action: CategoriesAction):CategoriesState => {
    switch (action.type) {
            case CREATE_CATEGORY:
                return { ...state, categories: [...state.categories, action.payload] }
            case UPDATE_CATEGORY:
                const { payload } = action;
                const {categories}  = state
                const itemIndex = categories.findIndex(res => res.id === payload.id);
    
                const updatedCategories = [
                    ...categories.slice(0, itemIndex),
                    payload,
                    ...categories.slice(itemIndex + 1)
                ]
                return {...state, categories: updatedCategories}
            
            case REMOVE_CATEGORY:
                return (() => {
                    const { id } = action;
                    const {categories}  = state
                    const itemIndex = categories.findIndex(res => res.id === id);
        
                    const updatedCategories = [
                        ...categories.slice(0, itemIndex),
                        ...categories.slice(itemIndex + 1)
                    ]
                    return {...state, categories: updatedCategories}               
                })();
        default: return state
    }
}

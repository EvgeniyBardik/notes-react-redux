import { SHOW_ACTIVE, SHOW_ARCHIVED} from "./types";

interface ShowState {
    active: boolean;
}
interface ShowAction {
    type: string;
}

const initialState: ShowState = {
    active: true
}

export const appReducer = (state = initialState, action: ShowAction):ShowState => {
    switch (action.type) {
        case SHOW_ACTIVE:
            return { active: true }
        case SHOW_ARCHIVED:
            return { active: false }
        default: return state
    }
}




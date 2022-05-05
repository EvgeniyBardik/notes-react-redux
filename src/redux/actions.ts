import {
  CREATE_NOTE,
  UPDATE_NOTE,
  REMOVE_NOTE,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  SHOW_ACTIVE,
  SHOW_ARCHIVED,
  TOGGLE_ACTIVE_NOTE,
} from "./types";
interface noteIn {
  id: string;
  name: string;
  created: string;
  category: number;
  content: string;
  active: boolean;
}
export function noteCreate(note: noteIn) {
  return {
    type: CREATE_NOTE,
    payload: note,
  };
}

export function noteUpdate(note: noteIn) {
  return {
    type: UPDATE_NOTE,
    payload: note,
  };
}

export function noteRemove(id: string) {
  return {
    type: REMOVE_NOTE,
    id,
  };
}

export function toggleActiveNote(id: string) {
  return {
    type: TOGGLE_ACTIVE_NOTE,
    id,
  };
}

export function categoriesCreate(id: number, name: string) {
  return {
    type: CREATE_CATEGORY,
    payload: { id, name },
  };
}

export function categoriesUpdate(id: number, name: string) {
  return {
    type: UPDATE_CATEGORY,
    payload: { id, name },
  };
}

export function categoriesRemove(id: number) {
  return {
    type: REMOVE_CATEGORY,
    id,
  };
}

export function ShowActive() {
  return {
    type: SHOW_ACTIVE,
  };
}

export function ShowArchived() {
  return {
    type: SHOW_ARCHIVED,
  };
}

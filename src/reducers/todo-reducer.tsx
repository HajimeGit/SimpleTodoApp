import { v4 as uuidv4 } from 'uuid';

interface TodoAction {
  type: TodoActionTypes;
  payload: any;
}

export enum TodoActionTypes {
  ADD_TODO = 'ADD_TODO',
  DELETE_TODO = 'DELETE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  SET_TODO_LIST = 'SET_TODO_LIST',
}

type TodoState = TodoItem[];

export interface TodoItem {
  uuid: string;
  name: string;
  done: boolean;
}

export function todoReducer(state: TodoState, action: TodoAction) {
  const { type, payload } = action;
  switch (type) {
    case TodoActionTypes.ADD_TODO:
      return [
        ...state,
        {
          uuid: uuidv4(),
          name: payload,
          done: false,
        },
      ];
    case TodoActionTypes.DELETE_TODO:
      return state.filter((item) => item.uuid !== payload);
    case TodoActionTypes.UPDATE_TODO:
      return state.map((item) => (item.uuid === payload.uuid ? { ...item, [payload.key]: payload.value } : item));
    case TodoActionTypes.SET_TODO_LIST:
      return payload;
    default:
      return state;
  }
}

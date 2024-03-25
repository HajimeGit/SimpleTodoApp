import Todo from '../Todo/Todo';
import Form from '../Form/Form';
import todoReducer from '../../reducers/todo-reducer';
import { TodoItem, TodoActionTypes } from '../../reducers/todo-reducer';
import { useEffect, useReducer } from 'react';
import List from '@mui/material/List';
import { Typography } from '@mui/material';

const TodoList = () => {
  const [todoList, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    const todoList = localStorage.getItem('todoList');

    if (todoList) {
      dispatch({
        type: TodoActionTypes.SET_TODO_LIST,
        payload: JSON.parse(todoList),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (name: string) => {
    if (name === '') return;
    dispatch({
      type: TodoActionTypes.ADD_TODO,
      payload: name,
    });
  };

  const updateTodo = (uuid: string, key: string, value?: string | boolean) => {
    dispatch({
      type: TodoActionTypes.UPDATE_TODO,
      payload: { uuid, key, value },
    });
  };

  const deleteTodo = (uuid: string) => {
    dispatch({
      type: TodoActionTypes.DELETE_TODO,
      payload: uuid,
    });
  };

  return (
    <div>
      <Form addTodo={addTodo} />
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {todoList.length === 0 ? (
          <Typography variant="h5">No todos yet</Typography>
        ) : (
          todoList.map((item: TodoItem) => (
            <Todo
              updateCallback={updateTodo}
              deleteCallback={deleteTodo}
              done={item.done}
              uuid={item.uuid}
              key={item.uuid}
              name={item.name}
            />
          ))
        )}
      </List>
    </div>
  );
};

export default TodoList;

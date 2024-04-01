import Todo from '../Todo/Todo';
import Form from '../Form/Form';
import { TodoItem, TodoActionTypes, todoReducer } from '../../reducers/todo-reducer';
import React, { useEffect, useReducer } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LoadingSpinner } from '@/components/ui/spinner.tsx';

const TodoList = () => {
  const [todoList, dispatch] = useReducer(todoReducer, []);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const todoList = localStorage.getItem('todoList');

    if (todoList) {
      setTimeout(() => {
        dispatch({
          type: TodoActionTypes.SET_TODO_LIST,
          payload: JSON.parse(todoList),
        });
        setLoading(false);
      }, 500);
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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-10 min-w-20">
      <Form addTodo={addTodo} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Done</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todoList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>No todos yet</TableCell>
            </TableRow>
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
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;

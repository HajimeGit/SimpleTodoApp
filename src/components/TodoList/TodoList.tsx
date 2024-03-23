import Todo from '../Todo/Todo';
import Form from '../Form/Form';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import List from '@mui/material/List';
import { Typography } from '@mui/material';

interface ListItem {
  uuid: string;
  name: string;
  done: boolean;
}

export default function TodoList() {
  const [todoList, setList] = useState<ListItem[]>([]);

  useEffect(() => {
    const todoList = localStorage.getItem('todoList');
    if (todoList) {
      setList(JSON.parse(todoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const handleTodoAdding = (item: string) => {
    if (item === '') return;
    setList([
      ...todoList,
      {
        uuid: uuidv4(),
        name: item,
        done: false,
      },
    ]);
  };

  const handleTodoDeleting = (uuid: string) => {
    setList(todoList.filter((item) => item.uuid !== uuid));
  };

  const handleTodoEditing = (uuid: string, name: string) => {
    setList(todoList.map((item) => (item.uuid === uuid ? { ...item, name } : item)));
  };

  const handleTodoDone = (uuid: string) => {
    setList(todoList.map((item) => (item.uuid === uuid ? { ...item, done: !item.done } : item)));
  };

  return (
    <div>
      <Form addTodo={handleTodoAdding} />
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {todoList.length === 0 ? (
          <Typography variant="h5">No todos yet</Typography>
        ) : (
          todoList.map((item) => (
            <Todo
              editCallback={handleTodoEditing}
              deleteCallback={handleTodoDeleting}
              doneCallback={handleTodoDone}
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
}

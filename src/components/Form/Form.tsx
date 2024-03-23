import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

interface FormProps {
  addTodo: (todoName: string) => void;
}

const Form: React.FC<FormProps> = ({ addTodo }) => {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      <Stack direction="column" spacing={3}>
        <Typography variant="h3">Todo List</Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            id={'todo-input'}
            label="Todo"
            variant={'outlined'}
            placeholder="Do something useful..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
          />
          <Button
            onClick={() => {
              addTodo(inputValue);
              setInputValue('');
            }}
            variant="contained"
            size="large"
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default Form;

import React from 'react';
import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

interface TodoProps {
  uuid: string;
  name: string;
  done: boolean;
  deleteCallback: (uuid: string) => void;
  editCallback: (uuid: string, name: string) => void;
  doneCallback: (uuid: string) => void;
}

enum inputStatus {
  EDIT,
  VIEW,
}

const Todo: React.FC<TodoProps> = ({ uuid, done, name, deleteCallback, editCallback, doneCallback }) => {
  const [status, setStatus] = React.useState<inputStatus>(inputStatus.VIEW);
  const [inputValue, setInputValue] = React.useState<string>(name);

  const handleNameSave = () => {
    editCallback(uuid, inputValue);
    setStatus(inputStatus.VIEW);
  };

  return (
    <ListItem style={{border: "1px solid black", marginBottom: "10px"}} key={uuid}>
      <ListItemIcon>
        <Checkbox edge="start" checked={done} tabIndex={-1} disableRipple onClick={() => doneCallback(uuid)} />
      </ListItemIcon>
      {status === inputStatus.EDIT ? (
        <TextField
          onChange={(e) => setInputValue(e.target.value)}
          type={'text'}
          value={inputValue}
          autoFocus={true}
        ></TextField>
      ) : (
        <ListItemText
          style={done ? { textDecoration: 'line-through' } : {}}
          onClick={() => setStatus(inputStatus.EDIT)}
          primary={<Typography variant="h5">{name}</Typography>}
        ></ListItemText>
      )}
      {status == inputStatus.EDIT ? (
        <IconButton onClick={handleNameSave}>
          <DoneIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => setStatus(inputStatus.EDIT)}>
          <EditIcon />
        </IconButton>
      )}
      <IconButton size="large" onClick={() => deleteCallback(uuid)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default Todo;

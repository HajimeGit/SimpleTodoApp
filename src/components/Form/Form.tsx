import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FormProps {
  addTodo: (todoName: string) => void;
}

const Form: React.FC<FormProps> = ({ addTodo }) => {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div className="flex flex-col items-center gap-5">
      <h3 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        Todo List
      </h3>
      <div className="flex w-full max-w-sm items-center space-x-2 gap-3">
        <Input
          id={'todo-input'}
          placeholder="Do something useful..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
        />
        <Button
          type="submit"
          onClick={() => {
            addTodo(inputValue);
            setInputValue('');
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default Form;

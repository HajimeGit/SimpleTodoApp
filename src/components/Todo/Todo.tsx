import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface TodoProps {
  uuid: string;
  name: string;
  done: boolean;
  deleteCallback: (uuid: string) => void;
  updateCallback: (uuid: string, key: string, value?: string | boolean) => void;
}

const Todo: React.FC<TodoProps> = ({ uuid, done, name, deleteCallback, updateCallback }) => {
  return (
    <TableRow key={uuid}>
      <TableCell className="font-medium">
        <Checkbox id="terms" onCheckedChange={(e) => updateCallback(uuid, 'done', e)} checked={done} />
      </TableCell>
      <TableCell>
        <Input type="text" value={name} onChange={(e) => updateCallback(uuid, 'name', e.target.value)} className="" />
      </TableCell>
      <TableCell>
        <Button variant="destructive" onClick={() => deleteCallback(uuid)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Todo;

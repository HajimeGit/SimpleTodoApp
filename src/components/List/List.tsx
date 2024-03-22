import Todo from '../Todo/Todo';
import Form from '../Form/Form';
import {useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ListItem {
    uuid: string;
    name: string;
    done: boolean;
}

export default function List() {
    const [list, setList] = useState<ListItem[]>([]);

    useEffect(() => {
        const list = localStorage.getItem('list');
        if (list) {
            setList(JSON.parse(list));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list]);

    const handleTodoAdding = (item: string) => {
        if (item === '') return;
        setList([
            ...list,
            {
                uuid: uuidv4(),
                name: item,
                done: false
            }
        ])
    }

    const handleTodoDeleting = (uuid: string) => {
        setList(list.filter(item => item.uuid !== uuid));
    }

    const handleTodoEditing = (uuid: string, name: string) => {
        setList(list.map(item => item.uuid === uuid ? {...item, name} : item));
    }

    const handleTodoDone = (uuid: string) => {
        setList(list.map(item => item.uuid === uuid ? {...item, done: !item.done} : item));
    }


    return (
        <div>
            <Form addItem={handleTodoAdding}/>
            <div>
                {
                    list.map((item) => (
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
                }
            </div>
        </div>
    )
}
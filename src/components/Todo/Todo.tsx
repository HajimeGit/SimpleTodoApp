import React from "react";

interface TodoProps {
    uuid: string,
    name: string,
    done: boolean,
    deleteCallback: (uuid: string) => void,
    editCallback: (uuid: string, name: string) => void,
    doneCallback: (uuid: string) => void,
}

enum inputStatus {
    EDIT,
    VIEW
}

const Todo: React.FC<TodoProps> = ({uuid, done, name, deleteCallback, editCallback, doneCallback}) => {
    const [status, setStatus] = React.useState<inputStatus>(inputStatus.VIEW);
    const [inputValue, setInputValue] = React.useState<string>(name);

    const handleNameSave = () => {
        editCallback(uuid, inputValue);
        setStatus(inputStatus.VIEW);
    }

    return (
        <div style={{display: "flex"}}>
            <input checked={done} onChange={() => doneCallback(uuid)} type="checkbox"/>
            <div>{status === inputStatus.EDIT
                ? <input
                    onChange={e => setInputValue(e.target.value)}
                    type={"text"}
                    value={inputValue}
                />
                : <h2
                    onClick={() => setStatus(inputStatus.EDIT)}
                    style={done ? {textDecoration: "line-through"} : {}}>{name}
                  </h2>
            }
            </div>
            {status == inputStatus.EDIT
                ? <button onClick={handleNameSave}>Save</button>
                : <button onClick={() => setStatus(inputStatus.EDIT)}>Edit</button>}
            <button onClick={() => deleteCallback(uuid)}>Delete</button>
        </div>
    )
}

export default Todo
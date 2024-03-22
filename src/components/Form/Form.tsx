import React from "react";

interface FormProps {
    addItem: (name: string) => void
}

const Form: React.FC<FormProps> = ({addItem}) => {
    const [item, setItem] = React.useState('');

    return (
        <div>
            <h1>Add Todo</h1>
            <input
                placeholder="Do something useful..."
                value={item}
                onChange={e => setItem(e.target.value)}
                type="text"
            />
            <button onClick={() => {
                addItem(item);
                setItem('');
            }}>Add</button>
        </div>
    )
}

export default Form
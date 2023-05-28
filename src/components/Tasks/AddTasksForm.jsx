import React, {useState} from "react";
import axios from "axios";

import addSvg from '../../assets/img/add.svg';

const AddTasksForm = ({list, onAddTask}) => {
    const [formVisible, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisible = () => {
        setFormVisible(!formVisible);
        setInputValue('');
    }

    const addTask = () => {
        const obj = {
            "listId": list.id,
            "text": inputValue,
            "completed": false,
        };

        setIsLoading(true);
        axios
            .post('http://localhost:3001/tasks', obj)
            .then(({ data }) => {
                onAddTask(list.id, data);
                toggleFormVisible();
            })
            .catch(() => {
                alert('Error adding task!');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="tasks__form">
            {!formVisible ? (
                <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={addSvg} alt="Add icon" />
                    <span>New task</span>
                </div>
            ) : (
                <div className="tasks__form-block">
                    <input
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        className="field"
                        type="text"
                        placeholder="Task text"
                    />
                    <button 
                        disabled={isLoading}
                        onClick={addTask} 
                        className="button"
                    >
                        {isLoading ? 'Adding...' : 'Add task'}
                    </button>
                    <button onClick={toggleFormVisible} className="button button--grey">Cancel</button>
                </div>
            )}
        </div>
    );
}

export default AddTasksForm;
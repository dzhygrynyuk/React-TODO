import React from "react";
import axios from "axios";

import AddTasksForm from "./AddTasksForm";

import './Tasks.scss';

import editSvg from '../../assets/img/edit.svg';

const Tasks = ({list, onEditTitle, onAddTask, withoutEmpty}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Name of list', list.name);
        if(newTitle){
            onEditTitle(list.id, newTitle);
            axios
                .patch('http://localhost:3001/lists/'+list.id, {
                    name: newTitle
                })
                .catch(() => {
                    alert('Failed to update list name.');
                });
        }
    }

    return (
        <div className='tasks'>
            <h2 style={{ color: list.color.hex }} className='tasks__title'>{list.name} <img onClick={editTitle} src={editSvg} alt="Edit" /></h2>
            <div className="tasks__items">
                {!withoutEmpty && !list.tasks.length && <h3>There are no tasks.</h3>}
                {list.tasks.map(task => (
                    <div key={task.id} className="tasks__items-row">
                        <div className="checkbox">
                            <input id={`task-${task.id}`} type="checkbox" />
                            <label htmlFor={`task-${task.id}`}>
                                <svg width="11" height="8" viewBox="0 0 11 8" fill="none"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </label>
                        </div>
                        <input readOnly value={task.text} />
                    </div>
                ))}
                <AddTasksForm 
                    list={list}
                    onAddTask={onAddTask} 
                />
            </div>
        </div>
    );
}

export default Tasks;
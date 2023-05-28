import React from "react";
import axios from "axios";

import AddTasksForm from "./AddTasksForm";
import Task from "./Task";

import './Tasks.scss';

import editSvg from '../../assets/img/edit.svg';

const Tasks = ({list, onEditTitle, onAddTask, onRemoveTask, withoutEmpty}) => {

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
                    <Task 
                        key={task.id}
                        list={list}
                        onRemove={onRemoveTask}
                        {...task} 
                    />
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
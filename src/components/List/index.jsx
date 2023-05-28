import React from "react";
import axios from "axios";

import Badge from "../Badge";
import classNames from "classnames";

import './List.scss';

import RemoveSvg from '../../assets/img/remove.svg'

const List = ({items, isRemoveble, onClick, onRemove}) => { 

    const removeListItem = (item) => {
        if(window.confirm('Confirm deletion of the item')){
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
        }
    }
    return (
        <ul className='list'>
            { items.map( (item, index) => (
                <li onClick={onClick} key={index} className={classNames(item.className, {'active': item.active})}>
                    <i>
                        {item.icon ? (
                            item.icon
                        ) : (
                            <Badge color={item.color.name} />
                        )}
                    </i>
                    <span>
                        {item.name}
                        {item.tasks && ` (${item.tasks.length})`}
                    </span>
                    {isRemoveble && 
                        <img 
                            className="list__remove-icon" 
                            src={RemoveSvg} 
                            alt="Remove icon"
                            onClick={() => removeListItem(item)}
                        />}
                </li>
            )) }
        </ul>
    );
};

export default List;
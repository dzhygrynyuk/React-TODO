import React from "react";
import Badge from "../Badge";
import classNames from "classnames";

import './List.scss';

import RemoveSvg from '../../assets/img/remove.svg'

const List = ({items, isRemoveble, onClick, onRemove}) => { 

    const removeListItem = (item) => {
        if(window.confirm('Confirm deletion of the item')){
            onRemove(item);
        }
    }
    return (
        <ul onClick={onClick} className='list'>
            { items.map( (item, index) => (
                <li key={index} className={classNames(item.className, {'active': item.active})}>
                    <i>
                        {item.icon ? (
                            item.icon
                        ) : (
                            <Badge color={item.color} />
                        )}
                    </i>
                    <span>{item.name}</span>
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
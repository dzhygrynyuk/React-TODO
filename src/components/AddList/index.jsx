import React, {useState} from "react";
import List from "../List";
import Badge from "../Badge";

import './AddList.scss';

import closeSVG from '../../assets/img/close.svg';

const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, setSelectedColor] = useState(colors[0].id);
    const [inputValue, setInputValue] = useState('');

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        setSelectedColor(colors[0].id);
    }

    const addList = () => {
        if(!inputValue){
            alert("Input list name");
            return;
        }
        const color = colors.filter(color => color.id === selectedColor)[0].name;
        onAdd({"id": Math.random(), "name": inputValue, "color": color});
        onClose();
    }

    return (
        <div className="add-list">
            <List 
                onClick={()=>setVisiblePopup(true)}
                items={[
                    { 
                        className: 'list__add-button',
                        icon: (
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        ),
                        name: 'Add list'
                    },
                ]}
            />
            {visiblePopup && <div className="add-list__popup">
                <img
                    onClick={onClose}
                    src={closeSVG}
                    alt="Close button"
                    className="add-list__popup-close-btn"
                />
                <input 
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    className="field" 
                    type="text" 
                    placeholder="List name" 
                />
                <div className="add-list__popup-colors">
                    {colors.map( color => (
                        <Badge 
                            onClick={()=> setSelectedColor(color.id)}
                            key={color.id} 
                            color={color.name}
                            className={selectedColor === color.id && 'active'}
                        />
                    ))}
                </div>
                <button 
                    onClick={addList}
                    className="button">Add</button>
            </div>}
        </div>
    );
}

export default AddList;
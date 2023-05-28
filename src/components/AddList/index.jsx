import React, {useState, useEffect} from "react";
import axios from "axios";

import List from "../List";
import Badge from "../Badge";

import './AddList.scss';

import closeSVG from '../../assets/img/close.svg';

const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, setSelectedColor] = useState(4);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id);
        }
    }, [colors]);

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
        setIsLoading(true);
        axios
            .post('http://localhost:3001/lists', {
                name: inputValue,
                colorId: selectedColor
            })
            .then(({data}) => {
                const color = colors.filter(color => color.id === selectedColor)[0];
                const listObj = {...data, color, tasks: []} ;
                onAdd(listObj);
                onClose();
            })
            .catch(() => {
                alert('Error adding list!');
            })
            .finally(() => {
                setIsLoading(false);
            });
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
                    className="button">{isLoading ? 'Addition...' : 'Add'}</button>
            </div>}
        </div>
    );
}

export default AddList;
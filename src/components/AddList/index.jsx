import React, {useState} from "react";
import List from "../List";
import Badge from "../Badge";

import './AddList.scss';

import closeSVG from '../../assets/img/close.svg';

const AddListButton = ({colors}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, setSelectedColor] = useState(false);

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
                    onClick={() => setVisiblePopup(false)}
                    src={closeSVG}
                    alt="Close button"
                    className="add-list__popup-close-btn"
                />
                <input 
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
                <button className="button">Add</button>
            </div>}
        </div>
    );
}

export default AddListButton;
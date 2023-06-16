import React, { useState } from 'react';

const TeacherVoteChoiceSelectButton = ({ id, buttonText, onSelect, isSelected }) => {
    const handleClick = () => {
        onSelect(id);
        // Perform any additional actions when the button is clicked
    };

    return (
        <button
            className={`p-2 m-2 transition-colors hover:bg-fuchsia-600 ${isSelected ? 'bg-fuchsia-600' : 'border-white'}`}
            onClick={handleClick}
            id={id}
            // disabled={isSelected} // Disable the button after it's selected (optional)
        >
            {buttonText}
        </button>
    );
};

export default TeacherVoteChoiceSelectButton;

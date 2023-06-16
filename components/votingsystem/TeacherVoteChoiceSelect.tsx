import React, { useEffect, useState } from 'react'
import TeacherVoteChoiceSelectButton from './TeacherVoteChoiceSelectButton'

const TeacherVoteChoiceSelect = ({project, participantsCount, onButtonSelect}) => {
  const [amountOfChoiceButtons, setAmountOfChoiceButtons] = useState(3);
  const [selectedButtonId, setSelectedButtonId] = useState(null);


  const handleButtonSelect = (id) => {
    setSelectedButtonId(id);
    
    // Perform any additional actions when a button is selected
 // Invoke the callback function with the selected button value
 onButtonSelect(project.project_id, id);
  };

  useEffect(() => {

    console.log("selected button ID" ,selectedButtonId)
    // ...
    if (participantsCount > 3){
      setAmountOfChoiceButtons(3)
      console.log(amountOfChoiceButtons)
  } else {
    console.log(amountOfChoiceButtons)
    setAmountOfChoiceButtons(participantsCount)
  }
 
  }, [participantsCount, project,selectedButtonId]);
  

  const renderChoiceButtons = () => {
    const buttons = [];
    for (let i = 1; i <= amountOfChoiceButtons; i++) {
      buttons.push(
        <TeacherVoteChoiceSelectButton key={i} id={i} buttonText={i}   onSelect={handleButtonSelect}   isSelected={selectedButtonId === i} />
      );
    }
    return buttons;
  };

  return (

    <div className="bg-black h-auto absolute w-full text-center gap-5 z-40 ">
        <p>Your Choice: </p>
        

        <div>
        {renderChoiceButtons()}
      </div>
      
    </div>
  )
}

export default TeacherVoteChoiceSelect
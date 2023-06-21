import React, { useEffect, useState } from "react";
import TeacherVoteChoiceSelectButton from "./TeacherVoteChoiceSelectButton";

const TeacherVoteChoiceSelect = ({
  project,
  participantsCount,
  onButtonSelect,
  ranking,
}) => {
  const [amountOfChoiceButtons, setAmountOfChoiceButtons] = useState(3);
  const [selectedButtonId, setSelectedButtonId] = useState(null);

  useEffect(() => {
    // Find matching projectId within ranking array
    const position = ranking.findIndex(
      (item) => item?.projectId === project.project_id
    );
    // Change the selected button ID to the position + 1 (since the array starts at 0)
    setSelectedButtonId(position + 1);
  }, [ranking, project.project_id]);

  const handleButtonSelect = (id) => {
    // Perform any additional actions when a button is selected
    // Invoke the callback function with the selected button value
    onButtonSelect(project.project_id, id);
  };

  useEffect(() => {
    // ...
    if (participantsCount > 3) {
      setAmountOfChoiceButtons(3);
    } else {
      setAmountOfChoiceButtons(participantsCount);
    }
  }, [participantsCount, project, selectedButtonId]);

  const renderChoiceButtons = () => {
    const buttons = [];
    for (let i = 1; i <= amountOfChoiceButtons; i++) {
      buttons.push(
        <TeacherVoteChoiceSelectButton
          key={i}
          id={i}
          buttonText={i}
          onSelect={handleButtonSelect}
          isSelected={selectedButtonId === i}
        />
      );
    }
    return buttons;
  };

  return (
    <div className="bg-black h-auto absolute w-full gap-5 text-center z-40 ">
      <p>Your Choice: </p>

      <div>{renderChoiceButtons()}</div>
    </div>
  );
};

export default TeacherVoteChoiceSelect;

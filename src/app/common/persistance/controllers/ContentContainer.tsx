import React from 'react';
import Floor from '../../../../Components/Panel/Floor';
import Doors from '../../../../Components/Panel/Doors';
import Windows from '../../../../Components/Panel/windows';
import Draggable from 'react-draggable'; 
type ContentContainerProps = {
  showFloor: boolean;
  showDoors: boolean;
  showWindows: boolean;
};

const ContentContainer: React.FC<ContentContainerProps> = ({ showFloor, showDoors, showWindows }) => {
  return (
    <Draggable>
    <div className="content-container"style={{position: 'fixed', top: '0px', right: '0px', width: '300px', backgroundColor: 'white'}}>
      {showFloor && <Floor />}
      {showDoors && <Doors />}
      {showWindows && <Windows />}
    </div>
    </Draggable>
  );
};

export default ContentContainer;

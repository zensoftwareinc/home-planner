import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Floor.css';

function Floor() {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const maximize = () => {
    setIsMinimized(false);
  };

  const minimize = () => {
    setIsMinimized(true);
  };

  return (
    <div className="floor-container">
      <div onClick={toggleMinimize} className="icon-container">
        <h4>Floor Plan</h4>
        <div className="icons-1">
          {isMinimized ? (
            <FontAwesomeIcon icon={faPlus} onClick={maximize} />
          ) : (
            <FontAwesomeIcon icon={faMinus} onClick={minimize} />
          )}
        </div>
      </div>

      <div className={isMinimized ? 'content hidden' : 'content'}>
        <p>This is the content of the Floor component.</p>
      </div>
    </div>
  );
}

export default Floor;

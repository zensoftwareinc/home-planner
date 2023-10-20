import React, { useState, FormEvent } from 'react';
import './PropertyForm.css';

function PropertyForm() {
  const [area, setArea] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [thickness, setThickness] = useState<string>('');
  const [minimized, setMinimized] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Area:', area, 'Height:', height, 'Thickness:', thickness);
  };

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  return (
    <div className={`property-div ${minimized ? 'minimized' : ''}`}>
      <div className="toggle-button" onClick={toggleMinimize}>
        {minimized ? 'Show' : 'Hide'}
      </div>
      {!minimized && (
        <>
          <h2>Properties</h2>
          <form onSubmit={handleSubmit}>
            <div className="P1">
              <label htmlFor="area">Area (mm²):</label>
              <input
                type="number"
                id="area"
                name="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="P1">
              <label htmlFor="height">Height (mm):</label>
              <input
                type="number"
                id="height"
                name="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="P1">
              <label htmlFor="thickness">Thickness (mm):</label>
              <input
                type="number"
                id="thickness"
                name="thickness"
                value={thickness}
                onChange={(e) => setThickness(e.target.value)}
                min="0"
                required
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
}

export default PropertyForm;

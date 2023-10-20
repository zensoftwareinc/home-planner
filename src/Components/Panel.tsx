// import React, { useState } from 'react';
// import Floor from '../Components/Panel/Floor';
// import Windows from '../Components/Panel/windows';
// import Doors from '../Components/Panel/Doors';
// import './Panel.css';

// function Panel() {
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);

//   const selectOption = (option: string | null) => {
//     if (selectedOption === option) {
//       setSelectedOption(null);
//     } else {
//       setSelectedOption(option);
//     }
//   };

//   return (
//     <div>
//       <button onClick={() => selectOption(null)}>Open Options</button>

//       <div className="options-container">
//         <div>
//           <button onClick={() => selectOption('Doors')}>Open Doors</button>
//           <button onClick={() => selectOption('Windows')}>Open Windows</button>
//           <button onClick={() => selectOption('Floors')}>Open Floors</button>
//         </div>
//       </div>

//       <div className="content-container">
//         <div className="content-box">
//           {selectedOption === 'Doors' && <Doors />}
//           {selectedOption === 'Windows' && <Windows />}
//           {selectedOption === 'Floors' && <Floor />}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Panel;4


// import React, { useState } from "react";
// import { Dropdown, DropdownButton } from "react-bootstrap";
// import Floor from "../Components/Panel/Floor";
// import Windows from "../Components/Panel/windows";
// import Doors from "../Components/Panel/Doors";

// type PanelProps = {
//   // Add any props you need for the panel content
// };

// const Panel: React.FC<PanelProps> = (props: PanelProps) => {
//   const buttonStyle = {
//     backgroundColor: "grey",
//     color: "black",
//     margin: "10px",
//     textAlign: "center",
//     borderRadius: "4px",
//   };

//   const [selectedContent, setSelectedContent] = useState(null);

//   const showFloorContent = () => {
//     setSelectedContent(<Floor/>);
//   };

//   const showWindowsContent = () => {
//     setSelectedContent(<Windows/>);
//   };

//   const showDoorsContent = () => {
//     setSelectedContent(<Doors/>);
//   };

//   return (
//     <div className="panel-content">
//       <DropdownButton
//         title="Panel"
//         id="panel-dropdown"
//         style={buttonStyle}
//         variant="blue"
//         size="sm"
//       >
//         <Dropdown.Item onClick={showFloorContent}>Floor</Dropdown.Item>
//         <Dropdown.Item onClick={showWindowsContent}>Windows</Dropdown.Item>
//         <Dropdown.Item onClick={showDoorsContent}>Doors</Dropdown.Item>
//       </DropdownButton>

//       <div>
//         {selectedContent}
//       </div>
//     </div>
//   );
// };

// export default Panel;


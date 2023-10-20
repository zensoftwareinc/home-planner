// import React from "react";
// import { Dropdown, DropdownButton } from "react-bootstrap";
// import './Header.css'

// // import Panel from "../../../../Components/Panel";


// type Props = {
//     className?: string,
//     openFile: () => void,
//     saveFile: () => void,
//     saveRender: () => void,
//     chooseInteriorArranger: () => void,
//     choosePlanDrawer: () => void,
//     resetCamera: () => void,
// }

// export const HeaderMenuController: React.FC<Props> = (props: Props) => {
//     // const [showPanel, setShowPanel] = useState(false);

//     // const titleStyle = {
//     //     color: 'blue', 
//     // };

//     const buttonStyle = {

//         backgroundColor: 'grey',
//         color: 'black',
//         margin: '10px',
//         textAlign: 'center',
//         borderRadius:'4px'
//     };


//     const centerDivStyle = {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',

//     };
//     const display ={
//         display: 'flex',
//     };
//     return (
//         <div style={centerDivStyle}>
//             <div className={props.className} style={display}>
//                 <div className="navbar-buttons">
//                     <DropdownButton title="File" style={buttonStyle} className="Navbar-button btn-sm small" variant="blue" size="sm">
//                         <Dropdown.Item onClick={props.openFile} className="white-text">Open project</Dropdown.Item>
//                         <Dropdown.Item onClick={props.saveFile} className="white-text">Save project</Dropdown.Item>

//                         <Dropdown.Divider />
//                         <Dropdown.Item onClick={props.saveRender} className="white-text">Export current view to file</Dropdown.Item>
//                     </DropdownButton>
//                     <DropdownButton title="View" style={buttonStyle} className="Navbar-button btn-sm small " variant="blue" size="sm">
//                         <Dropdown.Item onClick={props.choosePlanDrawer}>2D View</Dropdown.Item>
//                         <Dropdown.Item onClick={props.chooseInteriorArranger}>3D View</Dropdown.Item>
//                         {/* <Dropdown.Item >Panel</Dropdown.Item> */}
//                         {/* <Dropdown.Item ><Panel/></Dropdown.Item> */}
//                         <DropdownButton title="Panel">
//                         <Dropdown.Item >Floor</Dropdown.Item>
//                         <Dropdown.Item >Doors</Dropdown.Item>
//                         <Dropdown.Item >Windows</Dropdown.Item>
//                         </DropdownButton>
//                         <Dropdown.Divider />
//                         <Dropdown.Item onClick={props.resetCamera}>Reset camera</Dropdown.Item>
//                     </DropdownButton>

//                     <button style={buttonStyle} className="navbar-button">Undo</button>
//                     <button style={buttonStyle} className="navbar-button">Redo</button>
//                     <button style={buttonStyle} className="navbar-button">Clear</button>
//                     <button style={buttonStyle} className="navbar-button">Export</button>
//                     <button style={buttonStyle} className="navbar-button">Import</button>
//                     </div>
//                     <div className="Mukul">
//                     <button style={buttonStyle} className="navbar-button">Tutorial</button>
//                     <button style={buttonStyle} className="navbar-button">Help</button>
//                     </div>

//             </div>
//             {/* {showPanel && <Panel />} */}
//         </div>
//     );
// };


import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './Header.css'
import Floor from "../../../../Components/Panel/Floor";
import Doors from "../../../../Components/Panel/Doors";
import Windows from "../../../../Components/Panel/windows";
import ContentContainer from './ContentContainer';
import Draggable from "react-draggable";
type Props = {
    className?: string,
    openFile: () => void,
    saveFile: () => void,
    saveRender: () => void,
    chooseInteriorArranger: () => void,
    choosePlanDrawer: () => void,
    resetCamera: () => void,
}

export const HeaderMenuController: React.FC<Props> = (props: Props) => {
    //   const [selectedContent, setSelectedContent] = useState(null);
    const [showFloor, setShowFloor] = useState(false);
    const [showDoors, setShowDoors] = useState(false);
    const [showWindows, setShowWindows] = useState(false);

    const buttonStyle = {
        backgroundColor: 'grey',
        // backgroundColor: 'transparent',
        color: 'black',
        margin: '10px',
        textAlign: 'center',
        borderRadius: '4px'
    };

    const centerDivStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };
    const PanelStyle={
        fontSize:'15px'
    }
    const display = {
        display: 'flex',
    };

    //   const showFloorContent = () => {
    //     setSelectedContent(<Floor />);
    //   };

    //   const showDoorsContent = () => {
    //     setSelectedContent(<Doors />);
    //   };

    //   const showWindowsContent = () => {
    //     setSelectedContent(<Windows />);
    //   };
    const toggleFloor = () => {
        setShowFloor(!showFloor);
        // setShowDoors(false);
        // setShowWindows(false);
    };

    const toggleDoors = () => {
        setShowDoors(!showDoors);
        // setShowFloor(false);
        // setShowWindows(false);
    };

    const toggleWindows = () => {
        setShowWindows(!showWindows);
        // setShowFloor(false);
        // setShowDoors(false);
    };


    return (
        <div style={centerDivStyle}>
            <div className={props.className} style={display}>
                <div className="navbar-buttons">
                    <DropdownButton title="File" style={buttonStyle} className="Navbar-button btn-sm small" variant="blue" size="sm">
                        <Dropdown.Item onClick={props.openFile} className="white-text">Open project</Dropdown.Item>
                        <Dropdown.Item onClick={props.saveFile} className="white-text">Save project</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={props.saveRender} className="white-text">Export current view to file</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton title="View" style={buttonStyle} className="Navbar-button btn-sm small " variant="blue" size="sm">
                        <Dropdown.Item onClick={props.choosePlanDrawer}>2D View</Dropdown.Item>
                        <Dropdown.Item onClick={props.chooseInteriorArranger}>3D View</Dropdown.Item>
                        <DropdownButton title="Panel" variant ="white" size="sm" className="Panel"  style={PanelStyle}>
                            <Dropdown.Item onClick={toggleFloor}>Floor</Dropdown.Item>
                            <Dropdown.Item onClick={toggleDoors}>Doors</Dropdown.Item>
                            <Dropdown.Item onClick={toggleWindows}>Windows</Dropdown.Item>
                        </DropdownButton>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={props.resetCamera}>Reset camera</Dropdown.Item>
                    </DropdownButton>
                    <button style={buttonStyle} className="navbar-button">Undo</button>
                    <button style={buttonStyle} className="navbar-button">Redo</button>
                    <button style={buttonStyle} className="navbar-button">Clear</button>
                    <button style={buttonStyle} className="navbar-button">Export</button>
                    <button style={buttonStyle} className="navbar-button">Import</button>
                </div>
                <div className="Mukul">
                    <button style={buttonStyle} className="navbar-button">Tutorial</button>
                    <button style={buttonStyle} className="navbar-button">Help</button>
                </div>
            </div>
            <div className="Mukul">
            <Draggable>
                    <ContentContainer showFloor={showFloor} showDoors={showDoors} showWindows={showWindows} />
                </Draggable>
            </div>
        </div>
    );
};

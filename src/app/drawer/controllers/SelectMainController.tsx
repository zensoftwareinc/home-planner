import React, {useContext, useEffect} from "react";
import { MainFactoryComponentProps } from "./ControllerFactory";
import {FloorPlanContext, MainControllerType} from "./FloorPlanMainController";
import { Dropdown } from "react-bootstrap";

import {SECONDARY_VARIANT} from "../../arranger/constants/Types";
import './SelectMainController.css'
export const SelectMainController: React.FC<MainFactoryComponentProps<MainControllerType>> = ({ setType }) => {
    const context = useContext(FloorPlanContext);
    if (context === undefined) {
        throw new Error("Context in SelectMainController is undefined.");
    }

    useEffect(() => {
        context.changeMenuName(MainControllerType.SELECT);
    }, [context.changeMenuName]);

    const selectWalls = () => {
        setType(MainControllerType.WALLS);
    };

    const selectWindowsAndDoors = () => {
        setType(MainControllerType.WINDOWS_AND_DOORS);
    };

    const selectFloors = () => {
        setType(MainControllerType.FLOORS);
    };

    return (
        <div className="Mukul1 side-by-side-parent">
            <div className="custom-dropdown">
                <Dropdown>
                    <Dropdown.Toggle variant={SECONDARY_VARIANT} id="dropdown-basic">
                        Floor Plans
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdup">
                        <Dropdown.Item onClick={selectWalls}>{MainControllerType.WALLS}</Dropdown.Item>
                        <Dropdown.Item onClick={selectWindowsAndDoors}>{MainControllerType.WINDOWS_AND_DOORS}</Dropdown.Item>
                        <Dropdown.Item onClick={selectFloors}>{MainControllerType.FLOORS}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );

};


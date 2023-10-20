import React, {useContext, useEffect, useState} from "react";
import { WallDrawingIH } from "../IO/inputHandlers/wallDrawing/WallDrawingIH";
import { FactorySubcomponentProps } from "./ControllerFactory";
import {FloorPlanContext, MainControllerType} from "./FloorPlanMainController";
import {Button} from "react-bootstrap";
import {PRIMARY_VARIANT, SECONDARY_VARIANT, SELECTED_VARIANT} from "../../arranger/constants/Types";
import {VoidIH} from "../../common/canvas/inputHandler/VoidIH";
import {IInputHandler} from "../../common/canvas/inputHandler/IInputHandler";
import {RemoveObjectIH} from "../IO/inputHandlers/RemoveObjectIH";
import { Dropdown } from "react-bootstrap"; 

enum Menu {
    ADD = "Add wall",
    DELETE = "Remove wall",
}

export const WallController: React.FC<FactorySubcomponentProps> = ({ goBack }) => {
  
    const context = useContext(FloorPlanContext);

    if (context === undefined) {
        throw new Error("Context in WallController is undefined.");
    }


    useEffect(() => {
        context.changeMenuName(MainControllerType.WALLS);
    }, [context.changeMenuName]);
    
    const [menu, setMenu] = useState<Menu>();
    const [inputHandler, setInputHandler] = useState<IInputHandler>(new VoidIH());
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleCancel = () => {
        inputHandler.handleCancel();
    };

    useEffect(() => {
        switch (menu) {
            case Menu.ADD:
                setInputHandler(new WallDrawingIH(context.wallDrawer));
                break;
            case Menu.DELETE:
                setInputHandler(new RemoveObjectIH(context.wallRemover));
                break;
            default:
                setInputHandler(new VoidIH());
        }
    }, [menu, context.wallDrawer]);

    useEffect(() => {
        context.mainInputHandler.changeHandlingStrategy(inputHandler);
    }, [inputHandler, context.mainInputHandler]);

    useEffect(() => () => {
        handleCancel();
        context.mainInputHandler.detachCurrentHandler();
    }, [inputHandler, context.mainInputHandler]);

    const cancelButton = menu !== Menu.ADD ? null :
        <Button onClick={handleCancel} variant={PRIMARY_VARIANT} className="side-by-side-child btn-sm">
            Cancel
        </Button>;

    return (
        <>
        {/* from Here We Can Make the the Back Button Enable. */}
            <div className="side-by-side-parent">
                <Button onClick={goBack} variant={PRIMARY_VARIANT} className="side-by-side-child btn-sm">
                    Back
                </Button>
                {cancelButton}
            </div>
             <div className="side-by-side-parent">
        <Dropdown
          show={isDropdownOpen}
          onToggle={(isOpen) => setDropdownOpen(isOpen)}
        >
          <Dropdown.Toggle
            variant={PRIMARY_VARIANT}
            id="dropdown-basic"
            className="btn-sm"
          >
            {menu === Menu.ADD ? "Add Wall" : "Select Action"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setMenu(Menu.ADD);
                setDropdownOpen(false);
              }}
            >
              Add Wall
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setMenu(Menu.DELETE);
                setDropdownOpen(false);
              }}
            >
              Remove Wall
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {menu === Menu.ADD ? (
          <Button
            onClick={handleCancel}
            variant={PRIMARY_VARIANT}
            className="side-by-side-child btn-sm"
          >
            Cancel
          </Button>
        ) : null}
      </div>
            <OperationSelection currentMenu={menu} setMenu={setMenu}/>
        </>
    );
};

type OperationSelectionProps = {
    currentMenu: Menu | undefined,
    setMenu: (value: Menu) => void,
}


const OperationSelection: React.FC<OperationSelectionProps> = ({ currentMenu, setMenu }) => {

    const addVariant = currentMenu === Menu.ADD ? SELECTED_VARIANT : SECONDARY_VARIANT;
    const deleteVariant = currentMenu === Menu.DELETE ? SELECTED_VARIANT : SECONDARY_VARIANT;

    return (
        <div className="side-by-side-parent">
            {/* <Button onClick={() => setMenu(Menu.ADD)} variant={addVariant} className="side-by-side-child btn-sm">
                {Menu.ADD}
            </Button>
            <Button onClick={() => setMenu(Menu.DELETE)} variant={deleteVariant} className="side-by-side-child btn-sm">
                {Menu.DELETE}
            </Button> */}
        </div>
    );
};

import React, {useContext, useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {InteriorArrangerContext} from "./InteriorArrangerMainController";
import {ObjectProps} from "../objects/ImportedObject";
import {ObjectTransformer} from "../components/ObjectTransformer";
import {SelectObjectIH} from "../IO/inputHandlers/SelectObjectIH";
import {PRIMARY_VARIANT, SELECTED_VARIANT, SECONDARY_VARIANT} from "../constants/Types";

type Props = {
    className?: string
    selectDefaultMenu: () => void,
    initialSelectedIndex?: number,
}

export const TransformObjectController: React.FC<Props> = ({selectDefaultMenu, initialSelectedIndex}) => {
    const context = useContext(InteriorArrangerContext);
    if (context === undefined) {
        throw new Error("Context in TransformObjectController is undefined.");
    }

    const [objectTransformer, setObjectTransformer] = useState(new ObjectTransformer(
        context.canvasState,
        context.interiorArrangerState,
        context.sceneObjectsState,
    ));
    const [indexSelection, setIndexSelection] = useState<number | undefined>(undefined);

    useEffect(() => {
        context.changeMenuName("Edytuj dodane obiekty");
    }, [context.changeMenuName]);

    useEffect(() => {
        context.interiorArrangerState.transformControls.setMode("translate");
        setObjectTransformer(new ObjectTransformer(
            context.canvasState,
            context.interiorArrangerState,
            context.sceneObjectsState,
        ));
        return () => {
            objectTransformer.stopTransforming();
        };
    }, [context.canvasState, context.sceneObjectsState, context.interiorArrangerState]);

    const selectObject = (index: number) => {
        const placedObject = context.sceneObjectsState.placedObjects.at(index);
        if (!placedObject) {
            throw new Error(`Selected invalid index: ${index} from placedObjects.`);
        }
        setIndexSelection(index);
        objectTransformer.startTransforming(placedObject);
        context.canvasState.mainInputHandler.detachCurrentHandler();
    };

    const cancelSelection = () => {
        objectTransformer.stopTransforming();
        setIndexSelection(undefined);
    };

    const deleteObject = (index: number) => {
        context.sceneObjectsState.placedObjects.splice(index, 1);
        context.updatePlacedObjectsToggle(prev => !prev);
        objectTransformer.removeObject();
        cancelSelection();
    };

    useEffect(() => {
        if (initialSelectedIndex !== undefined) {
            selectObject(initialSelectedIndex);
        }
    }, [initialSelectedIndex]);

    useEffect(() => {
        if (indexSelection === undefined) {
            context.canvasState.mainInputHandler.changeHandlingStrategy(new SelectObjectIH(
                context.interiorArrangerState.cameraHandler.getCamera(),
                context.sceneObjectsState.placedObjects,
                selectObject
            ));
        }
        return () => {
            context.canvasState.mainInputHandler.detachCurrentHandler();
        };
    }, [indexSelection, context.canvasState]);

    let cancelButton = null;
    if (indexSelection !== undefined) {
        cancelButton = (
            <Button
                onClick={() => cancelSelection()}
                variant={PRIMARY_VARIANT}
                className="side-by-side-child btn-sm"
            >
                Anuluj
            </Button>
        );
    }

    return (
        <>
            <div className="side-by-side-parent">
                <Button
                    onClick={selectDefaultMenu}
                    variant={PRIMARY_VARIANT}
                    className="side-by-side-child btn-sm"
                >
                    Powrót
                </Button>
                {cancelButton}
            </div>
            <SelectObjects
                placedObjects={context.sceneObjectsState.placedObjects}
                objectIndex={indexSelection}
                handleIndexSelection={selectObject}
            />
            <TransformMode
                indexSelection={indexSelection}
                objectTransformer={objectTransformer}
                deleteObject={deleteObject}
            />
        </>
    );
};

type SelectObjectProps = {
    placedObjects: Array<ObjectProps>,
    objectIndex: number | undefined,
    handleIndexSelection: (index: number) => void,
}

const SelectObjects: React.FC<SelectObjectProps> = ({
                           placedObjects,
                           objectIndex,
                           handleIndexSelection,
}) => {
    if (placedObjects.length === 0) {
        return (<p>Brak obiektów do edycji, dodaj obiekt.</p>);
    }

    return (
        <div>
            {placedObjects.map((object, index) => {
                    let buttonVariant = SECONDARY_VARIANT;
                    if (objectIndex === index) {
                        buttonVariant = SELECTED_VARIANT;
                    }
                    return (
                        <Button
                            key={index}
                            onClick={() => handleIndexSelection(index)}
                            variant={buttonVariant}
                            className="btn-sm small side-by-side-child"
                        >
                            {object.name}
                        </Button>
                    );
                }
            )}
        </div>
    );
};

type TransformModeProps = {
    indexSelection: number | undefined,
    objectTransformer: ObjectTransformer,
    deleteObject: (index: number) => void,
}

const TransformMode: React.FC<TransformModeProps> = ({ objectTransformer, indexSelection, deleteObject }) => {
    if (indexSelection === undefined) {
        return null; // it's fine in this component as it's stateless
    }
    return (
        <>
            <div className="side-by-side-parent">
                <Button
                    onClick={() => objectTransformer.setToTranslateMode()}
                    variant={SECONDARY_VARIANT}
                    className="btn-sm side-by-side-child"
                >
                    Przesuwanie
                </Button>
                <Button
                    onClick={() => objectTransformer.setToRotateMode()}
                    variant={SECONDARY_VARIANT}
                    className="btn-sm side-by-side-child"
                >
                    Obracanie
                </Button>
                <Button
                    onClick={() => objectTransformer.resetTranslate()}
                    variant={SECONDARY_VARIANT}
                    className="btn-sm side-by-side-child"
                >
                    Resetuj pozycje do początkowej
                </Button>
                <Button
                    onClick={() => objectTransformer.resetRotation()}
                    variant={SECONDARY_VARIANT}
                    className="btn-sm side-by-side-child"
                >
                    Resetuj rotacje do początkowej
                </Button>
                <Button
                    onClick={() => deleteObject(indexSelection)}
                    variant={SECONDARY_VARIANT}
                    className="btn-sm side-by-side-child"
                >
                    Usuń obiekt
                </Button>
            </div>
        </>
    );
};
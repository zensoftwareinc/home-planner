import "../css/MainStyle.css";
import React, {useEffect, useState} from 'react';
import {WebGLRenderer} from 'three';
import {InteriorArrangerMainController} from "./controllers/InteriorArrangerMainController";
import {SceneObjectsState} from "../common/context/SceneObjectsDefaults";
import {ObjectProps} from "./objects/ImportedObject";
import {PlanToArrangerConverter} from "./components/converter/PlanToArrangerConverter";
import {disposeSceneObjects} from "../common/context/SceneOperations";
import {CanvasState} from "../common/context/CanvasDefaults";
import {ICameraHandler} from "../common/canvas/ICameraHandler";
import spinner from "../../loading-spinner.gif";
import {InteriorArrangerState} from "../../App";
import {ObjectWithEditableTexture} from "./objects/ArrangerObject";
import {LoadedTexture} from "../common/models/TextureDefinition";

export type ConvertedObjects = {
    wallFaces: Array<ObjectWithEditableTexture>,
    wallFrames: Array<ObjectWithEditableTexture>,
    floors: Array<ObjectWithEditableTexture>,
    ceilings: Array<ObjectWithEditableTexture>,
}

type Props = {
    className?: string,
    renderer: WebGLRenderer,
    canvasState: CanvasState,
    sceneObjects: SceneObjectsState,
    objectDefinitions: Array<ObjectProps>,
    textures: Array<LoadedTexture>,
    cameraHandler: ICameraHandler,
    interiorArrangerState: InteriorArrangerState,
}

export const InteriorArrangerStateParent: React.FC<Props> = ({
                                                                 canvasState,
                                                                 sceneObjects,
                                                                 objectDefinitions,
                                                                 textures,
                                                                 renderer,
                                                                 interiorArrangerState,
}) => {
    const [planObjectsConverter] = useState(new PlanToArrangerConverter());

    const [convertedObjects, setConvertedObjects] = useState<ConvertedObjects>();

    const [, updatePlacedObjectsToggle] = useState(false);

    useEffect(() => () => {
        disposeSceneObjects(canvasState.scene, renderer);
    }, [sceneObjects, canvasState]);

    useEffect(() => {

        if (sceneObjects.wallHeight === undefined) {
            return; // skip
        }

        const allConvertedObjects = planObjectsConverter.convertPlanObjects(sceneObjects, sceneObjects.wallHeight);

        const allMeshes = [
            ...allConvertedObjects.wallsWithEditableTexture.map(wfm => wfm.object3d),
            ...allConvertedObjects.wallCoverMeshes,
            ...allConvertedObjects.sceneWallComponents.models,
            ...allConvertedObjects.sceneWallComponents.framesWithEditableTextures.map(f => f.object3d),
            ...allConvertedObjects.sceneFloors.map(sf => sf.object3d),
            ...allConvertedObjects.sceneCeilings.map(sc => sc.object3d),
            ...sceneObjects.placedObjects.map(po => po.object3d),
        ];
        
        if (allMeshes.length > 0) {
            canvasState.scene.add(...allMeshes);
        }

        setConvertedObjects({
            wallFaces: [...allConvertedObjects.wallsWithEditableTexture],
            wallFrames: [...allConvertedObjects.sceneWallComponents.framesWithEditableTextures],
            floors: [...allConvertedObjects.sceneFloors],
            ceilings: [...allConvertedObjects.sceneCeilings],
        });
    }, [sceneObjects, canvasState]);

    if (sceneObjects.wallHeight === undefined) {
        return (<div className="h-100 d-flex justify-content-center align-items-center">It&apos;s required to first set wall height in the 2D View.</div>);
    }

    if (convertedObjects === undefined) {
        return (<div className="center-div-horizontally-and-vertically"><img src={spinner} alt="loading"/></div>);
    }

    return (
        <>
            <InteriorArrangerMainController
                className={"app-bottom-menu"}
                canvasState={canvasState}
                wallHeight={sceneObjects.wallHeight}
                sceneObjectsState={sceneObjects}
                interiorArrangerState={interiorArrangerState}
                objectDefinitions={objectDefinitions}
                textures={textures}
                updatePlacedObjectsToggle={updatePlacedObjectsToggle}
                convertedObjects={convertedObjects}
            />
        </>
    );
};

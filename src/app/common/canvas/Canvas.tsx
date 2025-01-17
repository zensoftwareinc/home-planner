import "../../css/MainStyle.css";

import React, {memo, useLayoutEffect, useRef,useState} from "react";
import {Scene, Vector3, WebGLRenderer,} from "three";
import {MainInputHandler} from "./inputHandler/MainInputHandler";
import {ICameraHandler} from "./ICameraHandler";
import {ICanvasObserver} from "./ICanvasObserver";
import {CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer";
import ContentContainer from "../persistance/controllers/ContentContainer";
import Floor from "../../../Components/Panel/Floor";
const PRIMARY_BUTTON = 0;

type Pointer = {
    onCanvas: boolean,
    vectorToUnproject: Vector3,
    clicked: boolean,
}

type Props = {
    scene: Scene,
    renderer: WebGLRenderer,
    labelRenderer: CSS2DRenderer,
    cameraHandler: ICameraHandler,
    mainInputHandler: MainInputHandler,
    observers: Array<ICanvasObserver>,
}

/**
 * Whole {@link Props} passed here consist of stateful objects, Component does not need to be rerendered.
 */
const CanvasBase: React.FC<Props> = (props: Props) => {
 
    const mount = useRef<HTMLDivElement>(null);

    function getOffsetPosition(event: PointerEvent, width: number, height: number) {
        const offsetLeft = mount?.current?.offsetLeft ?? 0;
        const offsetTop = mount?.current?.offsetTop ?? 0;
        const x = ((event.pageX - offsetLeft) / width) * 2 - 1;
        const y = -((event.pageY - offsetTop) / height) * 2 + 1;
        return {x, y};
    }

    useLayoutEffect(() => {

        let width: number;
        let height: number;
        let pointer: Pointer = {
            onCanvas: false,
            vectorToUnproject: new Vector3(),
            clicked: false,
        };

        init();

        function init() {
            width = mount?.current?.clientWidth ?? 0;
            height = mount?.current?.clientHeight ?? 0;

            // render in given space on webpage
            mount?.current?.appendChild(props.renderer.domElement);
            const offsetTop = mount?.current?.offsetTop ?? 0;
            const offsetLeft = mount?.current?.offsetLeft ?? 0;
            props.labelRenderer.domElement.style.position = "absolute";
            props.labelRenderer.domElement.style.top = offsetTop.toString() + "px";
            props.labelRenderer.domElement.style.left = offsetLeft.toString() + "px";
            mount?.current?.appendChild(props.labelRenderer.domElement);

            // listeners
            window.addEventListener("resize", handleResize);
            mount?.current?.addEventListener("pointermove", handlePointerMove);
            mount?.current?.addEventListener("pointerdown", handlePointerDown);
            mount?.current?.addEventListener("pointerenter", handlePointerEnter);
            mount?.current?.addEventListener("pointerleave", handlePointerLeave);

            animate();
            handleResize();
        }

        function animate() {
            render();
            requestAnimationFrame(animate);
        }

        function render() {
            props.observers.forEach(o => o.beforeRender());

            if (!pointer.onCanvas) {
                props.renderer.render(props.scene, props.cameraHandler.getCamera());
                props.labelRenderer.render(props.scene, props.cameraHandler.getCamera());
                return; // if pointer not on canvas then skip
            }

            const unprojection = pointer.vectorToUnproject.clone().unproject(props.cameraHandler.getCamera());

            if (pointer.clicked) {
                props.mainInputHandler.handleClick({
                    unprojected: unprojection,
                    canvasCoords: { x: pointer.vectorToUnproject.x, y: pointer.vectorToUnproject.y },
                });
                // the click was read
                pointer = {
                    onCanvas: pointer.onCanvas,
                    vectorToUnproject: pointer.vectorToUnproject.clone(),
                    clicked: false
                };
            } else {
                props.mainInputHandler.handleMovement({
                    unprojected: unprojection,
                    canvasCoords: { x: pointer.vectorToUnproject.x, y: pointer.vectorToUnproject.y },
                });
            }

            props.renderer.render(props.scene, props.cameraHandler.getCamera());
            props.labelRenderer.render(props.scene, props.cameraHandler.getCamera());
        }

        function handleResize() {
            width = mount?.current?.clientWidth ?? 0;
            height = mount?.current?.clientHeight ?? 0;
            const aspect = width / height;
            props.cameraHandler.setAspectRatio(aspect);
            props.renderer.setSize(width, height);
            props.labelRenderer.setSize(width, height);
            render();
        }

        /**
         * Keeps track of pointer position.
         * @param event move event
         */
        function handlePointerMove(event: PointerEvent) {
            const {x, y} = getOffsetPosition(event, width, height);
            pointer = {
                onCanvas: pointer.onCanvas,
                vectorToUnproject: new Vector3(x, y, 0),
                clicked: pointer.clicked
            };
        }

        /**
         * Switches pointer down and sets pointer position.
         * @param event down event
         */
        function handlePointerDown(event: PointerEvent) {
            if (event.button === PRIMARY_BUTTON) {
                const {x, y} = getOffsetPosition(event, width, height);
                pointer = {
                    onCanvas: pointer.onCanvas,
                    vectorToUnproject: new Vector3(x, y, 0),
                    clicked: true
                };
            }
        }

        function handlePointerEnter(event: PointerEvent) {
            const {x, y} = getOffsetPosition(event, width, height);
            pointer = {
                onCanvas: true,
                vectorToUnproject: new Vector3(x, y, 0),
                clicked: pointer.clicked
            };
        }

        function handlePointerLeave() {
            pointer = {
                onCanvas: false,
                vectorToUnproject: pointer.vectorToUnproject,
                clicked: pointer.clicked
            };
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            mount?.current?.removeEventListener("pointermove", handlePointerMove);
            mount?.current?.removeEventListener("pointerdown", handlePointerDown);
            mount?.current?.removeEventListener("pointerenter", handlePointerEnter);
            mount?.current?.removeEventListener("pointerleave", handlePointerLeave);
        };
    }, [props]);
    
    return (<>
        <div>
        <div className="app-canvas" ref={mount}  >    
        <ContentContainer showFloor={false} showDoors={false} showWindows={false} />
          
        </div>
        </div>
        </>
    );

};

export const Canvas = memo(CanvasBase, (prev, next) => {
    return (prev.scene === next.scene) && (prev.cameraHandler === next.cameraHandler);
});

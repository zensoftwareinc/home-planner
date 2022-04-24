import "../../css/MainStyle.css";

import React, { memo, useLayoutEffect, useRef } from "react";

import {
  DirectionalLight,
  GridHelper,
  HemisphereLight,
  OrthographicCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  WebGLRendererParameters
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MainInputHandler } from "./inputHandlers/MainInputHandler";
import {ObjectElevation} from "../constants/Types";

type Pointer = {
  onCanvas: boolean,
  vectorToUnproject: Vector3,
  clicked: boolean,
}

type Props = {
  scene: Scene,
  mainInputHandler: MainInputHandler
}

// this is canvas, if there are similarities between room planner canvas then refactor
/**
 * Whole {@link Props} passed here consist of stateful objects, Component does not need to be rerendered.
 * @param param0 
 * @returns 
 */
const FloorPlanCanvasBase: React.FC<Props> = ({scene, mainInputHandler}: Props) => {

  const mount = useRef<HTMLDivElement>(null);
  const zoom = 0.75;

  useLayoutEffect(() => {
    let renderer: WebGLRenderer;
    let camera: OrthographicCamera;
    let width: number;
    let height: number;
    let hemiLight: HemisphereLight;
    let directLight: DirectionalLight;
    let controls: OrbitControls;

    const frustumSize = 18;

    let pointer: Pointer = { onCanvas: false, vectorToUnproject: new Vector3(), clicked: false };

    init();

    function init() {
      width = mount?.current?.clientWidth ?? 0;
      height = mount?.current?.clientHeight ?? 0;

      const renderParams: WebGLRendererParameters = {
        precision: "highp",
        antialias: true,
      };

      renderer = new WebGLRenderer(renderParams);
      const aspect = window.innerWidth / window.innerHeight;
      camera = new OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / - 2, frustumSize / 2, 0.1, 500);

      const grid = new GridHelper(100, 100, 0xbbbbbb, 0xbbbbbb);
      grid.position.setY(ObjectElevation.GRID);
      scene.add(grid);

      renderer.setSize(width, height);
  
      camera.position.set(0.0, 5.0, 0.0);
      camera.lookAt(0, 0, 0);
      camera.zoom = zoom;

      // controls = new OrbitControls(camera, renderer.domElement);

      // sample
      // const wall = Wall.create({length: 50, height: 20, width: 2});
      // scene.add(wall.mainWallFrame);

      // create window in a wall
      // windowOfWall = Window.create({x: 10, y: 0}, wall);
      // windowOfWall.translateX(5);



      // render in given space on webpage
      mount?.current?.appendChild(renderer.domElement);

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
      if (!pointer.onCanvas) {
        renderer.render(scene, camera);
        return; // if pointer not on canvas then skip
      }

      const unprojection = pointer.vectorToUnproject.clone().unproject(camera);

      if (pointer.clicked) {
        mainInputHandler.handleClick(unprojection);
        // the click was read
        pointer = {
          onCanvas: pointer.onCanvas,
          vectorToUnproject: pointer.vectorToUnproject.clone(),
          clicked: false
        };
      } else {
        mainInputHandler.handleMovement(unprojection);
      }
      renderer.render(scene, camera);
    }

    function handleResize() {
      width = mount?.current?.clientWidth ?? 0;
      height = mount?.current?.clientHeight ?? 0;
      const aspect = width / height;

      camera.left = - frustumSize * aspect / 2;
      camera.right = frustumSize * aspect / 2;
      camera.top = - frustumSize / 2;
      camera.bottom = frustumSize / 2;
      // camera.zoom = zoom;
      camera.updateProjectionMatrix();

      // controls.update();

      renderer.setSize(width, height);
      render();
    }

    /**
     * Keeps track of pointer position.
     * @param event move event
     */
    function handlePointerMove(event: PointerEvent) {
      const x = (event.clientX / width) * 2 - 1;
			const	y = -(event.clientY / height) * 2 + 1;
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
      const x = (event.clientX / width) * 2 - 1;
      const y = -(event.clientY / height) * 2 + 1;
      pointer = {
        onCanvas: pointer.onCanvas,
        vectorToUnproject: new Vector3(x, y, 0),
        clicked: true
      };
    }

    function handlePointerEnter(event: PointerEvent) {
      const x = (event.clientX / width) * 2 - 1;
			const	y = -(event.clientY / height) * 2 + 1;
      pointer = {
        onCanvas: true,
        vectorToUnproject: new Vector3(x, y, 0),
        clicked: pointer.clicked
      };
    }

    function handlePointerLeave(event: PointerEvent) {
      pointer = {
        onCanvas: false,
        vectorToUnproject: pointer.vectorToUnproject,
        clicked: pointer.clicked
      };
    }

  }, []);

  return (
    <div className="Render" ref={mount}/>
  );

};

export const FloorPlanCanvas = memo(FloorPlanCanvasBase);
import { OrbitControls, useHelper } from "@react-three/drei";
import { Canvas, useFrame, useStore, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { DirectionalLightHelper } from "three";
import { Leva, useControls } from "leva";
import { useMediaQuery } from "react-responsive";
import Rasengan from "./Rasengan";
import CanvasLoader from "./CanvasLoader";
export default function EmptyChat() {
  // const controls = useControls("Rasengan", {
  //   positionX: {
  //     value: 2.5,
  //     min: -10,
  //     max: 10,
  //   },
  //   positionY: {
  //     value: 2.5,
  //     min: -10,
  //     max: 10,
  //   },
  //   positionZ: {
  //     value: 2.5,
  //     min: -10,
  //     max: 10,
  //   },
  //   rotationX: {
  //     value: 0,
  //     min: -10,
  //     max: 10,
  //   },
  //   rotationY: {
  //     value: 0,
  //     min: -10,
  //     max: 10,
  //   },
  //   rotationZ: {
  //     value: 0,
  //     min: -10,
  //     max: 10,
  //   },
  //   scale: {
  //     value: 1,
  //     min: 0.1,
  //     max: 10,
  //   },
  // });
  const isMobile = useMediaQuery({ maxWidth: 1200 });
  const transitionPage = useMediaQuery({ maxWidth: 940 });

  // const OrbitControlsComponent = () => {
  //   const {
  //     camera,
  //     gl: { domElement },
  //   } = useThree();
  //   const controls = useRef();
  //   useFrame((state) => controls.current.update());
  //   return (
  //     <OrbitControls
  //       enableZoom={false}
  //       ref={controls}
  //       args={[camera, domElement]}
  //     ></OrbitControls>
  //   );
  // };
  return (
    <div
      className={`relative flex-1 flex-col min-h-screen ${
        transitionPage ? "hidden" : "flex"
      }  bg-[#0E0E10] justify-center items-center px-2`}
    >
      <div className="absolute flex w-full h-full">
        {/* <Leva></Leva> */}
        <Canvas>
          <Suspense fallback={<CanvasLoader />}>
            <perspectiveCamera
              makeDefault
              position={[0, 0, 20]}
            ></perspectiveCamera>
            <Rasengan
              // scale={1}
              // position={[0, 0, 0]}
              // rotation={[0, -Math.PI / 2, 0]}
              position={[0, 0.1, 1.7]}
              scale={isMobile ? 0.65 : 0.85}
              rotation={[0, -Math.PI, 0]}
            ></Rasengan>

            <ambientLight intensity={1}></ambientLight>
            <directionalLight
              position={[10, 10, 10]}
              intensity={0.5}
            ></directionalLight>
            <OrbitControls
              enableZoom={false}
              // domElement={document.body}
              enablePan={false}
            ></OrbitControls>
            {/* <OrbitControlsComponent></OrbitControlsComponent> */}
          </Suspense>
        </Canvas>
      </div>
      <div className=" font-bold text-3xl lg:text-4xl text-center mt-auto mb-32">
        <span className="">Youkoso ようこそ (Welcome) to </span>
        <span className="text-[#00eeff]">Rasengan</span>
        <p className="text-lg text-[#00eeff] mt-2">
          (Move around the Rasenagn)
        </p>
      </div>
    </div>
  );
}

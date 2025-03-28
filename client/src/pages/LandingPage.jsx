import React, { Suspense, useRef } from "react";
import spotlight from "../images/spotlight4.png";
import image from "../images/icons/newrasengan.png";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import CanvasLoader from "../components/CanvasLoader";
import ComputerModel from "../components/Landing Page/ComputerModel";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export const landingPageData = {
  title: "RAS-SEND-GAN",
  info: "A modern and sleek one-to-one messenger application inspired by the anime Naruto.",
  features: [
    "File sharing and downloading",
    "Voice recording",
    "Message replies",
    "Unread messages notifications",
    "Online/Offline status indication",
  ],
};
export default function LandingPage() {
  const mediaSize = useMediaQuery({ minWidth: 1024 });
  const naviate = useNavigate();
  const headingRef = useRef();
  const subHeadingRef = useRef();
  const infoRef = useRef();
  const rasenganRef = useRef();
  const pointRef = useRef();
  const tl = gsap.timeline({
    repeat: false,
  });
  useGSAP(() => {
    if (headingRef.current && subHeadingRef.current && infoRef.current) {
      tl.fromTo(
        headingRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          ease: "back.in",
        }
      )
        .fromTo(
          infoRef.current,
          {
            y: -20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power1.inOut",
          }
        )
        .fromTo(
          subHeadingRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power1.inOut",
          }
        )
        .fromTo(
          "#feature",
          {
            x: -100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.5,
            stagger: {
              amount: 1,
              from: "start",
            },
            ease: "power2.inOut",
          }
        );
    }
  }, []);
  useGSAP(() => {
    let mm = gsap.matchMedia();

    if (rasenganRef.current) {
      gsap.to(rasenganRef.current, {
        rotate: 360,
        duration: 1.5,
        delay: 0.5,
        repeat: -1,
        // yoyo: true,
        ease: "circ.inOut",
      });
    }
    if (pointRef.current) {
      mm.add("(max-width: 1024px)", () => {
        gsap.fromTo(
          pointRef.current,
          {
            y: -2.5,
          },
          {
            y: 2.5,
            yoyo: true,
            duration: 0.5,
            delay: 0.5,
            repeat: -1,
            ease: "circ.inOut",
          }
        );
      });
      mm.add("(min-width: 1023px)", () => {
        gsap.fromTo(
          pointRef.current,
          {
            x: -2,
          },
          {
            x: 2,
            yoyo: true,
            duration: 0.5,
            delay: 0.5,
            repeat: -1,
            ease: "circ.inOut",
          }
        );
      });
    }
  });
  return (
    <section className="container mx-auto min-h-screen flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full my-12  mx-4">
        <div className=" relative border-black border p-8 rounded-lg">
          <div className="absolute top-0 right-0">
            <img src={spotlight} alt="" className="w-full object-cover " />
          </div>
          <div className="rounded-md bg-[rgba(0,238,255)]/20 shadow-[0_0px_18px_rgba(0,238,255)] w-fit my-5">
            <img ref={rasenganRef} className="w-14 " src={image} alt="" />
          </div>
          <div className="tracking-tighter text-white flex flex-col gap-4 my-8">
            <h1 className=" font-bold text-3xl" ref={headingRef}>
              {landingPageData.title}
            </h1>
            <article className="flex flex-col gap-6 ">
              <p className="italic font-semibold" ref={infoRef}>
                {landingPageData.info}
              </p>
              <h3 className="text-xl font-bold" ref={subHeadingRef}>
                Key Features
              </h3>
              <ul className="flex flex-col gap-3 ">
                {landingPageData.features.map((feature, index) => {
                  return (
                    <li
                      id="feature"
                      key={index + feature}
                      className="text-white bg-black shadow-sm shadow-white 
                    rounded-md px-2 py-1 font-semibold ml-4 max-w-80"
                    >
                      {feature}
                    </li>
                  );
                })}
              </ul>
            </article>
            <button
              onClick={() => {
                naviate("/login");
              }}
              className=" relative group self-end max-w-fit mt-6 hover-button  text-sm font-bold py-2.5
               px-6 border-2 border-[rgba(0,238,255)] hover:border-[#FFFF] rounded-md"
            >
              <span
                className=" relative before:absolute before:top-[100%] before:left-0 before:right-0 before:mx-auto before:my-0 before:h-4/5 before:w-3/4
        before:bg-white before:opacity-0 before:[transform:perspective(10px)_rotateX(10deg)_scale(0.92,0.48)] before:blur-[0.9em] group-hover:before:opacity-100 "
              >
                Login
              </span>
              {/* Login */}
            </button>
            <p className="tracking-tight self-end font-semibold">
              The 3D computer is movable{" "}
              <span className="inline-block ml-0.5" ref={pointRef}>
                {!mediaSize ? "👇" : "👉"}
              </span>
            </p>
          </div>
        </div>

        <div className="border border-black bg-white/5 rounded-lg h-96 md:h-full ">
          <Canvas>
            <ambientLight intensity={3}></ambientLight>
            <directionalLight position={[10, 10, 5]}></directionalLight>
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group
                  scale={2}
                  position={[0, -2.5, 0]}
                  rotation={[0, -0.1, 0]}
                >
                  <ComputerModel />
                </group>
              </Suspense>
            </Center>
            <OrbitControls
              maxPolarAngle={Math.PI / 2}
              enableZoom={false}
            ></OrbitControls>
          </Canvas>
        </div>
      </div>
    </section>
  );
}

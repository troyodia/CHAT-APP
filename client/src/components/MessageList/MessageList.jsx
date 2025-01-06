import rasengan from "../../images/icons/newrasengan.png";

import { useMediaQuery } from "react-responsive";
import { useAppStore } from "../../store";
import { useShallow } from "zustand/shallow";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
export default function MessageList({
  directMessageSection,
  sideBarFooter,
  addNewUserModal,
}) {
  const isMobile = useMediaQuery({ maxWidth: 1200 });
  const transitionPage = useMediaQuery({ maxWidth: 940 });
  const lg = useMediaQuery({ maxWidth: 1006 });
  const md = useMediaQuery({ maxWidth: 768 });
  const rasenganRef = useRef();
  const { displayDirectMessageModal } = useAppStore(
    useShallow((state) => ({
      displayDirectMessageModal: state.displayDirectMessageModal,
    }))
  );
  useGSAP(() => {
    gsap.to(rasenganRef.current, {
      x: 100,
      duration: 3,
      repeat: -1,
      yoyo: true,
      // ease: "bounce.inOut",
      ease: "steps(10)",
    });
  });
  return (
    <>
      <div
        className={`relative flex flex-col items-center  h-screen ${
          transitionPage ? "w-full" : lg ? "w-[350px]" : "w-[450px]"
        }  border-0 bg-[#010103]`}
      >
        <div className="flex items-center w-full mt-2 mb-10">
          <div className="w-20 ml-4">
            <img
              // className="transition ease-in-out delay-150 duration-300 hover:scale-[1.1]"
              src={rasengan}
              alt=""
              ref={rasenganRef}
            ></img>
          </div>
          <div className=" ml-auto mr-24 font-bold text-3xl ">Rasengan</div>
        </div>
        {directMessageSection}
        {sideBarFooter}
      </div>
      {displayDirectMessageModal && addNewUserModal}
    </>
  );
}

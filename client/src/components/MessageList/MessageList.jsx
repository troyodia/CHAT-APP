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
  const transitionPage = useMediaQuery({ maxWidth: 940 });
  const rasenganResponsive = useMediaQuery({ maxWidth: 1150 });
  const rasenganRef = useRef();
  const { displayDirectMessageModal, selectedChatType } = useAppStore(
    useShallow((state) => ({
      displayDirectMessageModal: state.displayDirectMessageModal,
      selectedChatType: state.selectedChatType,
    }))
  );
  const hideContactListScreenSize = useMediaQuery({ maxWidth: 1070 });
  const changeTitleResponsive = useMediaQuery({ maxWidth: 499 });

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(max-width: 499px)", () => {
      gsap.to(rasenganRef.current, {
        rotate: 360,
        duration: 2,
        delay: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "bounce.inOut",
      });
    });
    mm.add("(min-width: 500px) and (max-width: 941px)", () => {
      gsap.to(rasenganRef.current, {
        x: 200,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "steps(8)",
        // ease: "bounce.inOut",
      });
    });
    mm.add("(min-width: 940px) and (max-width: 1150px)", () => {
      gsap.to(rasenganRef.current, {
        rotate: 360,
        duration: 2,
        delay: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "bounce.inOut",
      });
    });
    mm.add("(min-width: 1151px)", () => {
      gsap.to(rasenganRef.current, {
        x: 80,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "bounce.inOut",
      });
    });
  });

  return (
    <>
      <div
        className={`relative  flex-col items-center ${
          transitionPage ? "w-full" : "max-w-[400px] w-[400px]"
        } h-screen ${
          hideContactListScreenSize && selectedChatType !== undefined
            ? "hidden"
            : "flex"
        }
         border-0 bg-[#010103]`}
      >
        <div className="flex items-center w-full mt-2 mb-10">
          <div className={` w-20 ml-4`}>
            <img
              // className="transition ease-in-out delay-150 duration-300 hover:scale-[1.1]"
              src={rasengan}
              alt=""
              ref={rasenganRef}
            ></img>
          </div>
          <div
            className={`   ${rasenganResponsive ? "ml-4" : "ml-auto mr-20"} ${
              transitionPage ? "mr-auto ml-56" : ""
            } 
            ${changeTitleResponsive && transitionPage ? "ml-24" : ""}
  font-bold text-3xl  `}
          >
            Rasengan
          </div>
        </div>
        {directMessageSection}
        {sideBarFooter}
      </div>
      {displayDirectMessageModal && addNewUserModal}
    </>
  );
}

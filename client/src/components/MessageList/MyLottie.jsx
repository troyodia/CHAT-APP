import React from "react";
import * as animationData from "../../lottie/lottie.json";
import Lottie from "react-lottie";

export default function MyLottie() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Lottie
      options={defaultOptions}
      height={200}
      width={200}
      isClickToPauseDisabled={true}
    />
  );
}

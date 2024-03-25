"use client";

import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <ScaleLoader
        height={35}
        radius={2}
        margin={2}
        width={4}
        loading={true}
        speedMultiplier={1}
        color="black"
      />
    </div>
  );
};

export default Loader;

import React from "react";

const Loader = () => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[99999]">
      <div className="h-20 w-20 border-2 rounded-[50%] border-t-[0px] border-black animate-spin">
        {/* Loader */}
      </div>
    </div>
  );
};

export default Loader;

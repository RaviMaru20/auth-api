import React from "react";
import Samp from "./samp";
import Sample from "./sample";

const App = () => {
  return (
    <div className="bg-gray-600 h-dvh text-3xl flex flex-wrap justify-center items-center text-white w-full">
      <div className="bg-black w-1/2 h-56">Base APP</div>
      <Samp />
      <Sample />
    </div>
  );
};

export default App;

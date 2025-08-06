import React from 'react'
import "./Loader.css"

const Loader = () => {
  return (
    <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white dark:bg-slate-900 z-50 w-screen h-screen">
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;




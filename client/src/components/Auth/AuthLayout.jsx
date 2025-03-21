import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
 return (
    <div className="flex items-center justify-center w-full py-10 h-screen">
      <div className=" flex flex-col w-full items-center justify-center flex-1 bg-black h-screen text-white">
        <h1 className="text-4xl">Welcome to Shopping World</h1>
        <h1 className="text-2xl">Jump Now....</h1>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

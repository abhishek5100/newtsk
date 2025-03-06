import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-6">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;

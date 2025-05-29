import React from "react";
import { Outlet } from "react-router-dom";
import LandingNavbar from "../section/landingNavbar/landingNavbar";

const ProjectLayout = () => {
  return (
    <div className="landingPage">
      <header className="header">
        <LandingNavbar />
      </header>

      <Outlet />
      
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Project Repository. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default ProjectLayout;

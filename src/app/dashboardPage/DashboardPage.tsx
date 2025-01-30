import React from "react";
import { NavLink } from "react-router-dom";

const DashboardPage: React.FC = () => {
  return (
    <>
      {" "}
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Login
      </NavLink>
      <h2>Dashboard Page</h2>
    </>
  );
};

export default DashboardPage;

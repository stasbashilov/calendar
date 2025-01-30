import React from "react";
import { LoginForm } from "./components/LoginForm";
import {NavLink} from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Dashboard
      </NavLink>
      <LoginForm />
    </>
  );
};

export default LoginPage;

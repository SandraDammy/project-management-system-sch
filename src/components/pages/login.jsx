import React from "react";
import schLogo from "../../Assets/Image/schLogo.png";
import LoginForm from "../section/loginForm/loginForm";
import { useLocation } from "react-router-dom";

const Login = () => {
    const location = useLocation();
  const role = location.state?.role || "guest";
  return (
    <div className="loginPage">
      <div className="loginImg">
        <img
          src={schLogo}
          alt="schLogo"
          width={400}
          height={350}
          priority={true}
        />
        <h1>University of Lagos </h1>
      </div>
      <div className="loginForm">
        <LoginForm role={role}/>
      </div>
    </div>
  );
};

export default Login;

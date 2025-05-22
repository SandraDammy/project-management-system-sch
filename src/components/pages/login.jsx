import React from "react";
import schLogo from "../../Assets/Image/schLogo.png";
import LoginForm from "../section/loginForm/loginForm";

const Login = () => {
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
          <LoginForm />
        </div>
    </div>
  );
};

export default Login;
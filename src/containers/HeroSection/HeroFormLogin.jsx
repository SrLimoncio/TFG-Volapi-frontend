import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.js";

import { request_login } from "../../services/AuthService.js";

import FormFloatWithCheck from "../../components/Forms/FormFloatWithCheck.jsx";

import "./heroformlogin.css";

const HeroFormLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validLogin, setValidLogin] = useState(true);
  const [msgErrorLogin, setMsgErrorLogin] = useState("");

  const handleLogin = async () => {
    try {
      const response = await request_login(email, password);

      if (response.data.success){
        setValidLogin(true);
        setMsgErrorLogin("");

        const token = response.data.token;
        
        login(token);

        // Redirige al usuario a la otra página después del inicio de sesión exitoso
        // navigate("/menu");

      } else{
        console.error("Error en el inicio de sesión: ", response.data.message);
      }

    } catch (error) {
      // Si es un error de respuesta del servidor
      if (error.response) {
        console.error(error.response.data.message);
        if (error.response.status === 401) {
          const error_login = error.response.data.message;
          if (error_login) {
            setValidLogin(false);
            setMsgErrorLogin(error_login);
          } else {
            setValidLogin(true);
            setMsgErrorLogin("");
          }
        }

      } else {
        console.error(error.message);
      }
    }
  };

  const updateEmail = (newValue) => {
    setEmail(newValue);
  };
  const updatePassword = (newValue) => {
    setPassword(newValue);
  };

  return (
    <div className="section-form-login">
      <div className="titleform">Login !</div>
      <div className="form-text">{msgErrorLogin}</div>
      <FormFloatWithCheck
        type={"email"}
        id={"inputLoginEmail"}
        placeholder={"name@example.com"}
        textLabel={"Email address"}
        isValid={validLogin}
        updateInput={updateEmail}
      />
      <FormFloatWithCheck
        type={"password"}
        id={"inputPassword"}
        placeholder={"password"}
        textLabel={"Password"}
        isValid={validLogin}
        updateInput={updatePassword}
      />
      <div className="btn btn-default-big" onClick={handleLogin}>
        Login
      </div>
    </div>
  );
};

export default HeroFormLogin;

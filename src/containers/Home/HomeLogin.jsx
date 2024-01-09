import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.js";
import { login_user } from "../../services/AuthService.js";

import FormFloatWithCheck from "../../components/Forms/FormFloatWithCheck.jsx";

import "./homelogin.css";

const HomeLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validLogin, setValidLogin] = useState(true);
  const [msgErrorLogin, setMsgErrorLogin] = useState("");

  useEffect(() => {
    setValidLogin(true);
    setMsgErrorLogin("");
  }, [email, password]);

  const handleLogin = async () => {
    try {
      const response = await login_user(email, password);

      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;

      login(access_token, refresh_token);

      setValidLogin(true);
      setMsgErrorLogin("");
      setEmail("");
      setPassword("");

      navigate("/menu", { replace: true });

    } catch (error) {
      if (!error?.response) {
        setMsgErrorLogin("No Server Response");
      } else if (error.response?.status === 400) {
        setMsgErrorLogin("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setMsgErrorLogin("Unauthorized");
      } else {
        setMsgErrorLogin("Login Failed");
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

      <div className="login-msg-error">{msgErrorLogin}</div>

      <button className="btn btn-default-big" onClick={handleLogin}>
        Login
      </button>

      <p>
        Need an Account?
        <Link to="/home/register" className="text_link">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default HomeLogin;

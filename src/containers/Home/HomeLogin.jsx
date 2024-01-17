import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import toast from 'react-hot-toast';

import { useAuth } from "../../context/AuthContext.js";
import { login_user } from "../../services/AuthService.js";

import FormFloatWithCheck from "../../components/Forms/FormFloatWithCheck.jsx";

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

      toast.success('Successful login. Redirecting...', {
        duration: 4000
      });

      navigate("/menu", { replace: true });

    } catch (error) {
      console.log(error?.response?.status)
      setValidLogin(false);
      if (error?.response?.status === 400 ||
        error?.response?.status === 401) {
        setMsgErrorLogin("Incorrect username or password");
        toast.error('Incorrect username or password', {
          duration: 4000
        });
      } else {
        setMsgErrorLogin("Error during login");
        toast.error('Error during login', {
          duration: 4000
        });
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
    <div className="home-form-container ">
      <div className="home-form-title">Login !</div>
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

      <div className="home-form-msgerror">{msgErrorLogin}</div>

      <button className="btn btn-default-big" onClick={handleLogin}>
        Begin analysis.
      </button>

      <p>
        Need an Account?
        <Link to="/home/register" className="home-form-textlink">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default HomeLogin;

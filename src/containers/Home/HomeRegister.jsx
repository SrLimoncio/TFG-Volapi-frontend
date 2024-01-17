import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

import { register } from "../../services/AuthService.js";

import FormFloatWithCheck from "../../components/Forms/FormFloatWithCheck.jsx";

const HomeRegister = ({ redirectToLogin }) => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [msgErrorEmail, setMsgErrorEmail] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [msgErrorPassword, setMsgErrorPassword] = useState("");

  const [password2, setPassword2] = useState("");
  const [validPassword2, setValidPassword2] = useState(true);
  const [msgErrorPassword2, setMsgErrorPassword2] = useState("");

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(true);
  const [msgErrorUsername, setMsgErrorUsername] = useState("");

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(true);
  const [msgErrorName, setMsgErrorName] = useState("");

  const handleRegister = async () => {
    try {
      const response = await register(
        email,
        password,
        password2,
        username,
        name
      );

      setValidEmail(true);
      setMsgErrorEmail("");

      setValidPassword(true);
      setMsgErrorPassword("");

      setValidPassword2(true);
      setMsgErrorPassword2("");

      setValidUsername(true);
      setMsgErrorUsername("");

      setValidName(true);
      setMsgErrorName("");

      toast.success('Successful registration. Redirecting...', {
        duration: 4000
      });
      // Redirige al usuario a la página de inicio de sesión u otra página
      redirectToLogin();

    } catch (error) {
      console.error("Error en el registro");

      // Si es un error de respuesta del servidor
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('Error in the registration. Please check the fields.', {
            duration: 4000
          });

          const error_fields = error.response.data.error_fields;
          if (error_fields.email) {
            setValidEmail(false);
            setMsgErrorEmail(error_fields.email);
          } else {
            setValidEmail(true);
            setMsgErrorEmail("");
          }
          if (error_fields.password) {
            setValidPassword(false);
            setMsgErrorPassword(error_fields.password);
          } else {
            setValidPassword(true);
            setMsgErrorPassword("");
          }
          if (error_fields.password2) {
            setValidPassword2(false);
            setMsgErrorPassword2(error_fields.password2);
          } else {
            setValidPassword2(true);
            setMsgErrorPassword2("");
          }
          if (error_fields.username) {
            setValidUsername(false);
            setMsgErrorUsername(error_fields.username);
          } else {
            setValidUsername(true);
            setMsgErrorUsername("");
          }
          if (error_fields.name) {
            setValidName(false);
            setMsgErrorName(error_fields.name);
          } else {
            setValidName(true);
            setMsgErrorName("");
          }
        }
      }
    }
  };

  const updateEmail = (newValue) => {
    setEmail(newValue);
  };
  const updatePassword = (newValue) => {
    setPassword(newValue);
  };
  const updatePassword2 = (newValue) => {
    setPassword2(newValue);
  };
  const updateUsername = (newValue) => {
    setUsername(newValue);
  };
  const updateName = (newValue) => {
    setName(newValue);
  };

  return (
    <div className="home-form-container">
      <div className="home-form-title">Register !</div>
      <FormFloatWithCheck
        type={"email"}
        id={"inputRegEmail"}
        placeholder={"name@example.com"}
        textLabel={"Email address"}
        isValid={validEmail}
        textError={msgErrorEmail}
        updateInput={updateEmail}
      />
      <FormFloatWithCheck
        type={"password"}
        id={"inputRegPassword"}
        placeholder={"Password"}
        textLabel={"Password"}
        isValid={validPassword}
        textError={msgErrorPassword}
        updateInput={updatePassword}
      />
      <FormFloatWithCheck
        type={"password"}
        id={"inputRegPassword2"}
        placeholder={"Repeat password"}
        textLabel={"Repeat password"}
        isValid={validPassword2}
        textError={msgErrorPassword2}
        updateInput={updatePassword2}
      />
      <FormFloatWithCheck
        type={"text"}
        id={"inputRegUsername"}
        placeholder={"Username"}
        textLabel={"Username"}
        isValid={validUsername}
        textError={msgErrorUsername}
        updateInput={updateUsername}
      />
      <FormFloatWithCheck
        type={"text"}
        id={"inputRegName"}
        placeholder={"Name and Surnames"}
        textLabel={"Name and Surnames"}
        isValid={validName}
        textError={msgErrorName}
        updateInput={updateName}
      />

      <div className="btn btn-default-big" onClick={handleRegister}>
        Register
      </div>

      <p>
        Already registered?{" "}
        <Link to="/home/login" className="home-form-textlink">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default HomeRegister;

import React from "react";

import { Route, Routes, Navigate  } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";

import Navbar from "./components/NavBar/Navbar";
import Menu from "./pages/Menu";

import Home from "./pages/Home";
import HomeRegister from "./containers/Home/HomeRegister";
import HomeLogin from "./containers/Home/HomeLogin";

import DashBoard from "./pages/DashBoard";
import DashboardProjects from "./containers/Dashboard/DashboardProjects";
import DashboardProfile from "./containers/Dashboard/DashboardProfile";

import InfoCmd from "./pages/InfoCmd";

import Error404 from "./pages/errorpages/Error404";
import Error500 from "./pages/errorpages/Error500";


const App = () => {
  return (
    <div className="">
      <Navbar />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <AuthProvider>
        <ProjectProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/home/login" replace />} />

            <Route path="/home" element={<Home />}>
              <Route path="login" element={<HomeLogin />} />
              <Route path="register" element={<HomeRegister />} />
            </Route>

            <Route
              path="/menu"
              element={
                <PrivateRoute requireProject={true}>
                  <Menu />
                </PrivateRoute>
              }
            />
            <Route
              path="/command/:id"
              element={
                <PrivateRoute requireProject={true}>
                  <InfoCmd />
                </PrivateRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashBoard />
                </PrivateRoute>
              }
            >
              <Route
                path="profile"
                element={
                  <PrivateRoute>
                    <DashboardProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="projects"
                element={
                  <PrivateRoute>
                    <DashboardProjects />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route path="*" element={<Error404 />} />
            <Route path="/error500" element={<Error500 />} />
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </div>
  );
};

export default App;

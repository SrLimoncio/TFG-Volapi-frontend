import React from "react";

import { Route, Routes, Navigate  } from "react-router-dom";

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
import Error404 from "./pages/Error404";

const App = () => {
  return (
    <div className="">
      <Navbar />

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
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </div>
  );
};

export default App;

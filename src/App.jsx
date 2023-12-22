import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';

import Menu from './pages/Menu';
import LaunchPage from "./pages/LaunchPage";
import DashBoard from './pages/DashBoard';
import InfoCmd from "./pages/InfoCmd";

const App = () => {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Routes>
            <Route path="/" element={<LaunchPage />} />
            {/*<Route path="*" element={<NotFound />} />*/}
        </Routes>
        <PrivateRoute>
          <Routes>
              {/*<Route path="/" element={<LaunchPage />} />*/}
              <Route path="/command/:id" element={<InfoCmd />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/menu" element={<Menu />} />
          </Routes>
        </PrivateRoute>
      </ProjectProvider>
    </AuthProvider>
  );
};

export default App;
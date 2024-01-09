import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProject } from '../context/ProjectContext';

const PrivateRoute = ({ children, requireProject = false }) => {
  const { isAuthenticated, isCheckingToken } = useAuth();
  const { userHasProject, isCheckingHasProject } = useProject();

  //console.log("Name: ", children.type.name);
  //console.log("PrivateRoute isAuthenticated:", isAuthenticated);
  //console.log("PrivateRoute userHasProject: ", userHasProject);

  //console.log("isCheckingToken: ", isCheckingToken)
  //console.log("isCheckingHasProject: ", isCheckingHasProject)

  if ( !isAuthenticated && !isCheckingToken ) {
    return <Navigate to="/home/login" />;
  }
  
  if (requireProject && !userHasProject && !isCheckingHasProject ) {
    return <Navigate to="/dashboard/projects" />;
  }

  if ( isCheckingToken || isCheckingHasProject ) {
    return <h1>Cargando...</h1>; // O cualquier componente de carga
  }

  return children;
};

export default PrivateRoute;

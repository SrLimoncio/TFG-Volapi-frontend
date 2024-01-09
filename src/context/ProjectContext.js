import React, { createContext, useContext, useState, useEffect } from "react";
import { checkUserHasProject } from "../services/DashboardService";
import { useAuth } from './AuthContext';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [hasProject, setHasProject] = useState({
    userHasProject: false,
    isCheckingHasProject: false
  });
  const { isAuthenticated } = useAuth();

  useEffect(() => {
      const fetchUserProjects = async () => {
        setHasProject(prev => ({ ...prev, isCheckingHasProject: true }));

        // Si no esta autentificado o aun esta checkeando el token, sale
        if ( !isAuthenticated) {
          return;
        }

        console.log("hola: ", isAuthenticated)
        try {
          const response = await checkUserHasProject();
          setHasProject(prev => ({ ...prev, userHasProject: response.data.success && response.data.hasProject }));

        } catch (error) {
          console.error("Error al obtener proyectos:", error);
          setHasProject(prev => ({ ...prev, userHasProject: false }));

        } finally {
          setHasProject(prev => ({ ...prev, isCheckingHasProject: false }));
        }
    };

    fetchUserProjects();
  }, [isAuthenticated]);

  const projectLogout = () => {
    setHasProject({ userHasProject: false, isCheckingHasProject: false});
  };

  return (
    <ProjectContext.Provider value={{ ...hasProject, projectLogout}}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);

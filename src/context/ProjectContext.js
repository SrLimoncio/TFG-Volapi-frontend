import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "./AuthContext";
import { getListProjects } from "../services/DashboardService";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        // Obtener proyectos del usuario si está autenticado
        if (isAuthenticated) {
          const jwtToken = Cookies.get("jwtToken");
          const headers = {
            Authorization: `Bearer ${jwtToken}`,
          };

          const response = await getListProjects(headers);
          if (response.data.success) {
            setUserProjects(response.data.projects);
          } else {
            console.error("Error al obtener proyectos:", response.data.message);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
        setLoading(false);
      }
    };

    fetchUserProjects();
  }, [isAuthenticated]);

  return (
    <ProjectContext.Provider value={{ userProjects, loading }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
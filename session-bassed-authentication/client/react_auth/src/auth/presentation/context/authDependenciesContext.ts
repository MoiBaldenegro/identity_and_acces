// src/infrastructure/context/AuthContext.tsx
import { createContext, useContext } from "react";
import type { AuthServiceContainer } from "../../infrastructure/containers/authServiceContainer";


// Definimos que el contexto puede tener el contenedor o ser null al inicio
export const AuthDependenciesContext = createContext<AuthServiceContainer | null>(null);

export const useAuthDependencies = () => {
  const context = useContext(AuthDependenciesContext);
  
  // Validación de seguridad: si olvidas poner el Provider en App.tsx, esto te avisa
  if (!context) {
    throw new Error("useAuthDependencies debe usarse dentro de un AuthDependenciesProvider");
  }
  
  return context;
};
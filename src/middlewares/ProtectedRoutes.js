import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

export const isAuth = () => {
  //Ci ritorna un true/false del token salvato in localStorage
  return JSON.parse(localStorage.getItem("loggedInUser"));
};

const ProtectedRoutes = () => {
  const auth = isAuth();
// la sessione esiste? Si, vai all'Outet, cioè qualsiasi componente figlio di ProtectedRoutes, altrimenti ritorna al Login
  return auth ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;

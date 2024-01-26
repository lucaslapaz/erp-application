import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ErrorCustom from "../Objects/ErrorCustom";

export const UserContext = createContext({});

export const UserContextProvider = function ({ children }) {
  const [userName, setUserName] = useState("");
  let [logged, setLogged] = useState(false);
  let [authenticating, setAuthenticating] = useState(true);

  async function authenticate(setShowContent = null) {
    try {
      const resposta = await fetch("http://localhost:5000/api/authenticate", {
        credentials: "include",
        method: "POST",
      });
      if (resposta.status === 200) {
        setLogged(true);
      } else {
        throw new ErrorCustom("Usuário não autenticado.");
      }
    } catch (error) {
      let message = "Falha ao tentar autenticar usuário.";
      if (error instanceof ErrorCustom) {
        message = error.message;
      }
      setLogged(false);
      console.log(message);
    } finally {
      setAuthenticating(false);
      setShowContent(true);
    }
  }

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        logged,
        setLogged,
        authenticate,
        authenticating,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

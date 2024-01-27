import { Alert, Snackbar } from "@mui/material";
import { createContext, useState } from "react";

export const NotificacaoContext = createContext();

export default function NotificacaoContextProvider({ children }) {
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");
  const [duration, setDuration] = useState(4000);

  const onClose = () => {
    setStatus(false);
  };

  const mostrarNotificacao = (severity, message, duration) => {
    setMessage(message);
    setDuration(duration);
    setSeverity(severity ? severity : "error");
    setStatus(true);
  };

  return (
    <NotificacaoContext.Provider value={{mostrarNotificacao}}>
      {children}
      <Snackbar open={status} autoHideDuration={duration} onClose={onClose}>
        <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </NotificacaoContext.Provider>
  );
}

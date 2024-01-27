import { Route, Routes } from "react-router-dom";
import Inicio from "./Pages/Inicio";
import MonitoraFichas from "./Pages/MonitoraFichas";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Login from "./Pages/Login";
import CriarTipoFicha from "./Pages/CriarTipoFicha";
import CriarFicha from "./Pages/CriarFicha";
import { UserContextProvider } from "./Contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import Testes2 from "./Pages/Testes2";
import { FichaTabContextProvider } from "./Contexts/FichaTabContext";
import NotificacaoContextProvider from "./Contexts/NotificacaoContext";

const customTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function App() {
  return (
    <>
      <NotificacaoContextProvider>
        <BrowserRouter>
          <UserContextProvider>
            <ThemeProvider theme={customTheme}>
              <CssBaseline />
              <Routes>
                <Route index element={<Inicio />} />
                <Route path="/monitora-fichas" element={<MonitoraFichas />} />
                <Route path="/login" element={<Login />} />
                <Route path="/criar-tipo-ficha" element={<CriarTipoFicha />} />
                <Route path="/criar-ficha" element={<CriarFicha />} />
                <Route path="/testes" element={<Testes2 />} />
              </Routes>
            </ThemeProvider>
          </UserContextProvider>
        </BrowserRouter>
      </NotificacaoContextProvider>
    </>
  );
}

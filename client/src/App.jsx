import { Route, Routes } from "react-router-dom";
import Inicio from "./Pages/Inicio";
import MonitoraFichas from "./Pages/MonitoraFichas";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Login from "./Pages/Login";
import CriarFichas from "./Pages/CriarFichas";

const customTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function App() {
  return (
    <>
      <ThemeProvider theme={customTheme}>
      <CssBaseline />
        <Routes>
          <Route index element={<Inicio />} />
          <Route path="/monitora-fichas" element={<MonitoraFichas />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/criar-ficha" element={<CriarFichas />}/>
        </Routes>
      </ThemeProvider>
    </>
  );
}

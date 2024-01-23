import { Box, styled } from "@mui/material";

const MonitoraFichasLayout = styled(Box)(({ theme }) => {
  return {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridTemplateRows: "repeat(12, 1fr)",
    width: "100vw",
    height: "100vh",
    gap: "10px",
  };
});

export default MonitoraFichasLayout;

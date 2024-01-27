import {
  Avatar,
  Box,
  Box as ContainerTopBar,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import MonitoraFichasLayout from "../Layouts/MonitoraFichasLayout";
import ProdutosFicha from "../Components/ProdutosFicha";
import MenuFerramentas from "../Components/MenuFerramentas";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { UserContext } from "../Contexts/UserContext";
import GuiaFichas from "../Components/GuiaFichas";

const ContainerFichas = styled(Box)(({ theme }) => {
  return {
    display: "grid",
    gridTemplateColumns: "auto",
    gridTemplateRows: "auto 1fr",
    borderBottom: ` 1px solid ${theme.palette.divider}`,
    borderRight: ` 1px solid ${theme.palette.divider}`,
  };
});

const InfoBar = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    width: "100%",
    padding: "20px",
    alignItems: "center",
  };
});

export default function MonitoraFichas() {
  const { logged, authenticate } = useContext(UserContext);
  const [showContent, setShowContent] = useState(false);

  const navigate = useNavigate();

  async function logoutHandler() {
    await fetch("http://localhost:5000/api/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      navigate("/login");
    });
  }

  useEffect(() => {
    authenticate(setShowContent);
  }, []);

  useEffect(() => {
    if (showContent) {
      if (!logged) {
        navigate("/login");
      } else {
        //consultarTiposFicha();
      }
    }
  }, [showContent]);

  if (!showContent) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <MonitoraFichasLayout component="main">
        <ContainerFichas
          sx={{
            gridColumn: "1 / 9",
            gridRow: "1 / 10",
          }}
        >
          <InfoBar
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              width: "100%",
              padding: "20px",
              alignItems: "center",
              borderBottom: (theme) => ` 1px solid ${theme.palette.divider}`,
            }}
          >
            <Avatar sx={{ marginRight: "10px" }}>L</Avatar>
            <Typography variant="h5">Usuário: Lucas</Typography>
            <Button
              sx={{ marginLeft: "auto" }}
              variant="outlined"
              onClick={logoutHandler}
            >
              Sair
            </Button>
          </InfoBar>
          <GuiaFichas />
        </ContainerFichas>

        <ProdutosFicha
          variant="contained"
          sx={{
            gridColumn: "9 / 13",
            gridRow: "1 / 13",
          }}
        />

        <MenuFerramentas
          sx={{
            gridColumn: "1 / 9",
            gridRow: "10 / 13",
          }}
        />
      </MonitoraFichasLayout>
    </>
  );
}

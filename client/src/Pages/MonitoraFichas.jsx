import {
  Avatar,
  Box,
  Box as ContainerTopBar,
  Button,
  CircularProgress,
  Divider,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import TabMesas from "../Components/TabMesas";
import MonitoraFichasLayout from "../Layouts/MonitoraFichasLayout";
import ProdutosFicha from "../Components/ProdutosFicha";
import MenuFerramentas from "../Components/MenuFerramentas";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { UserContext } from "../Contexts/UserContext";

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
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const { logged, authenticate } = useContext(UserContext);
  const [showContent, setShowContent] = useState(false);

  function tabsHandler(event, index) {
    setIndex(index);
  }

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
    if(showContent && !logged){
        navigate('/login');
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
          <ContainerTopBar>
            <InfoBar
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                width: "100%",
                padding: "20px",
                alignItems: "center",
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
            <Divider />
            <Tabs value={index} onChange={tabsHandler}>
              <Tab label="Mesas" />
              <Tab label="Comandas" />
              <Tab label="Fichas" />
              <Tab label="Delivery" />
            </Tabs>
            <Divider />
          </ContainerTopBar>

          <React.Fragment>
            <TabMesas indice={index} />
          </React.Fragment>
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

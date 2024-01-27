import React from "react";
import TabsBar from "./TabsBar";
import { FichaTabContextProvider } from "../Contexts/FichaTabContext";
import TabFichas from "./TabFichas";
import { Box, styled } from "@mui/material";


const ContainerGuiaFichas = styled(Box)(({theme}) => {
  return {
    display: "grid",
    gridTemplateColumns: "auto",
    gridTemplateRows: "auto 1fr",
    width: '100%',
    height: '100%',
    overflow: 'auto'
  };
})

export default function GuiaFichas() {
  return (
    <>
      <FichaTabContextProvider>
        <ContainerGuiaFichas>
          <TabsBar />
          <TabFichas />
        </ContainerGuiaFichas>
      </FichaTabContextProvider>
    </>
  );
}

import { Box, Skeleton, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import ErrorCustom from "../Objects/ErrorCustom";
import { API_URL } from "../Config";
import { useContext } from "react";
import { FichaTabContext } from "../Contexts/FichaTabContext";

export default function TabsBar() {
  const [listaTipos, setListaTipos] = useState([]);
  const { index, setIndex } = useContext(FichaTabContext);

  function tabsHandler(event, index) {
    setIndex(index);
  }

  async function consultarTiposFicha() {
    try {
      const resposta = await fetch(`${API_URL}/api/consultar-tipos-ficha`, {
        credentials: "include",
      });
      let conteudo = await resposta.json();

      if (resposta.status === 200) {
        setListaTipos(
          conteudo.map((tipo) => {
            return tipo.NOMETIPOFICHA;
          })
        );
      }
    } catch (error) {
      let message = "Erro ao consultar tipos de ficha.";
      if (error instanceof ErrorCustom) {
        message = error.message;
      }
      console.log(message);
    }
  }
  useEffect(() => {
    consultarTiposFicha();
  }, []);

  useEffect(() => {
    if (listaTipos.length > 0) {
      setIndex(listaTipos[0]);
    }
  }, [listaTipos]);

  return (
    <>
      {index != null ? (
        <Tabs
          value={index}
          onChange={tabsHandler}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {listaTipos.map((tipo) => {
            return <Tab key={tipo} label={tipo} value={tipo} />;
          })}
        </Tabs>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
          }}
        >
          {[1, 2, 3].map((item) => {
            return (
              <Skeleton
                key={item}
                sx={{ width: "30%", margin: "10px auto 10px" }}
              />
            );
          })}
        </Box>
      )}
    </>
  );
}

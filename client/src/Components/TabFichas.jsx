import { Grid, Skeleton } from "@mui/material";

import { ReactComponent as MySvg } from "../Images/imagetable.svg";
import Ficha from "./Ficha";
import { useContext, useEffect, useState } from "react";
import { FichaTabContext } from "../Contexts/FichaTabContext";
import { API_URL } from "../Config";
import { NotificacaoContext } from "../Contexts/NotificacaoContext";

let mesas = [];

for (let i = 1; i < 111; i++) {
  mesas.push({ id: i, name: `mesa-${i}`, tipo: "mesa" });
}

export default function TabFichas({ indice }) {
  const [fichaSelecionada, setFichaSelecionada] = useState(null);
  const { index, setIndex } = useContext(FichaTabContext);
  const { mostrarNotificacao } = useContext(NotificacaoContext);
  const [listaFichas, setListaFichas] = useState([]);

  const selecionarFicha = (mesa) => {
    setFichaSelecionada(mesa);
  };

  useEffect(() => {
    if (index) {
      consultarFichas();
      // mostrarNotificacao("success", "ola, mundo", 4000);
    }
  }, [index]);

  async function consultarFichas() {
    setListaFichas([]);
    const resposta = await fetch(`${API_URL}/api/consultar-fichas/${index}`, {
      credentials: "include",
    });
    if (resposta.status === 200) {
      let respostaJson = await resposta.json();
      console.log(respostaJson);
      setListaFichas(respostaJson);
    }else{
      setListaFichas([]);
    }
  }

  return (
    <>
      <Grid
        container
        gap="5px"
        margin={0}
        sx={{
          overflowY: "scroll",
          padding: "10px",
          alignItems: "start",
          alignContent: "start",
          justifyContent: "center",
          backgroundColor: "#eee",
          width: "100%",
          height: "100%",
        }}
      >
        {listaFichas.length > 0
          ? listaFichas.map((ficha, indice) => {
              return (
                <Ficha
                  key={ficha.IDFICHA}
                  numero={ficha.NUMERO}
                  image={MySvg}
                />
              );
            })
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => {
              return (
                <Grid
                  item
                  key={item}
                  sx={{ width: "90px", height: "150px", padding: 0 }}
                >
                  <Skeleton
                    component="div"
                    key={item}
                    sx={{ width: "100%", height: "100%", padding: 0 }}
                  />
                </Grid>
              );
            })}
        {/* {mesas.map((item) => {
          return (
            <Ficha
              key={item.id}
              numero={item.id}
              image={MySvg}
              selected={fichaSelecionada === item.id ? true : false}
              func={selecionarFicha}
            />
          );
        })} */}
      </Grid>
    </>
  );
}

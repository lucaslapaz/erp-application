import { Grid } from "@mui/material";

import { ReactComponent as MySvg } from "../Images/imagetable.svg";
import Ficha from "./Ficha";
import { useState } from "react";

let mesas = [];

for (let i = 1; i < 111; i++) {
  mesas.push({id: i, name: `mesa-${i}`, tipo: 'mesa'});
}

export default function TabMesas({ indice }) {
  const [mesaSelecionada, setMesaSelecionada] = useState(null);

  const selecionarMesa = (mesa) => {
    setMesaSelecionada(mesa);
  };

  if (indice !== 0) return;
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
        {mesas.map((item) => {
          return (
            <Ficha
              key={item.id}
              numero={item.id}
              image={MySvg}
              selected={mesaSelecionada === item.id ? true : false}
              func={selecionarMesa}
            />
          );
        })}
      </Grid>
    </>
  );
}

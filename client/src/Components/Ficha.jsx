import { Card, CardContent, Grid, SvgIcon, Typography } from "@mui/material";
import { useState } from "react";

export default function Ficha({ numero, image }) {
  const [idFicha, setIdFicha] = useState(null);
  const [_numero, _setNumero] = useState(null);
  const [nomeTipoFicha, setNomeTipoFicha] = useState(null);

  let estilo = {
    ":hover": {
      transform: "translate(-1px, -1px)",
    },
    ":active": {
      transform: "translate(1px, 1px)",
    },
  };

  return (
    <Grid item width={120} height={120}>
      <Card
        // variant="elevation"
        variant="outlined"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          ...estilo,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{
              userSelect: "none",
            }}
          >
            {numero}
          </Typography>
          <SvgIcon
            component={image}
            viewBox="0 0 512 512"
            sx={{ width: "60px", height: "60px" }}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}

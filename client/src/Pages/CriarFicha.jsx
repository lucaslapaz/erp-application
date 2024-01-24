import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Notificacao from "../Components/Notificacao";
import ErrorCustom from "../Objects/ErrorCustom";

const BoxFormulario = styled(FormControl)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    gap: "15px",
  };
});

const ContainerMain = styled(Box)(({ theme }) => {
  return {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});

export default function CriarFicha() {
  const [inicio, setInicio] = useState(0);
  const [final, setFinal] = useState(0);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [itemsSelect, setItemsSelect] = useState(["Consultando..."]);

  const [notifyStatus, setNotifyStatus] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");

  const notifyHandler = () => {
    setNotifyStatus(false);
  };

  const getSelectList = async () => {
    setItemsSelect([]);
    try {
      const resposta = await fetch(
        "http://localhost:5000/api/consultar-tipos-ficha",
        {
          credentials: "include",
        }
      );
      if (resposta.status !== 200) {
        throw new ErrorCustom(
          "Erro ao carregar lista de tipo de fichas. Tente novamente mais tarde."
        );
      }

      const respostaJSON = await resposta.json();
      let respostaItens = respostaJSON.map((item) => {
        return item.nomeTipoFicha;
      });
      setItemsSelect(respostaItens);
    } catch (error) {
      let message = "";
      if (error instanceof ErrorCustom) {
        message = "";
      } else {
        message = "";
      }
      setNotifyMessage(message);
      setNotifyStatus(true);
    }
  };

  return (
    <ContainerMain>
      <BoxFormulario>
        <InputLabel id="select-tipo-ficha">Tipo de ficha</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tipoSelecionado}
          label="Tipo de ficha"
          onOpen={getSelectList}
          onChange={(e) => setTipoSelecionado(e.target.value)}
        >
          {itemsSelect.map((item) => {
            return (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <TextField
            value={inicio}
            label="Início"
            type="number"
            onChange={(e) => setInicio(e.target.value)}
          />
          <TextField
            value={final}
            label="Final"
            type="number"
            onChange={(e) => setFinal(e.target.value)}
          />
        </Box>
        <Button variant="contained" color="primary">
          Criar ficha
        </Button>
        <Notificacao
          open={notifyStatus}
          onClose={notifyHandler}
          severity="error"
          message={notifyMessage}
        />
      </BoxFormulario>
    </ContainerMain>
  );
}

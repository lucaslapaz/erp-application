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
import { useEffect, useState } from "react";
import Notificacao from "../Components/Notificacao";
import ErrorCustom from "../Objects/ErrorCustom";
import { API_URL } from "../Config";

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
  const [tipoSelecionado, setTipoSelecionado] = useState(0);
  const [itemsSelect, setItemsSelect] = useState([""]);

  const [notifyStatus, setNotifyStatus] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notifySeverity, setNotifySeverity] = useState("error");

  const notifyHandler = (e) => {
    //GAMBIRRA: Acredito ser uma gambiarra, mas funciona. Quando a Notificação é fechada por tempo o callback
    //não recebe nenhum parâmetro e quando é fechada por clique na tela ele recebe um parâmetro do mouse
    if (!e || e.pointerType !== "mouse") {
      setNotifyStatus(false);
    }
  };

  const getSelectList = async () => {
    setNotifyStatus(false);
    try {
      const resposta = await fetch(`${API_URL}/api/consultar-tipos-ficha`, {
        credentials: "include",
      });
      if (resposta.status !== 200) {
        throw new Error(
          "Erro ao carregar lista de tipo de fichas. Tente novamente mais tarde."
        );
      }
      //A variável 'resposta' recebe um array de objetos
      const respostaJSON = await resposta.json();
      setItemsSelect(respostaJSON);
    } catch (error) {
      let message = "Erro ao se comunicar com o servidor.";
      if (error instanceof ErrorCustom) {
        message = error.message;
      }
      setNotifyMessage(message);
      setNotifySeverity("error");
      setNotifyStatus(true);
    }
  };

  const criarFichaHandler = async () => {
    setNotifyStatus(false);
    try {
      if (typeof tipoSelecionado !== "number" || tipoSelecionado === 0) {
        throw new ErrorCustom("Tipo de ficha inválido!");
      }
      if (final < inicio) {
        throw new ErrorCustom(
          "Valor final deve ser maior ou igual ao valor do início."
        );
      }

      const resposta = await fetch(`${API_URL}/api/criar-ficha`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inicio: parseInt(inicio),
          final: parseInt(final),
          ID_TIPO: parseInt(tipoSelecionado),
        }),
      });

      if (resposta.status === 200) {
        setNotifyMessage("Ficha(s) criada(s) com sucesso!");
        setNotifySeverity("success");
      } else {
        let respostaJSON = await resposta.json();
        throw new ErrorCustom(respostaJSON.message);
      }
    } catch (error) {
      let message = "Falha ao se comunicar com o servidor.";
      if (error instanceof ErrorCustom) {
        message = error.message;
      }
      setNotifyMessage(message);
      setNotifySeverity("error");
    } finally {
      setNotifyStatus(true);
    }
  };

  return (
    <ContainerMain>
      <BoxFormulario>
        <InputLabel id="select-tipo-ficha">Tipo de ficha</InputLabel>
        <Select
          labelId="select-tipo-ficha"
          id="select-tipo-ficha"
          value={tipoSelecionado}
          label="Tipo de ficha"
          onOpen={getSelectList}
          onChange={(e) => setTipoSelecionado(e.target.value)}
        >
          {itemsSelect.map((item, indice) => {
            return (
              <MenuItem value={item.IDTIPO} key={indice}>
                {item.NOMETIPOFICHA}
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
        <Button variant="contained" color="primary" onClick={criarFichaHandler}>
          Criar ficha
        </Button>
        <Notificacao
          open={notifyStatus}
          onClose={notifyHandler}
          severity={notifySeverity}
          message={notifyMessage}
        />
      </BoxFormulario>
    </ContainerMain>
  );
}

import styled from "@emotion/styled";
import { Box, Button, Input, TextField } from "@mui/material";
import { useState } from "react";
import Notificacao from "../Components/Notificacao";
import ErrorCustom from "../Objects/ErrorCustom";

const BoxFormulario = styled(Box)(({ theme }) => {
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

export default function CriarTipoFicha() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [nomeTipoFicha, setNomeTipoFicha] = useState("teste");
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState("error");
  const [notificationMessage, setNotificationMessage] = useState("");

  function closeNotification() {
    setNotificationStatus(false);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    const nome = nomeTipoFicha.replaceAll(" ", "");

    try {
      if (selectedFile && nome.length >= 4) {
        let data = new FormData();
        data.set("nomeTipoFicha", nome);
        data.set("file", selectedFile);
        console.log(data);
        const resposta = await fetch(
          "http://localhost:5000/api/criar-tipo-ficha",
          {
            credentials: "include",
            method: "POST",
            body: data,
          }
        );

        setNotificationStatus(false);

        if (resposta.status === 200) {
          setNotificationSeverity("success");
        } else {
          setNotificationSeverity("error");
        }
        let respostaJson = await resposta.json();
        setNotificationMessage(respostaJson.message);
        setNotificationStatus(true);
      } else {
        throw new ErrorCustom("Nenhum arquivo selecionado.");
      }
    } catch (error) {
      setNotificationSeverity("error");

      let message = "";
      if (error instanceof ErrorCustom) {
        message = error.message;
      } else {
        message =
          "Erro ao carregar lista de tipo de fichas. Tente novamente mais tarde.";
      }
      setNotificationMessage(message);
      setNotificationStatus(true);
    }
  };

  return (
    <ContainerMain>
      <BoxFormulario>
        <TextField
          id="outlined-basic"
          label="Nome da ficha"
          variant="outlined"
          value={nomeTipoFicha}
          onChange={(e) => setNomeTipoFicha(e.target.value)}
        />
        <Input
          accept="image/*"
          id="upload-image"
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label htmlFor="upload-image">
          <Button
            sx={{
              display: "flex",
            }}
            variant="contained"
            color="primary"
            component="span"
          >
            Selecione a imagem
          </Button>
        </label>

        {previewUrl && (
          <div>
            <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%" }} />
          </div>
        )}
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Criar tipos de ficha
        </Button>

        <Notificacao
          open={notificationStatus}
          onClose={closeNotification}
          severity={notificationSeverity}
          message={notificationMessage}
        />
      </BoxFormulario>
    </ContainerMain>
  );
}

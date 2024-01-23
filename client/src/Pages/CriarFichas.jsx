import styled from "@emotion/styled";
import { Box, Button, Input, TextField } from "@mui/material";
import { useState } from "react";

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

export default function CriarFichas() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [nomeTipoFicha, setNomeTipoFicha] = useState("teste");

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
      
      if (resposta.status === 200) {
      }
    } else {
      console.log("Nenhum arquivo selecionado.");
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
          Upload
        </Button>
      </BoxFormulario>
    </ContainerMain>
  );
}

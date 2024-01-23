import {
  Alert,
  Box,
  Button,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("lapaz");
  const [requestSend, setRequestSend] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [snackStatus, setSnackStatus] = useState(false);

  async function loginHandler() {
    let user = username.replaceAll(" ", "");
    if (user.length >= 5 && password.length >= 1) {
      setRequestSend(true);
      const resposta = await fetch("http://localhost:5000/api/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          password,
        }),
      });
      setRequestSend(false);
      if (resposta.status === 200) {
        setRedirect(true);
      } else {
        setSnackStatus(true);
      }
      console.log(resposta.status);
    }
  }

  function closeSnackBar() {
    setSnackStatus(false);
  }

  if (redirect) {
    return <Navigate to={"/monitora-fichas"} />;
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          width: "100vw",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Stack
          maxWidth="500px"
          width="100%"
          direction={"column"}
          gap={2}
          sx={{
            margin: { xs: 3, sm: 0 },
          }}
          onKeyDown={(e) => (e.key === "Enter" ? loginHandler() : "")}
        >
          <Typography variant="h4">Login</Typography>
          <Divider sx={{ marginBottom: "20px" }} />
          <TextField
            id="username"
            label="Usuário"
            type="text"
            value={username}
            disabled={requestSend}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="password"
            label="Senha"
            type="password"
            value={password}
            disabled={requestSend}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            disabled={requestSend}
            onClick={loginHandler}
          >
            Entrar
          </Button>
          <Snackbar
            open={snackStatus}
            autoHideDuration={5000}
            onClose={closeSnackBar}
          >
            <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
              Usuário incorreto
            </Alert>
          </Snackbar>
        </Stack>
      </Box>
    </>
  );
}

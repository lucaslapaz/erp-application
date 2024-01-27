import { Button } from "@mui/material";
import { useEffect } from "react";
import io from "socket.io-client";

let ENDPOINT = "localhost:5000";
let socket;

export default function Testes() {

  const conectar = () => {
    if(socket) socket.disconnect();

    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"]
    });

    socket.emit('join', {msg: 'ola, mundo'}, (error) => {
      if(error){
        window.alert(error)
      }
    })
  }
  const desconectar = () => {
    socket.disconnect();
  }

  const requisicao = async () => {
    let resposta = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: 'lucaslapaz',
        password: '123123n'
      })
    });
  }

  return <>
  <Button variant="contained" onClick={conectar}>Conectar</Button>
  <Button variant="contained" onClick={requisicao}>Enviar requisição</Button>
  <Button variant="contained" onClick={desconectar}>Desconectar</Button>
  </>;
}

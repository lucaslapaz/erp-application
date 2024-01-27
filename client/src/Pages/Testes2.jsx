import { Button, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let ENDPOINT = "localhost:5000";
let socket;

export default function Testes2() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    setTimeout(() => {
        setLista([1,2,3]);
    }, 5000);
  }, [])

  return <>
  {lista.length > 0 ? (
    <Typography variant="p">Lista existe</Typography>
  ) : (
    <Skeleton variant="text" width={120} />
  )}
  </>;
}

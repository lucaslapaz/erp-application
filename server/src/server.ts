require('dotenv').config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const routes = require("./core/router");
const errorHandler = require("./core/error");
const cookieParser = require("cookie-parser");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);
app.use(errorHandler);

io.on("connection", (socket: any) => {
  console.log("Novo cliente conectado");

  socket.on("atualizar-dados", (dados: any) => {
    io.emit("dados-atualizados", dados);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

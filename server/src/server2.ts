import { Request, Response } from "express";

const mysql = require("mysql2/promise");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");


// Criando um pool de conexões
const pool = mysql.createPool({
  host: 'localhost',
  port: "3306",
  user: 'root',
  password: '#food#',
  database: 'erp_lapaz',
  connectionLimit: 10
});


// Função para obter uma conexão do pool
async function obterConexaoDoPool() {
  const connection = await pool.getConnection();
  return connection;
}

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

app.post("/login", async (req: Request, res: Response) => {
  console.log(req.body);
  const conexao = await obterConexaoDoPool();
  try {
    const [rows, fields] = await conexao.query('SELECT * FROM usuarios');
    console.log(rows);
  } catch (error) {
    console.error('Erro na consulta:', error);
  } finally {
    conexao.release(); // Liberando a conexão de volta para o pool
  }
});

io.on("connection", (socket: any) => {
  console.log("Novo cliente conectado");

  socket.on("atualizar-dados", (dados: any) => {
    io.emit("dados-atualizados", dados);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

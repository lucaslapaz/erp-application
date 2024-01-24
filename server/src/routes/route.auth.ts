import { NextFunction, Request, Response } from "express";
import { loginModel, authenticateModel } from "../models/model.usuario";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function loginRoute(req: Request, res: Response, next: NextFunction) {
  let { username, password } = req.body;
  username = username.trim();

  const resposta = await loginModel(username);

  if (resposta instanceof Error) {
    return next(new Error("Usuário incorreto."))
  }

  const senha = resposta[0].password;
  const idusuario = resposta[0].idusuario;
  const confere = bcrypt.compareSync(password, senha);

  if (confere) {
    let token = jwt.sign({ idusuario, username }, process.env.JWT_KEY, {
      expiresIn: 2592000,
    });
    res.cookie("auth_token", token, {
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({message: "Usuário logado com sucesso."});
  } else {
    return next(new Error("Usuário incorreto."))
  }
}

export async function logoutRoute(req: Request, res: Response) {
  return res
    .cookie("auth_token", "", { sameSite: "none", secure: true, maxAge: -1 })
    .sendStatus(200);
}

export async function authenticateRoute(req: Request, res: Response) {
  const { auth_token } = req.cookies;

  if (!auth_token)
    return res.status(500).json({ message: "Usuário não logado." });

  try {
    const decoded = jwt.verify(auth_token, process.env.JWT_KEY);
    let {idusuario, username} = decoded;
    const resposta:any = await authenticateModel({ idusuario, username });

    if(resposta instanceof Error){
      return res.status(500).json({message: resposta.message});
    }
    return res.status(200).json({...resposta[0]})

  } catch (error: any) {
    let message = "Erro ao autenticar usuário";
    switch (error.name) {
      case "TokenExpiredError":
        message = "Token de sessão expirado.";
        break;
      case "JsonWebTokenError":
        message = "Token de autenticação inválido.";
        break;
    }
    return res.status(500).json({message});
  }
}

import { NextFunction, Request, Response } from "express";
import { validateTokenModel } from "../models/model.usuario";
import IRequestAuthenticate from "../interfaces/IRequestAuthenticate";
const jwt = require("jsonwebtoken");

export default async function validateToken(
  req: Request & IRequestAuthenticate ,
  res: Response,
  next: NextFunction
) {
  try {
    const { auth_token } = req.cookies;
    const decoded = jwt.verify(auth_token, process.env.JWT_KEY);
    let { idusuario, username } = decoded;
    const resposta: any = await validateTokenModel({ idusuario, username });

    if (resposta instanceof Error) {
      return res.status(500).json({ message: resposta.message });
    }
    
    [req.authenticate] = resposta;
    next();

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

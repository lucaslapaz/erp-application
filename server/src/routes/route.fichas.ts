import { loginModel, authenticateModel } from "../models/model.usuario";
import { NextFunction, Request, Response } from "express";
import IRequestAuthenticate from "../interfaces/IRequestAuthenticate";
const multer = require("multer");
const uploadMiddleware = multer({ dest: "../uploads" });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const criarTipoFichaRoute = require("express").Router();

criarTipoFichaRoute.use(
  uploadMiddleware.single("file"),
  (
    req: Request & IRequestAuthenticate & { file: object },
    res: Response,
    next: NextFunction
  ) => {
    console.log("aqui");
    const { nomeTipoFicha } = req.body;
    const file = req.file;

    if (!file) throw new Error("Nenhuma imagem enviada");
  }
);

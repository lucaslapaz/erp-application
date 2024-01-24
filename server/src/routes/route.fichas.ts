import { loginModel, authenticateModel } from "../models/model.usuario";
import { NextFunction, Request, Response } from "express";
import IRequestAuthenticate from "../interfaces/IRequestAuthenticate";
import IFileMulter from "../interfaces/IFileMulter";
import {
  criarTipoFichaModel,
  consultarTipoFichaModel,
  criarFichaModel,
} from "../models/model.fichas";
const multer = require("multer");
const uploadMiddleware = multer({ dest: "./uploads/" });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
import path from "path";
import ErrorCustom from "../objects/ErrorCustom";

export const criarTipoFichaRoute = require("express").Router();

criarTipoFichaRoute.use(
  uploadMiddleware.single("file"),
  async (
    req: Request & IRequestAuthenticate & { file: IFileMulter & any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.authenticate.permission < 5) {
        console.log(req.authenticate.permission);
        throw new Error("Usuário não tem permissão para executar a ação!");
      }

      const { nomeTipoFicha } = req.body;
      const file: IFileMulter = req.file;

      if (!file) throw new Error("Nenhuma imagem enviada.");
      if (!nomeTipoFicha || nomeTipoFicha.trim().length <= 2)
        throw new Error("Nome do tipo da ficha inválido.");

      const { mimetype, filename, originalname } = file;
      const extension = path.extname(originalname).toLowerCase().slice(1);
      const extensionAccepted = ["jpg", "jpeg", "svg", "png"];

      if (!extensionAccepted.includes(extension)) {
        fs.rmSync(`./uploads/${filename}`);
        throw new Error("Formato de arquivo não permitido.");
      }

      const newPath = `/uploads/${filename}.${extension}`;
      fs.renameSync(`./uploads/${filename}`, "." + newPath);

      const resposta: any = await criarTipoFichaModel({
        nomeimagem: originalname,
        pathimagem: `${filename}.${extension}`,
        formato: extension,
        nometipoficha: nomeTipoFicha,
      });

      if (resposta instanceof Error) {
        fs.rmSync(`./uploads/${filename}.${extension}`);
        return next(resposta);
      }

      res.status(200).json({ message: "Tipo de ficha criada com sucesso." });
    } catch (error) {
      return next(error);
    }
  }
);

export async function consultarTiposFichaRoute(
  req: Request & IRequestAuthenticate,
  res: Response,
  next: NextFunction
) {
  if (req.authenticate.permission < 5) {
    return next(new Error("Usuário não tem permissão para executar a ação!"));
  }

  const resposta: any = await consultarTipoFichaModel();
  if (resposta instanceof Error) {
    return next(resposta);
  }
  // const retorno: object[] = [];
  // resposta.forEach((item: object & any) => {
  //   retorno.push({ nomeTipoFicha: item.NOMETIPOFICHA });
  // });

  res.status(200).json(resposta);
}

export async function criarFichaRoute(
  req: Request & IRequestAuthenticate,
  res: Response,
  next: NextFunction
) {
  if (req.authenticate.permission < 5) {
    return next(new Error("Usuário não tem permissão para executar a ação!"));
  }

  const { inicio, final, ID_TIPO } = req.body;
  if (!inicio || !final || !ID_TIPO)
    return next(new Error("Falha ao criar ficha(s), dados faltando."));

  if (
    typeof ID_TIPO !== "number" ||
    typeof inicio !== "number" ||
    typeof final !== "number"
  ) {
    return next(
      new Error("Um ou mais parâmetros possuem tipo de dados inválidos.")
    );
  }

  if (final < inicio)
    return next(
      new Error("Valor final deve ser maior ou igual ao valor do início.")
    );

  if (ID_TIPO <= 0) {
    return next(new Error("Valor do tipo de ficha inválido."));
  }

  const resposta = await criarFichaModel(ID_TIPO, inicio, final);

  if (resposta instanceof Error) {
    return next(resposta);
  }

  res.status(200).send(resposta);
  return;
}

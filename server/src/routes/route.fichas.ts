import { loginModel, authenticateModel } from "../models/model.usuario";
import { NextFunction, Request, Response } from "express";
import IRequestAuthenticate from "../interfaces/IRequestAuthenticate";
import IFileMulter from "../interfaces/IFileMulter";
import { criarTipoFichaModel } from "../models/model.fichas";
const multer = require("multer");
const uploadMiddleware = multer({ dest: "./uploads/" });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
import path from "path";

export const criarTipoFichaRoute = require("express").Router();

criarTipoFichaRoute.use(
  uploadMiddleware.single("file"),
  async (
    req: Request & IRequestAuthenticate & { file: IFileMulter & any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { nomeTipoFicha } = req.body;
      const file: IFileMulter = req.file;

      if (!file) return next(new Error("Nenhuma imagem enviada"));
      if (!nomeTipoFicha || nomeTipoFicha.replaceAll(" ", "").length <= 4)
        return next(new Error("Nome do tipo da ficha inválido"));

      const { mimetype, filename, originalname } = file;
      const extension = path.extname(originalname).toLowerCase().slice(1);
      const extensionAccepted = ["jpg", "jpeg", "svg", "png"];

      if (!extensionAccepted.includes(extension)) {
        fs.rmSync(`./uploads/${filename}`);
        return next(new Error("Formato de arquivo não permitido."));
      }

      const newPath = `/uploads/${filename}.${extension}`;
      fs.renameSync(`./uploads/${filename}`, "." + newPath);

      const resposta: any = await criarTipoFichaModel({
        nomeimagem: originalname,
        pathimagem: `${filename}.${extension}`,
        formato: extension,
        nomeficha: nomeTipoFicha,
      });

      if (resposta instanceof Error) {
        fs.rmSync(`./uploads/${filename}.${extension}`);
        return next(
          new Error("Erro ao inserir o novo tipo de ficha no banco de dados.")
        );
      }

      res.status(200).json({ message: "Tipo de ficha criada com sucesso" });
    } catch (error) {
      return next(error);
    }
  }
);

import { NextFunction, Response } from "express";
import {
  loginRoute,
  logoutRoute,
  authenticateRoute,
} from "../routes/route.auth";
import { criarTipoFichaRoute } from "../routes/route.fichas";
import validateToken from "../core/validateToken";
import IRequestAuthenticate from "../interfaces/IRequestAuthenticate";

const router = require("express").Router();

router.post("/login", loginRoute);
router.post("/logout", logoutRoute);
router.post("/authenticate", authenticateRoute);
router.post("/criar-tipo-ficha", validateToken, criarTipoFichaRoute);

router.get(
  "/teste-erro",
  validateToken,
  (req: Request, res: Response, next: NextFunction) => {
    throw new Error('seila')
  }
);

module.exports = router;

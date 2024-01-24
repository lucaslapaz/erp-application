import { NextFunction, Response } from "express";
import {
  loginRoute,
  logoutRoute,
  authenticateRoute,
} from "../routes/route.auth";
import {
  criarTipoFichaRoute,
  consultarTiposFichaRoute,
  criarFichaRoute,
} from "../routes/route.fichas";
import validateToken from "../core/validateToken";

const router = require("express").Router();

router.post("/login", loginRoute);
router.post("/logout", logoutRoute);
router.post("/authenticate", authenticateRoute);
router.post("/criar-tipo-ficha", validateToken, criarTipoFichaRoute);
router.get("/consultar-tipos-ficha", validateToken, consultarTiposFichaRoute);
router.post("/criar-ficha", validateToken, criarFichaRoute);


router.get(
  "/teste-erro",
  validateToken,
  (req: Request, res: Response, next: NextFunction) => {
    throw new Error("seila");
  }
);

module.exports = router;

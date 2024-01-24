import { NextFunction, Request, Response } from "express";
import IRequestAuthenticate from "../interfaces/IRequestAuthenticate";


/**
 * Usar o middleware 'validateToken' antes para gerar o objeto req.authenticate para então usar esse middleware
 * @param {number} permissionRequired Permissão que será exigida para executar a ação
 * @returns Não retorna nada, apenas segue para o próximo middleware
 */

export function requestPermission(config: number[]) {
  
  return function(
    req: Request & IRequestAuthenticate,
    res: Response,
    next: NextFunction
  ){
    try {
        let [permissionRequired] = config;
        
        if (!req.authenticate) return next(new Error("Usuário não autenticado!"));
    
        console.log(permissionRequired)
        if(req.authenticate.permission >= permissionRequired){
            return next();
        } else{
            return next(new Error("Usuário não tem permissão para executar a ação!"));
        }
    
      } catch (erro: any) {
        return next(new Error("Erro ao validar permissões do usuário!"));
      }
  }
}

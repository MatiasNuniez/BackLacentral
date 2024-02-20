import { Request, Response, NextFunction } from "express";
import { SECRET } from "../config/config"
import jwt from "jsonwebtoken";
import { loginModel } from "../models/login.model";

export class AuthMiddleware {

  private key: string

  constructor() {
    this.key = SECRET || ""
  }

  async verifyIdentity(req: Request, res: Response, user:string, tokenHeader:string){
    const token = tokenHeader
    const User  = user
    try {
      const verify = jwt.verify(token, this.key)
      if ((User !== '') && (verify)) {
        await loginModel.find({ user: { $eq: User } }).then((data) => {
          if (data[0].admin === true) {
            res.status(200)
            return true
          }else{
            res.status(403).send({error:"No eres admin para realizar esta funcion"})
            return false
          }
        })
      } else {
        res.status(404).send({ error: 'El usuario no existe o su sesion ha expirado, inicie sesion' })
        return false
      }

    } catch (error) {
      res.status(403).send({error:'No tiene los permisos para ingresar, inicie sesion'})
      return false
    }
  }
}
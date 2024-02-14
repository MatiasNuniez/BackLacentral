import { Request, Response, NextFunction } from "express";
import { SECRET } from "../config/config"
import jwt from "jsonwebtoken";
import { loginModel } from "../models/login.model";

export class AuthMiddleware {

  private key: string

  constructor() {
    this.key = SECRET || ""
  }

  async verifyIdentity(req: Request, res: Response, next:NextFunction){
    const { token } = req.cookies
    const { user }  = req.cookies
    try {
      const verify = jwt.verify(token, this.key)
      if ((user !== '') && (verify)) {
        await loginModel.find({ user: { $eq: user } }).then((data) => {
          if (data[0].admin === true) {
            next()
          }else{
            res.status(403).send({error:"No eres admin para realizar esta funcion"})
          }
        })
      } else {
        res.status(404).send({ error: 'El usuario no existe o su sesion ha expirado, inicie sesion' })
      }

    } catch (error) {
      res.status(403).send({error:'No tiene los permisos para ingresar, inicie sesion'})
    }
  }
}
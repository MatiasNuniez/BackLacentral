import { Request, Response } from "express";
import { modelRotos } from "../models/rotos.model";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";

export class RotosController {

  private key: string

  constructor() {
    this.key = SECRET || ''
  }

  async getElements(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1] || ''
    if (jwt.verify(token, this.key)) {
      try {
        await modelRotos.find({}).then((data) => {
          res.send(data)
        })
      } catch (error) {
        res.send({ ERROR: error })
      }
    }else {
      res.status(403).send({ mensaje: 'No tienes los permisos, inicie sesion' })
    }
  }

  async insertElement(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1] || ''
    if (jwt.verify(token, this.key)) {
      try {
        const data = req.body
        await modelRotos.insertMany(data).then((data) => {
          res.send(data)
        })
      } catch (error) {
        res.send({ ERROR: error })
      }
    }else {
      res.status(403).send({ mensaje: 'No tienes los permisos, inicie sesion' })
    }
  }
  
  async deleteElement(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1] || ''
    if (jwt.verify(token, this.key)) {
      try {
        const { id } = req.params
        await modelRotos.deleteOne({ _id: id })
      } catch (error) {
        res.send({ ERROR: error })
      }
    }else {
      res.status(403).send({ mensaje: 'No tienes los permisos, inicie sesion' })
    }
  }

  async editElement(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1] || ''
    if (jwt.verify(token, this.key)) {
      try {
        const { id } = req.params
        const update = req.body
        await modelRotos.updateOne({ _id: id }, update)
      } catch (error) {
        res.send({ ERROR: error })
      }
    }else {
      res.status(403).send({ mensaje: 'No tienes los permisos, inicie sesion' })
    }
  }

}
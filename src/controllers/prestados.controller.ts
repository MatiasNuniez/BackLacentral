import { Request, Response } from "express";
import { modelPrestados } from "../models/prestados.model";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";

export class PrestadosController {

  private key: string

  constructor() {
    this.key = SECRET || ''
  }

  async getElements(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1] || ''
    try {
      if (jwt.verify(token, this.key)) {
        try {
          await modelPrestados.find({ state: true }).then((data) => {
            res.send(data)
          })
        } catch (error) {
          res.status(409).send({ ERROR: error })
        }
      } else {
        res.status(403).send({ mensaje: 'No tienes los permisos, inicie sesion' })
      }
    } catch (error) {
      res.status(403).send({ mensaje: `Token invalido ${error}` })
    }

  }

  async insertElement(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1] || ''
    try {
      if (jwt.verify(token, this.key)) {
        try {
          const data = req.body
          await modelPrestados.insertMany(data).then((data) => {
            res.status(200).send(data)
          })
        } catch (error) {
          res.status(409).send({ ERROR: error })
        }
      } else {
        res.status(403).send({ mensaje: 'No tienes los permisos, inicie sesion' })
      }
    } catch (error) {
      res.status(403).send({ mensaje: `Token invalido ${error}` })
    }

  }


  async editElement(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1] || ''
    try {
      if (jwt.verify(token, this.key)) {
        try {
          const { id } = req.params
          const update = req.body
          const updateElement = await modelPrestados.findByIdAndUpdate(id, update, { new: true });
          if (!updateElement) {
            res.status(404).json({ mensaje: 'Elemento no encontrado' })
          }
          res.json(updateElement)
        } catch (error) {
          res.status(409).send({ ERROR: error })
        }
      } else {
        res.status(403).send({ mensaje: 'No tienes los permisos, inicie sesion' })
      }
    } catch (error) {
      res.status(403).send({ mensaje: `Token invalido ${error}` })
    }
  }

  async deleteElement(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1] || ''
    try {
      if (jwt.verify(token, this.key)) {
        try {
          const { id } = req.params
          await modelPrestados.updateOne({ _id: id }, { $set: { state: false } })
          res.status(200).send(id)
        } catch (error) {
          res.status(409).send({ ERROR: error })
        }
      } else {
        res.status(403).send({ mensaje: 'No tienes los permisos, inicie sesion' })
      }
    } catch (error) {
      res.status(403).send({ mensaje: `Token invalido ${error}` })
    }
  }
}
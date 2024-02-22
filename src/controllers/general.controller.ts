import { Request, Response } from "express";
import { modelGeneral } from "../models/general.model";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";

export class GeneralController {

  private key: string

  constructor() {
    this.key = SECRET || ''
  }

  async getElements(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1] || ''
    if (jwt.verify(token, this.key)) {
      try {
        await modelGeneral.find({ state: true }).then((data) => {
          res.send(data)
        })
      } catch (error) {
        res.status(409).send({ ERROR: error })
      }
    } else {
      res.status(403).send({ mensaje: 'No tienes los permisos, inicie sesion' })
    }
  }


  async insertElement(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1] || ''
    if (jwt.verify(token, this.key)) {
      try {
        const data = req.body
        await modelGeneral.insertMany(data).then((data) => {
          res.status(200).send(data)
        })
      } catch (error) {
        res.status(409).send({ ERROR: error })
      }
    } else {
      res.status(403).send({ mensaje: 'No tienes los permisos, inicie sesion' })
    }
  }

  async editElement(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1] || ''
    if (jwt.verify(token, this.key)) {
      try {
        const { id } = req.params
        const update = req.body
        const updateElement = await modelGeneral.findByIdAndUpdate(id, update, { new: true });
        if (!updateElement) {
          return res.status(404).json({ mensaje: 'Elemento no encontrado' });
        }
        res.json(updateElement);
      } catch (error) {
        res.status(409).send({ ERROR: error })
      }
    } else {
      res.status(403).send({ mensaje: 'No tienes los permisos, inicie sesion' })
    }

  }


  async deleteElement(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1] || ''
    if (jwt.verify(token, this.key)) {
      try {
        const { id } = req.params
        await modelGeneral.updateOne({ _id: id }, { $set: { state: false } })
        res.status(200).send(id)
      } catch (error) {
        res.status(409).send({ ERROR: error })
      }
    } res.status(403).send({ mensaje: 'No tienes los permisos, inicie sesion' })
  }
}
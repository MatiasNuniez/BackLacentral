import { Request, Response } from "express";
import { modelPrestados } from "../models/prestados.model";

export class PrestadosController {

  async getElements(req: Request, res: Response) {
    const user = Array.isArray(req.headers['user'])
      ? req.headers['user'][0]
      : req.headers['user'] || '';
    const token = req.headers.authorization?.split(' ')[1]
    try {
      await modelPrestados.find({ state: true }).then((data) => {
        res.send(data)
      })
    } catch (error) {
      res.send({ ERROR: error })
    }
  }

  async insertElement(req: Request, res: Response) {
    const user = Array.isArray(req.headers['user'])
      ? req.headers['user'][0]
      : req.headers['user'] || '';
    const token = req.headers.authorization?.split(' ')[1]
    try {
      const data = req.body
      await modelPrestados.insertMany(data)
      const lastElement = await modelPrestados.find({ numero: { $eq: data.numero } })
      res.send(lastElement)
    } catch (error) {
      res.send({ ERROR: error })
    }
  }

  async editElement(req: Request, res: Response) {
    const user = Array.isArray(req.headers['user'])
      ? req.headers['user'][0]
      : req.headers['user'] || '';
    const token = req.headers.authorization?.split(' ')[1]
    try {
      const { id } = req.params
      const update = req.body
      await modelPrestados.updateOne({ _id: id }, update)
      await modelPrestados.find({ state: true }).then((data) => {
        res.send(data)
      })
    } catch (error) {
      res.send({ ERROR: error })
    }
  }

  async deleteElement(req: Request, res: Response) {
    const user = Array.isArray(req.headers['user'])
      ? req.headers['user'][0]
      : req.headers['user'] || '';
    const token = req.headers.authorization?.split(' ')[1]
    try {
      const { id } = req.params
      await modelPrestados.updateOne({ _id: id }, { $set: { state: false } })
      res.send(id)
    } catch (error) {
      res.send({ ERROR: error })
    }
  }

}
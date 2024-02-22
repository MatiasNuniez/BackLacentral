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
      res.status(409).send({ ERROR: error })
    }
  }

  async insertElement(req: Request, res: Response) {
    const user = Array.isArray(req.headers['user'])
      ? req.headers['user'][0]
      : req.headers['user'] || '';
    const token = req.headers.authorization?.split(' ')[1]
    try {
      const data = req.body
      await modelPrestados.insertMany(data).then((data) => {
        res.status(200).send(data)
      })
    } catch (error) {
      res.status(409).send({ ERROR: error })
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
      const updateElement = await modelPrestados.findByIdAndUpdate(id, update, { new: true });
      if(!updateElement){
        res.status(404).json({mensaje:'Elemento no encontrado'})
      }
      res.json(updateElement)
    } catch (error) {
      res.status(409).send({ ERROR: error })
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
      res.status(200).send(id)
    } catch (error) {
      res.status(409).send({ ERROR: error })
    }
  }

}
import { Request, Response } from "express";
import { modelPrestados } from "../models/prestados.model";

export class PrestadosController {

  async getElements(req: Request, res: Response) {
    try {
      await modelPrestados.find({ state:true }).then((data) => {
        res.send(data)
      })
    } catch (error) {
      res.send({ ERROR: error })
    }
  }

  async insertElement(req: Request, res: Response) {
    try {
      const data = req.body
      await modelPrestados.insertMany(data)
    } catch (error) {
      res.send({ ERROR: error })
    }
  }

  async editElement(req: Request, res: Response) {
    try {
      const { id } = req.params
      const update = req.body
      await modelPrestados.updateOne({ _id: id }, update)
    } catch (error) {
      res.send({ ERROR: error })
    }
  }

  async deleteElement(req: Request, res: Response) {
    try {
      const { id } = req.params
      await modelPrestados.updateOne({ _id: id }, { $set: { state: false } })
    } catch (error) {
      res.send({ ERROR: error })
    }
  }

}
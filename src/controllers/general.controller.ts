import { Request, Response } from "express";
import { modelGeneral } from "../models/general.model";

export class GeneralController {

  async getElements(req: Request, res: Response) {
    try {
      await modelGeneral.find({ state: true }).then((data) => {
        res.send(data)
      })
    } catch (error) {
      res.send({ ERROR: error })
    }
  }

  async insertElement(req: Request, res: Response) {
    try {
      const data = req.body
        await modelGeneral.insertMany(data)
    } catch (error) {
      res.send({ ERROR: error })
    }
  }

  async editElement(req: Request, res: Response) {
    try {
      const { id } = req.params
      const update = req.body
      await modelGeneral.updateOne({ _id: id }, update)
    } catch (error) {
      res.send({ ERROR: error })
    }
  }

  async deleteElement(req: Request, res: Response) {
    try {
      const { id } = req.params
      await modelGeneral.updateOne({ _id: id }, { $set: { state: false } })
    } catch (error) {
      res.send({ ERROR: error })
    }
  }
}
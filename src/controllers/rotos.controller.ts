import { Request, Response } from "express";
import { modelRotos } from "../models/rotos.model";

export class RotosController {

  async getElements(req: Request, res: Response) {
    const user = Array.isArray(req.headers['user'])
      ? req.headers['user'][0]
      : req.headers['user'] || '';
    const token = req.headers.authorization?.split(' ')[1]
    try {
      await modelRotos.find({}).then((data) => {
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
      await modelRotos.insertMany(data).then((data) => {
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
      await modelRotos.deleteOne({ _id: id })
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
      await modelRotos.updateOne({ _id: id }, update)
    } catch (error) {
      res.send({ ERROR: error })
    }
  }

}
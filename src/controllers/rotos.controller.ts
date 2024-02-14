import { Request, Response } from "express";
import { modelRotos } from "../models/rotos.model";

export class RotosController {

  async getElements(req:Request, res:Response) {
    try {
      await modelRotos.find({}).then((data) => {
        res.send(data)
      })
    } catch (error) {
      res.send({ERROR:error})
    }
  }

  async insertElement(req:Request, res:Response) {
    try {
      const data = req.body
      await modelRotos.insertMany(data)
    } catch (error) {
      res.send({ERROR:error})
    }
  }

  async deleteElement(req:Request, res:Response) {
    try {
      const { id } = req.params
      await modelRotos.deleteOne({_id:id})
    } catch (error) {
      res.send({ERROR:error})
    }
  }

  async editElement(req:Request, res:Response) {
    try {
      const { id } = req.params
      const update = req.body
      await modelRotos.updateOne({_id:id}, update)
    } catch (error) {
      res.send({ERROR:error})
    }
  }

}
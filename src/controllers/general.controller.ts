import { Request, Response } from "express";
import { modelGeneral } from "../models/general.model";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class GeneralController extends AuthMiddleware {

  async getElements(req: Request, res: Response) {
    const user = Array.isArray(req.headers['user'])
      ? req.headers['user'][0]
      : req.headers['user'] || '';
    const token = req.headers.authorization?.split(' ')[1] || ''
    if (await this.verifyIdentity(req, res, user, token)) {
      console.log('matias');
    }else{
      console.log("nomatias");
    }
    try {
      await modelGeneral.find({ state: true }).then((data) => {
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
      await modelGeneral.insertMany(data).then((data) => {
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
      const updateElement = await modelGeneral.findByIdAndUpdate(id, update, { new: true });
      if (!updateElement) {
        return res.status(404).json({ mensaje: 'Elemento no encontrado' });
      }
      res.json(updateElement);
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
      await modelGeneral.updateOne({ _id: id }, { $set: { state: false } })
      res.status(200).send(id)
    } catch (error) {
      res.status(409).send({ ERROR: error })
    }
  }
}
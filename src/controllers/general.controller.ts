import { Request, Response } from "express";
import { modelGeneral } from "../models/general.model";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class GeneralController extends AuthMiddleware {

  async getElements(req: Request, res: Response) {
    const user = Array.isArray(req.headers['user']) 
    ? req.headers['user'][0] 
    : req.headers['user'] || '';
    const token = req.headers.authorization?.split('')[1] || '';
    console.log(user, token);
    const auth = await this.verifyIdentity(req, res, user, token)
    if (auth) {
      try {
        await modelGeneral.find({ state: true }).then((data) => {
          res.send(data)
        })
      } catch (error) {
        res.send({ ERROR: error })
      }
    }
    else {
      res.send('No tienes los permisos necesarios')
    }
  }

  async insertElement(req: Request, res: Response) {
    const user = Array.isArray(req.headers['user']) 
    ? req.headers['user'][0] 
    : req.headers['user'] || ''
    const token = req.headers.authorization?.split('')[1] || '';
    const auth = await this.verifyIdentity(req, res, user, token)
    if (auth) {
      try {
        const data = req.body
        await modelGeneral.insertMany(data)
      } catch (error) {
        res.send({ ERROR: error })
      }
    }
    res.send('No tienes los permisos necesarios')
  }

  async editElement(req: Request, res: Response) {
    const user = Array.isArray(req.headers['user']) 
    ? req.headers['user'][0] 
    : req.headers['user'] || ''
    const token = req.headers.authorization?.split('')[1] || '';
    const auth = await this.verifyIdentity(req, res, user, token)
    if (auth) {
      try {
        const { id } = req.params
        const update = req.body
        await modelGeneral.updateOne({ _id: id }, update)
      } catch (error) {
        res.send({ ERROR: error })
      }
    } else {
      res.send('No tienes los permisos necesarios')
    }
  }

  async deleteElement(req: Request, res: Response) {
    const user = Array.isArray(req.headers['user']) 
    ? req.headers['user'][0] 
    : req.headers['user'] || ''
    const token = req.headers.authorization?.split('')[1] || '';
    const auth = await this.verifyIdentity(req, res, user, token)
    if (auth) {
      try {
        const { id } = req.params
        await modelGeneral.updateOne({ _id: id }, { $set: { state: false } })
      } catch (error) {
        res.send({ ERROR: error })
      }
    } else {
      res.send('No tienes los permisos necesarios')
    }
  }
}
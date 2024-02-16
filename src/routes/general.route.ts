import { BaseRouter } from "./router";
import { GeneralController } from "../controllers/general.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class GeneralRouter extends BaseRouter<GeneralController, AuthMiddleware>{

  constructor() {
    super(GeneralController, AuthMiddleware)
  }

  routes(): void {
    this.router.get('/general', (req, res) => this.controller.getElements(req, res))
    this.router.post('/general', (req, res) => this.controller.insertElement(req, res))
    this.router.put('/general/:id', (req, res) => this.controller.editElement(req, res))
    this.router.delete('/general/:id', (req, res) => this.controller.deleteElement(req, res))
  }
}

// , (req, res, next) => this.middleware.verifyIdentity(req, res, next),
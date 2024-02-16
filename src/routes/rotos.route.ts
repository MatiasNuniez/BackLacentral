import { BaseRouter } from "./router";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { RotosController } from "../controllers/rotos.controller";

export class RotosRouter extends BaseRouter<RotosController, AuthMiddleware>{

    constructor() {
        super(RotosController, AuthMiddleware)
    }

    routes(): void {
        this.router.get('/rotos', (req, res) => this.controller.getElements(req, res))
        this.router.post('/rotos', (req, res) => this.controller.insertElement(req, res))
        this.router.put('/rotos/:id', (req, res) => this.controller.editElement(req, res))
        this.router.delete('/rotos/:id', (req, res) => this.controller.deleteElement(req, res))
    }
}
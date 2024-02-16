import { BaseRouter } from "./router";
import { PrestadosController } from "../controllers/prestados.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class PrestadosRouter extends BaseRouter<PrestadosController, AuthMiddleware>{

    constructor() {
        super(PrestadosController, AuthMiddleware)
    }

    routes(): void {
        this.router.get('/prestados', (req, res) => this.controller.getElements(req, res))
        this.router.post('/prestados', (req, res) => this.controller.insertElement(req, res))
        this.router.put('/prestados/:id', (req, res) => this.controller.editElement(req, res))
        this.router.delete('/prestados/:id', (req, res) => this.controller.deleteElement(req, res))
    }
}
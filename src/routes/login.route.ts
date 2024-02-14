import { BaseRouter } from "./router";
import { LoginController } from "../controllers/login.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class LoginRouter extends BaseRouter<LoginController, AuthMiddleware>{



  constructor(){
    super(LoginController, AuthMiddleware)
  }

  routes(): void {
    this.router.post('/login', (req,res) => this.controller.getUser(req,res))
  }

}
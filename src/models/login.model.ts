import mongoose from "mongoose";
import ILogin from "../interfaces/login.interface";

class SchemaLogin {

    private _model: mongoose.Model<ILogin>;

    constructor(){
        
        const loginSchema = new mongoose.Schema<ILogin>({
            user: {
                type: String,
                required:true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            admin:{
                type:Boolean
            }
        },{
            versionKey: false,
            timestamps: true
        })

        this._model = mongoose.model<ILogin>('users', loginSchema)

    }

    get model(): mongoose.Model<ILogin>{
        return this._model;
    }
}

export const loginModel = new SchemaLogin().model;
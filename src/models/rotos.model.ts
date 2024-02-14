import mongoose from "mongoose";
import { IRotos } from "../interfaces/rotos.interface";

class RotosModel { 

  public _model: mongoose.Model<IRotos>


  constructor(){

    const rotosSchema = new mongoose.Schema<IRotos>({
      
      modelo:{
        type:String,
        required:true
      },
      componentes:{
        type:String,
        required:true
      },
      local:{
        type:String,
        required:true
      }
    }, {
      versionKey: false,
      timestamps: true
  })

    this._model = mongoose.model('rotos', rotosSchema)
  }

}

export const modelRotos = new RotosModel()._model;
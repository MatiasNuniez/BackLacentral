import mongoose from "mongoose";
import { IPrestados } from "../interfaces/prestados.interface";

class PrestadosModel {

  public _model: mongoose.Model<IPrestados>

  constructor(){

    const PrestadosSchema = new mongoose.Schema<IPrestados>({
      
      nombre:{
        type:String,
        required:true
      },
      modelo:{
        type:String,
        required:true
      },
      numero:{
        type:String,
        required:true
      },
      razon:{
        type:String,
        required:true
      },
      fecha:{
        type:String,
        default:new Date().toLocaleString('es-AR')
      },
      local:{
        type:String,
        required:true
      },
      state:{
        type:Boolean,
        default:true
      }
    }, {
      versionKey: false,
      timestamps: true
  })

    this._model = mongoose.model('prestados', PrestadosSchema)
  }
}

export const modelPrestados = new PrestadosModel()._model;
import mongoose from "mongoose"
import IGeneral from "../interfaces/general.interface"

class GeneralModel { 

  public _model:mongoose.Model<IGeneral>

  constructor(){

    const generalSchema = new mongoose.Schema<IGeneral>({
      
      nombre:{
        type:String,
        required:true,
        unique:true
      },
      numero:{
        type:String,
        required:true,
        unique:true
      },
      modelo:{
        type:String,
        required:true
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

    this._model = mongoose.model<IGeneral>('general', generalSchema)
  }

}

export const modelGeneral = new GeneralModel()._model;
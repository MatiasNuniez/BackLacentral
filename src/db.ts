import mongoose, { Mongoose, mongo } from 'mongoose'
import { URI } from './config/config'

export class Database {

  private uri:string

  constructor(){
    this.uri = URI || ''
  }

  public connect (){
    try {
      mongoose.connect(this.uri)
      console.log('Conectado a la base de datos');
    } catch (error) {
      console.log(`Error al conectarse a la base de datos ${error}`);
    }
  }

}
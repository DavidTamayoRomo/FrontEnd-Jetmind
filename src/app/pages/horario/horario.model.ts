import { Time } from "@angular/common";

export class Horario {
    constructor(
        public _id?:string,
        public idCiudad?:string,
        public idMarca?:string,  
        public nombre?:string,
        public dias?:Array<string>,
        public modalidad?:string,
        public horaInicio?:string,
        public horaFin?:string,
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
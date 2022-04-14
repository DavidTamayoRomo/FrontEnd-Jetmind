export class Asistencia {
    constructor(
        public _id?:string,
        public idDocente?:any,
        public idHorario?:any,
        public temaTratado?:any,
        public fecha?:Date,
        public ausentes?:any,
        public presentes?:any,
        public prueba?:any,
        public observaciones?:any,
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
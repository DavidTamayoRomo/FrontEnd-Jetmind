export class Campania {
    constructor(
        public _id?:string,
        public estado?:boolean,
        public nombre?:string,
        public fecha_activacion?:Date,
        public fecha_finalizacion?:Date,
        public idMarca?:string,
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
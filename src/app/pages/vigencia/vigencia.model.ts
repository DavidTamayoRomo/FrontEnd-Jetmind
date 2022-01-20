export class Vigencia {
    constructor(
        public _id?:string,
        public idCiudad?:Array<string>,
        public estado?:string,
        public fechaInicio?:Date,
        public fechaCierre?:Date,
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
export class NombrePrograma {
    constructor(
        public _id?:string,
        public idCiudad?:Array<string>,
        public idMarca?:Array<string>,
        public nombre?:string,
        public estado?:boolean,
        public pdf?:string,
        public observaciones?:string,
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
export class Sucursal {
    constructor(
        public _id?:string,
        public idMarcas?: Array<string>,
        public nombre?:string,
        public sector?:string,
        public descripcion?:string,
        public estado?:boolean,  
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
export class EntregaLibros {
    constructor(
        public _id?:string,
        public idDocente?:string,
        public idEstudiante?:any,
        public fechaEntrega?:Date,
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
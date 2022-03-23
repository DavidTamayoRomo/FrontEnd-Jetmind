export class Programa {
    constructor(
        public _id?: string,
        public idMarca?: Array<string>,
        public idCiudad?: Array<string>,
        public idSucursal?: Array<string>,
        public idNombrePrograma?: Array<string>,     
        public tipo?:string,
        public modalidad?:string,
        public idEstudiante?:any,
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
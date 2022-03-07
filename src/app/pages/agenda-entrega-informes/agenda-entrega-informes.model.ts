export class AgendaEntregaInformes {
    constructor(
        public _id?:string,
        public fechaInicio?: Date,
        public fechaFin?: Date,
        public idEstudiantes?: any,
        public idDocente?: string,
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
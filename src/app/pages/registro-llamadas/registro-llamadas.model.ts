export class RegistroLlamadas {
    constructor(
        public _id?: string,
        public idEstudiante?: any,
        public fecha?: Date,     
        public comenterio?:string,
        public numeroTelefonico?:string,
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
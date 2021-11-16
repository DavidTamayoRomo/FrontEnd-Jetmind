export class Estudiante {
    constructor(
        public _id?:string,
        public nombresApellidos?:string,
        public email?:string,
        public cedula?:string,
        public telefono?:string,
        public fechaNacimiento?:Date,
        public direccion?:string,
        public genero?:string,
        public estado?:string,
        public fotoCedula1?:string,
        public fotoCedula2?:string,
        public idRepresentante?:Array<string>,
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
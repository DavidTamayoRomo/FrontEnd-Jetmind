export class Persona {
    constructor(
        public tipo?: string,
        public idMarca?:Array<string>,
        public idCiudad?:Array<string>,
        public idSucursal?:Array<string>,
        public nombresApellidos?:string,
        public email?:string,
        public password?:string,
        public cedula?:string,
        public telefono?:string,
        public telefonoDomicilio?:string,
        public fechaNacimiento?:Date,
        public direccion?:string,
        public genero?:string,
        public estado?:boolean,
        public fotoPerfil?:string,
        public fotoCedula1?:string,
        public fotoCedula2?:string,
        public fechaIngresoEmpresa?:Date,
        public numeroCuenta?:Number,
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
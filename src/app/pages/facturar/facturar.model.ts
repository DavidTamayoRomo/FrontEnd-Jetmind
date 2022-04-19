export class Facturar {
    constructor(
        public _id?:string,
        public idContrato?:Array<string>,
        public programa?:Array<string>,
        public nombre?:string,
        public cedula_ruc?:string,
        public telefono?:string,
        public correo?:string,
        public direccion?:string,
        public total?:string,
        public tarjetaCredito?:string,
        public voucher?:Array<string>,
        public estado?:boolean,
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
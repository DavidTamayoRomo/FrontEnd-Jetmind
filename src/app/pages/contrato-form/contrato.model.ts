export class Contrato {
    constructor(
        public _id?:string,
        public fecha?:string,
        public estado?:string,
        public idRepresentante?:boolean,
        public tipoPago?:string,
        public estadoVenta?:string,
        public abono?:Array<any>,
        public valorMatricula?:string,
        public valorTotal?:string,
        public numeroCuotas?:string,
        public formaPago?:string,
        public comentario?:string,
        public directorAsignado?:Array<any>,
        public estadoPrograma?:string,
        public fechaAprobacion?:Date,
        public voucher?:Array<string>,
        public personaAprueba?:string,
        public codigo?:string,
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
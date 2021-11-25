export class Contrato {
    constructor(
        public _id?:string,
        public fecha?:string,
        public estado?:string,
        public idRepresentante?:boolean,
        public tipoPago?:string,
        public estadoVenta?:string,
        public abono?:string,
        public valorMatricula?:string,
        public valorTotal?:string,
        public numeroCuotas?:string,
        public formaPago?:string,
        public comentario?:string,
        public directorAsignado?:string,
        public estadoPrograma?:string,
        public fechaAprobacion?:string,
        public voucher?:Array<string>,
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
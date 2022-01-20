export class Verificacion {
    constructor(
        public _id?:string,
        public estado?:string,
        public idContrato?:Array<string>,
        public fechaVerificacion?:Date,
        public cobranza?:Array<any>,
        public addedUser?:string,
        public modifiedUser?:string
    ){}
}
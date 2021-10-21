import { Persona } from '../pages/persona/persona.model';


export interface PersonaInterface {
    data: Persona[];
    ok: string;
    success: boolean;
    totalUsuarios: number;
}
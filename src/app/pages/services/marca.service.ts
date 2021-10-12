import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http:HttpClient) { }

   /** Get MArcas */
   getAllMarcas(){
    return this.http.get(`${base_url}/marca`);
   }
}

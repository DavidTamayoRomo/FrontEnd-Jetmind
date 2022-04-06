import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Peea17ilvem } from '../peea17ilvem/peea17ilvem.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class Peea17ilvemService {

  constructor(private http: HttpClient) { }

  retornarHeader() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Peea17ilvem */
  getAllPeea17ilvem() {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeailvem17`, { headers: headers });
  }

  obtenerPeea17ilvemById(id: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeailvem17/${id}`, { headers: headers })
  }

  crearPeea17ilvem(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/peeailvem17`, formData, { headers: headers });
  }

  updatePeea17ilvem(id: string, peea17ilvem: Peea17ilvem) {
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/peeailvem17/${id}`, peea17ilvem, { headers: headers });
  }

  eliminarPeea17ilvem(peea17ilvem: Peea17ilvem) {
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/peeailvem17/${peea17ilvem._id}`, { headers: headers });
  }


  cargarPeea17ilvem(skip: number = 0) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeailvem17?skip=${skip}`, { headers: headers })
      .pipe(
        tap((resp: any) => {

          const peea17ilvems = resp.data.map((peea17ilvem: any) =>
            new Peea17ilvem(
              peea17ilvem?._id, peea17ilvem?.idContrato, peea17ilvem?.fecha, peea17ilvem?.pregunta1,
              peea17ilvem?.pregunta2, peea17ilvem?.pregunta3, peea17ilvem?.pregunta4, peea17ilvem?.pregunta5,
              peea17ilvem?.pregunta6, peea17ilvem?.pregunta7, peea17ilvem?.pregunta8, peea17ilvem?.pregunta9,
              peea17ilvem?.pregunta10, peea17ilvem?.pregunta11, peea17ilvem?.pregunta12, peea17ilvem?.pregunta13,
              peea17ilvem?.pregunta14, peea17ilvem?.pregunta15, peea17ilvem?.pregunta16, peea17ilvem?.pregunta17,
              peea17ilvem?.pregunta18,
              peea17ilvem?.pregunta19, peea17ilvem?.pregunta20, peea17ilvem?.pregunta21, peea17ilvem?.pregunta22,
              peea17ilvem?.pregunta23, peea17ilvem?.pregunta24, peea17ilvem?.pregunta25, peea17ilvem?.pregunta26,
              peea17ilvem?.pregunta27, peea17ilvem?.pregunta28, peea17ilvem?.pregunta29, peea17ilvem?.pregunta30,
              peea17ilvem?.pregunta31, peea17ilvem?.pregunta32, peea17ilvem?.pregunta33, peea17ilvem?.pregunta34,
              peea17ilvem?.pregunta35, peea17ilvem?.pregunta36, peea17ilvem?.pregunta37, peea17ilvem?.pregunta38,
              peea17ilvem?.pregunta39, peea17ilvem?.pregunta40, peea17ilvem?.pregunta41, peea17ilvem?.pregunta42,
              peea17ilvem?.pregunta43, peea17ilvem?.pregunta44, peea17ilvem?.pregunta45, peea17ilvem?.pregunta46,
              peea17ilvem?.pregunta47, peea17ilvem?.pregunta48, peea17ilvem?.pregunta49, peea17ilvem?.pregunta50,
              peea17ilvem?.pregunta51, peea17ilvem?.pregunta52, peea17ilvem?.pregunta53, peea17ilvem?.pregunta54,
              peea17ilvem?.pregunta55, peea17ilvem?.pregunta56, peea17ilvem?.pregunta57, peea17ilvem?.pregunta58,
              peea17ilvem?.pregunta59, peea17ilvem?.pregunta60, peea17ilvem?.pregunta61, peea17ilvem?.pregunta62,
              peea17ilvem?.pregunta63, peea17ilvem?.pregunta64, peea17ilvem?.pregunta65, peea17ilvem?.pregunta66,
              peea17ilvem?.pregunta67, peea17ilvem?.pregunta68, peea17ilvem?.pregunta69, peea17ilvem?.pregunta70,
              peea17ilvem?.pregunta71, peea17ilvem?.pregunta72, peea17ilvem?.pregunta73, peea17ilvem?.pregunta74,
              peea17ilvem?.pregunta75, peea17ilvem?.pregunta76, peea17ilvem?.pregunta77, peea17ilvem?.pregunta78,
              peea17ilvem?.pregunta79, peea17ilvem?.idEstudiante
              , peea17ilvem?.addedUser, peea17ilvem?.modifiedUser
              ));

          return {
            total: resp.totalPeea17ilvem,
            peea17ilvems
          };
        })
      )


  }
}

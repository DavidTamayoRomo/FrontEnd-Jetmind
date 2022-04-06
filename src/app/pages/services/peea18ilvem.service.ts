import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Peea18ilvem } from '../peea18ilvem/peea18ilvem.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class Peea18ilvemService {

  constructor(private http: HttpClient) { }

  retornarHeader() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Peea18ilvem */
  getAllPeea18ilvem() {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeailvem18`, { headers: headers });
  }

  obtenerPeea18ilvemById(id: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeailvem18/${id}`, { headers: headers })
  }

  crearPeea18ilvem(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/peeailvem18`, formData, { headers: headers });
  }

  updatePeea18ilvem(id: string, peea18ilvem: Peea18ilvem) {
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/peeailvem18/${id}`, peea18ilvem, { headers: headers });
  }

  eliminarPeea18ilvem(peea18ilvem: Peea18ilvem) {
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/peeailvem18/${peea18ilvem._id}`, { headers: headers });
  }


  cargarPeea18ilvem(skip: number = 0) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeailvem18?skip=${skip}`, { headers: headers })
      .pipe(
        tap((resp: any) => {

          const peea18ilvems = resp.data.map((peea18ilvem: any) =>
            new Peea18ilvem(
              peea18ilvem?._id, peea18ilvem?.idContrato, peea18ilvem?.fecha, peea18ilvem?.pregunta1,
              peea18ilvem?.pregunta2, peea18ilvem?.pregunta3, peea18ilvem?.pregunta4, peea18ilvem?.pregunta5,
              peea18ilvem?.pregunta6, peea18ilvem?.pregunta7, peea18ilvem?.pregunta8, peea18ilvem?.pregunta9,
              peea18ilvem?.pregunta10, peea18ilvem?.pregunta11, peea18ilvem?.pregunta12, peea18ilvem?.pregunta13,
              peea18ilvem?.pregunta14, peea18ilvem?.pregunta15, peea18ilvem?.pregunta16, peea18ilvem?.pregunta18,
              peea18ilvem?.pregunta18,
              peea18ilvem?.pregunta19, peea18ilvem?.pregunta20, peea18ilvem?.pregunta21, peea18ilvem?.pregunta22,
              peea18ilvem?.pregunta23, peea18ilvem?.pregunta24, peea18ilvem?.pregunta25, peea18ilvem?.pregunta26,
              peea18ilvem?.pregunta27, peea18ilvem?.pregunta28, peea18ilvem?.pregunta29, peea18ilvem?.pregunta30,
              peea18ilvem?.pregunta31, peea18ilvem?.pregunta32, peea18ilvem?.pregunta33, peea18ilvem?.pregunta34,
              peea18ilvem?.pregunta35, peea18ilvem?.pregunta36, peea18ilvem?.pregunta37, peea18ilvem?.idEstudiante,
              peea18ilvem?.addedUser, peea18ilvem?.modifiedUser
              ));

          return {
            total: resp.totalPeea18ilvem,
            peea18ilvems
          };
        })
      )


  }
}

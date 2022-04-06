import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Peea18tomatis } from '../peea18tomatis/peea18tomatis.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class Peea18tomatisService {

  constructor(private http: HttpClient) { }

  retornarHeader() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Peea18tomatis */
  getAllPeea18tomatis() {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeatomatis18`, { headers: headers });
  }

  obtenerPeea18tomatisById(id: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeatomatis18/${id}`, { headers: headers })
  }

  crearPeea18tomatis(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/peeatomatis18`, formData, { headers: headers });
  }

  updatePeea18tomatis(id: string, peea18tomatis: Peea18tomatis) {
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/peeatomatis18/${id}`, peea18tomatis, { headers: headers });
  }

  eliminarPeea18tomatis(peea18tomatis: Peea18tomatis) {
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/peeatomatis18/${peea18tomatis._id}`, { headers: headers });
  }


  cargarPeea18tomatis(skip: number = 0) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeatomatis18?skip=${skip}`, { headers: headers })
      .pipe(
        tap((resp: any) => {

          const peea18tomatis = resp.data.map((peea18tomatis: any) =>
            new Peea18tomatis(
              peea18tomatis?._id, peea18tomatis?.idContrato, peea18tomatis?.fecha, peea18tomatis?.pregunta1,
              peea18tomatis?.pregunta2, peea18tomatis?.pregunta3, peea18tomatis?.pregunta4, peea18tomatis?.pregunta5,
              peea18tomatis?.pregunta6, peea18tomatis?.pregunta7, peea18tomatis?.pregunta8, peea18tomatis?.pregunta9,
              peea18tomatis?.pregunta10, peea18tomatis?.pregunta11, peea18tomatis?.pregunta12, peea18tomatis?.pregunta13,
              peea18tomatis?.pregunta14, peea18tomatis?.pregunta15, peea18tomatis?.pregunta16, peea18tomatis?.pregunta18,
              peea18tomatis?.pregunta18,
              peea18tomatis?.pregunta19, peea18tomatis?.pregunta20, peea18tomatis?.pregunta21, peea18tomatis?.pregunta22,
              peea18tomatis?.pregunta23, peea18tomatis?.pregunta24, peea18tomatis?.pregunta25, peea18tomatis?.pregunta26,
              peea18tomatis?.pregunta27, peea18tomatis?.pregunta28, peea18tomatis?.pregunta29, peea18tomatis?.pregunta30,
              peea18tomatis?.pregunta31, peea18tomatis?.pregunta32, peea18tomatis?.pregunta33, peea18tomatis?.pregunta34,
              peea18tomatis?.pregunta35, peea18tomatis?.pregunta36, peea18tomatis?.pregunta37, peea18tomatis?.pregunta38,
              peea18tomatis?.pregunta39, peea18tomatis?.pregunta40, peea18tomatis?.pregunta41, peea18tomatis?.pregunta42,
              peea18tomatis?.pregunta43, peea18tomatis?.idEstudiante,
              peea18tomatis?.addedUser, peea18tomatis?.modifiedUser
            ));

          return {
            total: resp.totalPeea18tomatis,
            peea18tomatis
          };
        })
      )


  }
}

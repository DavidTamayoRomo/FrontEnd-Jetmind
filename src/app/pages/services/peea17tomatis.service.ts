import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Peea17tomatis } from '../peea17tomatis/peea17tomatis.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class Peea17tomatisService {

  constructor(private http: HttpClient) { }

  retornarHeader() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Peea17tomatis */
  getAllPeea17tomatis() {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeatomatis17`, { headers: headers });
  }

  obtenerPeea17tomatisById(id: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeatomatis17/${id}`, { headers: headers })
  }

  crearPeea17tomatis(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/peeatomatis17`, formData, { headers: headers });
  }

  updatePeea17tomatis(id: string, peea17tomatis: Peea17tomatis) {
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/peeatomatis17/${id}`, peea17tomatis, { headers: headers });
  }

  eliminarPeea17tomatis(peea17tomatis: Peea17tomatis) {
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/peeatomatis17/${peea17tomatis._id}`, { headers: headers });
  }


  cargarPeea17tomatis(skip: number = 0) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeatomatis17?skip=${skip}`, { headers: headers })
      .pipe(
        tap((resp: any) => {

          const peea17tomatis = resp.data.map((peea17tomatis: any) =>
            new Peea17tomatis(
              peea17tomatis?._id, peea17tomatis?.idContrato, peea17tomatis?.fecha, peea17tomatis?.pregunta1,
              peea17tomatis?.pregunta2, peea17tomatis?.pregunta3, peea17tomatis?.pregunta4, peea17tomatis?.pregunta5,
              peea17tomatis?.pregunta6, peea17tomatis?.pregunta7, peea17tomatis?.pregunta8, peea17tomatis?.pregunta9,
              peea17tomatis?.pregunta10, peea17tomatis?.pregunta11, peea17tomatis?.pregunta12, peea17tomatis?.pregunta13,
              peea17tomatis?.pregunta14, peea17tomatis?.pregunta15, peea17tomatis?.pregunta16, peea17tomatis?.pregunta17,
              peea17tomatis?.pregunta18,
              peea17tomatis?.pregunta19, peea17tomatis?.pregunta20, peea17tomatis?.pregunta21, peea17tomatis?.pregunta22,
              peea17tomatis?.pregunta23, peea17tomatis?.pregunta24, peea17tomatis?.pregunta25, peea17tomatis?.pregunta26,
              peea17tomatis?.pregunta27, peea17tomatis?.pregunta28, peea17tomatis?.pregunta29, peea17tomatis?.pregunta30,
              peea17tomatis?.pregunta31, peea17tomatis?.pregunta32, peea17tomatis?.pregunta33, peea17tomatis?.pregunta34,
              peea17tomatis?.pregunta35, peea17tomatis?.pregunta36, peea17tomatis?.pregunta37, peea17tomatis?.pregunta38,
              peea17tomatis?.pregunta39, peea17tomatis?.pregunta40, peea17tomatis?.pregunta41, peea17tomatis?.pregunta42,
              peea17tomatis?.pregunta43, peea17tomatis?.pregunta44, peea17tomatis?.pregunta45, peea17tomatis?.pregunta46,
              peea17tomatis?.pregunta47, peea17tomatis?.pregunta48, peea17tomatis?.pregunta49, peea17tomatis?.pregunta50,
              peea17tomatis?.pregunta51, peea17tomatis?.pregunta52, peea17tomatis?.pregunta53, peea17tomatis?.pregunta54,
              peea17tomatis?.pregunta55, peea17tomatis?.pregunta56, peea17tomatis?.pregunta57, peea17tomatis?.pregunta58,
              peea17tomatis?.pregunta59, peea17tomatis?.pregunta60, peea17tomatis?.pregunta61, peea17tomatis?.pregunta62,
              peea17tomatis?.pregunta63, peea17tomatis?.pregunta64, peea17tomatis?.pregunta65, peea17tomatis?.pregunta66,
              peea17tomatis?.pregunta67, peea17tomatis?.pregunta68, peea17tomatis?.pregunta69, peea17tomatis?.pregunta70,
              peea17tomatis?.pregunta71, peea17tomatis?.pregunta72, peea17tomatis?.pregunta73, peea17tomatis?.pregunta74,
              peea17tomatis?.pregunta75, peea17tomatis?.pregunta76, peea17tomatis?.pregunta77, peea17tomatis?.pregunta78,
              peea17tomatis?.pregunta79, peea17tomatis?.idEstudiante, peea17tomatis?.addedUser, peea17tomatis?.modifiedUser
            ));

          return {
            total: resp.totalPeea17tomatis,
            peea17tomatis
          };
        })
      )


  }

}

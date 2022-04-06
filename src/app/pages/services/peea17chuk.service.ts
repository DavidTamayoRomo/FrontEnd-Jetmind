import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Peea17chuk } from '../peea17charlotteuk/peea17chuk.model';
import { map, tap } from 'rxjs/operators';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class Peea17chukService {

  constructor(private http: HttpClient) { }

  retornarHeader() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Peea17chuk */
  getAllPeea17chuk() {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeacharlotte17`, { headers: headers });
  }

  obtenerPeea17chukById(id: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeacharlotte17/${id}`, { headers: headers })
  }

  crearPeea17chuk(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/peeacharlotte17`, formData, { headers: headers });
  }

  updatePeea17chuk(id: string, peea17chuk: Peea17chuk) {
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/peeacharlotte17/${id}`, peea17chuk, { headers: headers });
  }

  eliminarPeea17chuk(peea17chuk: Peea17chuk) {
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/peeacharlotte17/${peea17chuk._id}`, { headers: headers });
  }


  cargarPeea17chuk(skip: number = 0) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeacharlotte17?skip=${skip}`, { headers: headers })
      .pipe(
        tap((resp: any) => {

          const peea17chuks = resp.data.map((peea17chuk: any) =>
            new Peea17chuk(
              peea17chuk?._id, peea17chuk?.idContrato, peea17chuk?.fecha, peea17chuk?.pregunta1,
              peea17chuk?.pregunta2, peea17chuk?.pregunta3, peea17chuk?.pregunta4, peea17chuk?.pregunta5,
              peea17chuk?.pregunta6, peea17chuk?.pregunta7, peea17chuk?.pregunta8, peea17chuk?.pregunta9,
              peea17chuk?.pregunta10, peea17chuk?.pregunta11, peea17chuk?.pregunta12, peea17chuk?.pregunta13,
              peea17chuk?.pregunta14, peea17chuk?.pregunta15, peea17chuk?.pregunta16, peea17chuk?.pregunta17,
              peea17chuk?.pregunta18, peea17chuk?.idEstudiante, peea17chuk?.addedUser, peea17chuk?.modifiedUser
              ));

          return {
            total: resp.totalPeea17chuk,
            peea17chuks
          };
        })
      )


  }
}

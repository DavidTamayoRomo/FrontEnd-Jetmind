import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Peea18chuk } from '../peea18charlotteuk/peea18chuk.model';
import { map, tap } from 'rxjs/operators';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class Peea18chukService {

  constructor(private http: HttpClient) { }

  retornarHeader() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Peea18chuk */
  getAllPeea18chuk() {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeacharlotte18`, { headers: headers });
  }

  obtenerPeea18chukById(id: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeacharlotte18/${id}`, { headers: headers })
  }

  crearPeea18chuk(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/peeacharlotte18`, formData, { headers: headers });
  }

  updatePeea18chuk(id: string, peea18chuk: Peea18chuk) {
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/peeacharlotte18/${id}`, peea18chuk, { headers: headers });
  }

  eliminarPeea18chuk(peea18chuk: Peea18chuk) {
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/peeacharlotte18/${peea18chuk._id}`, { headers: headers });
  }


  cargarPeea18chuk(skip: number = 0) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/peeacharlotte18?skip=${skip}`, { headers: headers })
      .pipe(
        tap((resp: any) => {

          const peea18chuks = resp.data.map((peea18chuk: any) =>
            new Peea18chuk(
              peea18chuk?._id, peea18chuk?.idContrato, peea18chuk?.fecha, peea18chuk?.pregunta1,
              peea18chuk?.pregunta2, peea18chuk?.pregunta3, peea18chuk?.pregunta4, peea18chuk?.pregunta5,
              peea18chuk?.pregunta6, peea18chuk?.pregunta7, peea18chuk?.pregunta8, peea18chuk?.pregunta9,
              peea18chuk?.pregunta10, peea18chuk?.pregunta11, peea18chuk?.pregunta12, peea18chuk?.pregunta13,
              peea18chuk?.idEstudiante, peea18chuk?.addedUser, peea18chuk?.modifiedUser
              ));

          return {
            total: resp.totalPeea18chuk,
            peea18chuks
          };
        })
      )


  }
}

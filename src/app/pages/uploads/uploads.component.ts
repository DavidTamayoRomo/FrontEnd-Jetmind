import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';

import Swal from 'sweetalert2';
import { ContratoService } from '../services/contrato.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styles: [
  ]
})
export class UploadsComponent implements OnInit {

  public imagenSubir: any;
  public imgTemp: any;
  public contratoSeleccionada: any;

  constructor(
    private fileUploadService: FileUploadService,
    private contratoService: ContratoService
  ) { }

  ngOnInit(): void {
  }

  cambiarImagen(file: any) {
    this.imagenSubir = file.target.files[0];
    if (!file) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file.target.files[0]);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'contrato', 'voucher', this.contratoSeleccionada._id)
      .then((resp: any) => {
        this.cargarContratobyId(this.contratoSeleccionada._id);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'La imagen se actualizo correctamente'
        })
      })
      .catch(resp => {
        console.log(resp);
      })
  }

  async cargarContratobyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.contratoService.obtenerContratoById(id)
      .subscribe((resp: any) => {
        this.contratoSeleccionada = resp.data;
      });

  }


  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }



  files1: File[] = [];

  onSelect(event:any) {
    console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove(event:any) {
    console.log(event);
    this.files1.splice(this.files.indexOf(event), 1);
  }

}

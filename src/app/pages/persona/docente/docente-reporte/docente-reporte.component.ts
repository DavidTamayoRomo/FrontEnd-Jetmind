import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AsignarHorariosEstudianteService } from 'src/app/pages/services/asignar-horarios-estudiante.service';
import { SucursalService } from 'src/app/pages/services/sucursal.service';

@Component({
  selector: 'app-docente-reporte',
  templateUrl: './docente-reporte.component.html',
  styles: [
  ]
})
export class DocenteReporteComponent implements OnInit {

  docenteHorario: any;

  public dropdownListSucursales: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public sucursal: any = [];
  
  public dropdownList: any = [];
  public dropdownSettings1: IDropdownSettings = {};
  public dias: any = [];


  public totalEstudaintes: number=0;

  constructor(
    private fb: FormBuilder,
    private asignarHorarioEstudianteService: AsignarHorariosEstudianteService,
    private sucursalService: SucursalService,
  ) { }

  ngOnInit(): void {
    /** Servicio que me devuelva las SUCURSALES de la base de datos */
    this.recuperarDatosSucursales();

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.dropdownList = [
      { item_id: 1, nombre: 'Lunes' },
      { item_id: 2, nombre: 'Martes' },
      { item_id: 3, nombre: 'Miercoles' },
      { item_id: 4, nombre: 'Jueves' },
      { item_id: 5, nombre: 'Viernes' },
      { item_id: 6, nombre: 'Sabado' },
    ];

  }



  recuperarDatosSucursales() {
    this.sucursalService.getAllSucursales().subscribe((resp: any) => {
      let nombreSucursal: any = [];
      resp.data.forEach((element: any) => {
        nombreSucursal.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListSucursales = nombreSucursal;
    });
  }

  public registerForm = this.fb.group({
    rangoFechas: [null],
    dia: [null],
    dias: [null],
    idSucursal: [null],
  });

  busqueda() {
    //obtener el valor del dia
    let dato = this.registerForm.get('dia').value;
    this.totalEstudaintes = 0;
    if (this.sucursal.length == 0) {
      this.asignarHorarioEstudianteService.docentehorarioPorDia(dato, true, 'todas').subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;
        this.docenteHorario.map((element: any) => {
          element.datos.map((element2: any) => {
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });
      });

    } else {
      this.asignarHorarioEstudianteService.docentehorarioPorDia(dato, true, this.sucursal[0].item_id).subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;

        this.docenteHorario.map((element: any) => {
          element.datos.map((element2: any) => {
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });

      });
    }

  }



  /** SUCRUSAL */
  /** Item Seleccionado */
  onItemSelectsucursal(item: any) {
    this.sucursal = [item];
    this.totalEstudaintes = 0;
    let dato = this.registerForm.get('dia').value;
    if (dato == null) {
      //Dar un valor al input dia
      this.registerForm.get('dia').setValue('Lunes');
      this.asignarHorarioEstudianteService.docentehorarioPorDia('Lunes', true, 'todas').subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;

        this.docenteHorario.map((element: any) => {
          element.datos.map((element2: any) => {
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });

      });
    } else {
      this.asignarHorarioEstudianteService.docentehorarioPorDia(dato, true, this.sucursal[0].item_id).subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;

        this.docenteHorario.map((element: any) => {
          element.datos.map((element2: any) => {
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });

      });
    }

  }
  /** Todos los items Seleccionados */
  onSelectAllsucursal(items: any) {
    this.sucursal = items;
  }
  /** Deselccionar item */

  onDeSelectsucursal(item: any) {
    /** Borrar elemento del array  */
    this.sucursal = [];
    
    let dato = this.registerForm.get('dia').value;
    this.asignarHorarioEstudianteService.docentehorarioPorDia(dato, true, 'todas').subscribe((resp: any) => {
      this.docenteHorario = resp.data;
    });

  }
  /** Deselccionar todos los items */
  onDeSelectAllsucursal(items: any) {
    this.sucursal = items;
  }
  


  onItemSelect(item: any) {
    this.dias.push(item);

    let lista= [];
    this.dias.map((element: any) => {
      lista.push(element.nombre);
    });

    if (this.sucursal.length==0) {
      this.sucursal = 'todas';
    }else{
      this.sucursal = this.sucursal[0].item_id;
    }
    this.asignarHorarioEstudianteService.docentehorarioPorDia(lista, true, this.sucursal).subscribe((resp: any) => {
      console.log(resp);
      this.docenteHorario = resp.data;

      this.docenteHorario.map((element: any) => {
        element.datos.map((element2: any) => {
          this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
        });
      });

    });

  }
  /** Todos los items Seleccionados */
  onSelectAll(items: any) {
    this.dias = items;
  }
  /** Deselccionar item */

  onDeSelect(item: any) {
    /** Borrar elemento del array  */
    this.dias = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAll(items: any) {
    this.dias = items;
  }

}

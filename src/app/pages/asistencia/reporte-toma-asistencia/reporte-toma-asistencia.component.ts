import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AsistenciaService } from '../../services/asistencia.service';
import { CiudadService } from '../../services/ciudad.service';
import { MarcaService } from '../../services/marca.service';
import { ProgramaService } from '../../services/programa.service';
import { SucursalService } from '../../services/sucursal.service';

@Component({
  selector: 'app-reporte-toma-asistencia',
  templateUrl: './reporte-toma-asistencia.component.html',
  styles: [
  ]
})
export class ReporteTomaAsistenciaComponent implements OnInit {

  public informacion: any;
  public DocenteObjeto: any;
  public RespuestaFinal: any;

  public dropdownListCiudades: any = [];
  public dropdownListSucursales: any = [];
  public dropdownListMarcas: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public ciudad: any = [];
  public sucursal: any = [];
  public marca: any = [];
  public fechaInicio: Date;
  public fechaFin: Date;
  constructor(
    private programaService: ProgramaService,
    private ciudadService: CiudadService,
    private sucursalService: SucursalService,
    private marcaService: MarcaService,
    private asistenciaService: AsistenciaService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    /** Servicio que me devuelva las CIUDADES de la base de datos */
    this.recuperarDatosCiudad();
    /** Servicio que me devuelva las SUCURSALES de la base de datos */
    this.recuperarDatosSucursales();
    /** Servicio que me devuelva las MARCAS de la base de datos */
    this.recuperarDatosMarcas();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  public registerForm = this.fb.group({
    idMarca: [null],
    idCiudad: [null],
    idSucursal: [null],
    rangoFechas: [null],
  });

  rangoFechas() {
    //obtener el valor de rangoFechas
    let rangoFechas = this.registerForm.get('rangoFechas').value;
    let separarFecha = rangoFechas.split(' to ');
    this.fechaInicio = new Date(separarFecha[0]);
    this.fechaFin = new Date(separarFecha[1]);
  }

  recuperarDatosCiudad() {
    this.ciudadService.getAllCiudadesSinLimite().subscribe((resp: any) => {
      let nombreciudades: any = [];
      resp.data.forEach((element: any) => {
        nombreciudades.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListCiudades = nombreciudades;

    });

  }
  recuperarDatosSucursales() {
    this.sucursalService.getAllSucursalesSinLimite().subscribe((resp: any) => {
      let nombreSucursal: any = [];
      resp.data.forEach((element: any) => {
        nombreSucursal.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListSucursales = nombreSucursal;


    });

  }
  recuperarDatosMarcas() {
    this.marcaService.getAllMarcasSinLimite().subscribe((resp: any) => {
      let nombremarcas: any = [];
      resp.data.forEach((element: any) => {
        nombremarcas.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListMarcas = nombremarcas;
    });

  }

  buscar() {

    this.rangoFechas();

    let datos = this.registerForm.value;
    datos.idCiudad = this.ciudad.map((resp: any) => {
      return resp.item_id;
    });
    datos.idSucursal = this.sucursal.map((resp: any) => {
      return resp.item_id;
    });
    datos.idMarca = this.marca.map((resp: any) => {
      return resp.item_id;
    });

    datos.fechaInicio = this.fechaInicio;
    datos.fechaFin = this.fechaFin;

    console.log(datos);

    setTimeout(() => {
      this.asistenciaService.findbyCiudadSucursalMarca(datos).subscribe((resp: any) => {
        console.log(resp);
        this.informacion = resp.data;
        this.recorrerDatosInformacion(resp.data)
      });
    }, 200);


  }


  recorrerDatosInformacion(item: any) {
    //recorremos docente
    let objetoDocente: any = [];
    item.map((resp: any) => {
      //obtener el numero de horarios asignados en el dia
      //recorremos horario asignado
      let listaDiasAsignados: any = [];
      resp.horariosAsigandos1.map((horarioAsig: any) => {
        //Ver los dias de la semana que tiene horarios
        horarioAsig.idHorario[0].dias.map((dia: any) => {
          //recorremos los dias de la semana
          if (dia == 'Lunes') {
            listaDiasAsignados.push(1);
          }
          if (dia == 'Martes') {
            listaDiasAsignados.push(2);
          }
          if (dia == 'Miercoles') {
            listaDiasAsignados.push(3);
          }
          if (dia == 'Jueves') {
            listaDiasAsignados.push(4);
          }
          if (dia == 'Viernes') {
            listaDiasAsignados.push(5);
          }
          if (dia == 'Sabado') {
            listaDiasAsignados.push(6);
          }
        })
      });

      //contar numeros repetidos de la lista listaDiasAsignados
      let repetidos = {};
      listaDiasAsignados.forEach((numero: any) => {
        repetidos[numero] = (repetidos[numero] || 0) + 1;
      });

      objetoDocente.push({
        nombre: resp.horariosAsigandos1[0]?.idDocente[0]?.nombresApellidos,
        dias: repetidos,
        asistencia: resp.asistencia1
      });
    });

    this.DocenteObjeto = objetoDocente;
    console.log(objetoDocente);
    this.numeroDias();
  }

  numeroDias() {
    //numero de dias entre fechas 
    let fechaInicio = this.fechaInicio;
    let fechaFin = this.fechaFin;
    let diferencia = fechaFin.getTime() - fechaInicio.getTime();
    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    let arrayFechas = [];
    arrayFechas.push(`${fechaInicio.getFullYear()}-${fechaInicio.getMonth() + 1}-${fechaInicio.getDate()}`);
    for (let index = 0; index < dias; index++) {
      //sumar un dia a la fecha
      fechaInicio.setDate(fechaInicio.getDate() + 1)
      arrayFechas.push(`${fechaInicio.getFullYear()}-${fechaInicio.getMonth() + 1}-${fechaInicio.getDate()}`);
    }

    console.log(arrayFechas);
    this.recorrerNumeroDias(arrayFechas);
  }

  recorrerNumeroDias(arrayFechas: any) {

    let objetoDocenteFinal: any = [];
    this.DocenteObjeto.map((resp: any) => {
      let respuestaxDocente: any = [];
      arrayFechas.map((fecha: any) => {
        let fecha1 = new Date(fecha);

        let contardor = 0;
        //iterar asistencias
        resp.asistencia.map((asistencia: any) => {
          let fechaCreacion = new Date(asistencia.createdAt); 
          if (`${fechaCreacion.getFullYear()}-${fechaCreacion.getMonth() + 1}-${fechaCreacion.getDate()}` == `${fecha1.getFullYear()}-${fecha1.getMonth() + 1}-${fecha1.getDate()}`) {
            contardor++;
          }
        })
        
        if (fecha1.getDay() == 1) {
          if (resp.dias[1]) {
            respuestaxDocente.push({ dia:'Lunes', fecha:  `${fecha1.getFullYear()}-${fecha1.getMonth() + 1}-${fecha1.getDate()}`, cantidad: resp.dias[1], asistencia: contardor });
          }
        }
        if (fecha1.getDay() == 2) {
          if (resp.dias[2]) {
            respuestaxDocente.push({ dia:'Martes', fecha: `${fecha1.getFullYear()}-${fecha1.getMonth() + 1}-${fecha1.getDate()}`, cantidad: resp.dias[2], asistencia: contardor });
          }
        }
        if (fecha1.getDay() == 3) {
          if (resp.dias[3]) {
            respuestaxDocente.push({ dia:'Miercoles', fecha:  `${fecha1.getFullYear()}-${fecha1.getMonth() + 1}-${fecha1.getDate()}`, cantidad: resp.dias[3], asistencia: contardor });
          }
        }
        if (fecha1.getDay() == 4) {
          if (resp.dias[4]) {
            respuestaxDocente.push({ dia:'Jueves', fecha:  `${fecha1.getFullYear()}-${fecha1.getMonth() + 1}-${fecha1.getDate()}`, cantidad: resp.dias[4], asistencia: contardor });
          }
        }
        if (fecha1.getDay() == 5) {
          if (resp.dias[5]) {
            respuestaxDocente.push({ dia:'Viernes', fecha:  `${fecha1.getFullYear()}-${fecha1.getMonth() + 1}-${fecha1.getDate()}`, cantidad: resp.dias[5], asistencia: contardor });
          }
        }
        if (fecha1.getDay() == 6) {
          if (resp.dias[6]) {
            respuestaxDocente.push({ dia:'Sabado', fecha:  `${fecha1.getFullYear()}-${fecha1.getMonth() + 1}-${fecha1.getDate()}`, cantidad: resp.dias[6], asistencia: contardor });
          }
        }
      });

      objetoDocenteFinal.push({nombre: resp.nombre, datos: respuestaxDocente});

    });

    console.log(objetoDocenteFinal);
    this.RespuestaFinal = objetoDocenteFinal;
  }



  /**
   * ===================================================
   *  Multi select dropDown
   * ===================================================
   */
  /** CIUDAD */
  /** Item Seleccionado */
  onItemSelect(item: any) {
    this.ciudad.push(item);
    console.log(this.ciudad);
  }
  /** Todos los items Seleccionados */
  onSelectAll(items: any) {
    this.ciudad = items;
    console.log(this.ciudad);
  }
  /** Deselccionar item */
  findByItemIdIndexCiudad(id: any) {
    return this.ciudad.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelect(item: any) {
    //verificar esto no se queda asi
    console.log(item);
    console.log("entre");
    if (item.item_id) {
      console.log("entre 1");
      const index = this.findByItemIdIndexCiudad(item.item_id);
      const newArray = (index > -1) ? [
        ...this.ciudad.slice(0, index),
        ...this.ciudad.slice(index + 1)
      ] : this.ciudad;
      this.ciudad = newArray;
      console.log(this.ciudad);
    } else {
      console.log("entre 2");
      const index = this.ciudad.indexOf(item);
      const newArray = (index > -1) ? [
        ...this.ciudad.slice(0, index),
        ...this.ciudad.slice(index + 1)
      ] : this.ciudad;
      this.ciudad = newArray;
      console.log(this.ciudad);
    }
  }


  /** Deselccionar todos los items */
  onDeSelectAll(items: any) {
    this.ciudad = items;
    console.log(this.ciudad);
  }

  /** SUCRUSAL */
  /** Item Seleccionado */
  onItemSelectsucursal(item: any) {
    this.sucursal.push(item);
    console.log(this.sucursal);
  }
  /** Todos los items Seleccionados */
  onSelectAllsucursal(items: any) {
    this.sucursal = items;
    console.log(this.sucursal);
  }
  /** Deselccionar item */
  findByItemIdIndexSucursal(id: any) {
    return this.sucursal.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectsucursal(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexSucursal(item.item_id);
    const newArray = (index > -1) ? [
      ...this.sucursal.slice(0, index),
      ...this.sucursal.slice(index + 1)
    ] : this.sucursal;
    this.sucursal = newArray;
    console.log(this.sucursal);
  }
  /** Deselccionar todos los items */
  onDeSelectAllsucursal(items: any) {
    this.sucursal = items;
    console.log(this.sucursal);
  }

  /** MARCA */
  /** Item Seleccionado */
  onItemSelectmarca(item: any) {
    this.marca.push(item);
    console.log(this.marca);
  }
  /** Todos los items Seleccionados */
  onSelectAllmarca(items: any) {
    this.marca = items;
    console.log(this.marca);
  }
  /** Deselccionar item */
  findByItemIdIndexMarca(id: any) {
    return this.marca.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectmarca(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexMarca(item.item_id);
    const newArray = (index > -1) ? [
      ...this.marca.slice(0, index),
      ...this.marca.slice(index + 1)
    ] : this.marca;
    this.marca = newArray;
    console.log(this.marca);
  }
  /** Deselccionar todos los items */
  onDeSelectAllmarca(items: any) {
    this.marca = items;
    console.log(this.marca);
  }

}

import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {

  carpeta = '';
  listCarpetas: any[] = [];
  carpetaExiste: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  agregarCarpeta(){
    // console.log(this.tarea);
    const carpeta = {
      nombre: this.carpeta,
      estado: false
    };
    let carpetaExiste = this.buscarCarpeta(carpeta.nombre);
    if (carpetaExiste){
      console.log('Ya existe la carpeta y no se puede añadir');
      Swal.fire({
        title: 'Error!',
        text: 'La carpeta ya existe, ingrese otra',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
    else{
      this.listCarpetas.push(carpeta);
      console.log(this.listCarpetas);
      Swal.fire({
        title: 'Correcto!',
        text: 'La carpeta fue añadida correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    }

  }


  buscarCarpeta(carpeta: string){
    console.log('La carpeta es: ',carpeta);
    for(let i = 0; i < this.listCarpetas.length; i++) {
      if(this.listCarpetas[i].nombre == carpeta) {
        return true;
      }
    }
    return false;

  }




  eliminarCarpeta(index: number){
    Swal.fire({
      title: '¿Esta seguro que desea eliminar la carpeta?',
      text: "Estos cambios no se pueden revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.listCarpetas.splice(index, 1);
        Swal.fire(
          'Carpeta Eliminada',
          'Su carpeta fue eliminada.',
          'success'
        )
      }
    })

  }


  actualizarCarpeta(carpeta: any, index: number){
    this.listCarpetas[index].estado = !carpeta.estado;
    console.log(this.listCarpetas);
  }

  verTareas(){

  }

}

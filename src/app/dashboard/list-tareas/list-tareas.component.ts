import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";


@Component({
  selector: 'app-list-tareas',
  templateUrl: './list-tareas.component.html',
  styleUrls: ['./list-tareas.component.css']
})
export class ListTareasComponent implements OnInit {

  tarea = '';
  listTareas: any[] = [];
  tareaExiste: Boolean = false;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }



  agregarTarea(){
     // console.log(this.tarea);
      const tarea = {
        nombre: this.tarea,
        finalizada: false
      };
      let tareaExiste = this.buscarTarea(tarea.nombre);
      if (tareaExiste){
        console.log('Ya existe la tarea y no se puede añadir');
        Swal.fire({
          title: 'Error!',
          text: 'La tarea ya existe, ingrese otra',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
      else{
        this.listTareas.push(tarea);
        console.log(this.listTareas);
        Swal.fire({
          title: 'Correcto!',
          text: 'La tarea fue añadida correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }

    }

  buscarTarea(tarea: string){
      console.log('La tarea es: ',tarea);
      for(let i = 0; i < this.listTareas.length; i++) {
        if(this.listTareas[i].nombre == tarea) {
          return true;
        }
      }
      return false;

    }

  eliminarTarea(index: number){
      Swal.fire({
        title: '¿Esta seguro que desea eliminar la tarea?',
        text: "Estos cambios no se pueden revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.listTareas.splice(index, 1);
          Swal.fire(
            'Tarea Eliminada',
            'Su tarea fue eliminada.',
            'success'
          )
        }
      })

    }



  editarTarea(index: number){
      let resultado = window.confirm('Estas seguro?');
      if (resultado === true) {
        window.alert('Okay, si estas seguro.');
      } else {
        window.alert('Pareces indeciso');
      }
    }



  actualizarTarea(tarea: any, index: number){
    this.listTareas[index].finalizada = !tarea.finalizada;
    console.log(this.listTareas);
  }


  openDialog(index:number){
    let nombreTarea = this.listTareas[index].nombre;
    const dialogRef = this.dialog.open(DialogComponent,  {
      width: '250px',
      data:nombreTarea
    });
    // console.log("la tarea es: ", this.listTareas[index].nombre);
    console.log("la tarea es: ", nombreTarea);
    dialogRef.afterClosed().subscribe( result => {

      if (result === nombreTarea || result === undefined){
        Swal.fire({
          title: 'Error!',
          text: 'La tarea no se modifico',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return;
      } else{
        if (result === ''){
          console.log('no cambiar');
          Swal.fire({
            title: 'Error!',
            text: 'No se puede dejar vacia la tarea, por favor ingrese un valor',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          return;
        }else{
          let tareaExiste = this.buscarTarea(result);
          if (!tareaExiste){
            this.listTareas[index].nombre = result;
            console.log('resultado:',result);
            console.log(this.listTareas)
          }else{
            console.log('Ya existe la tarea y no se puede añadir');
            Swal.fire({
              title: 'Error!',
              text: 'La tarea ya existe, ingrese otra',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          }

        }
      }



    });

  }

  }

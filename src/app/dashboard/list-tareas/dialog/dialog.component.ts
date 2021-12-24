import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  nombreTarea: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
   // console.log('imprimo',this.data.nombreTarea);
    console.log('DATA',this.data)
    this.nombreTarea = this.data;
  }



}

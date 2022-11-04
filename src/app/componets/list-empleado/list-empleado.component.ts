import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {ToastrService} from 'ngx-toastr'
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';



@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})

export class ListEmpleadoComponent implements OnInit {
  [x: string]: any;
  empleados: any[] = [];


  constructor(firestore: AngularFirestore,
              private _empleadoService: EmpleadoService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getEmpleado()
  }

  getEmpleado(){
    this._empleadoService.getEmpleados().subscribe(data =>{
      this.empleados = [];
      data.forEach((element:any) => {


        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()

        })

      })
    });
    console.log(this.empleados);
  }

  eliminarEmpleado(id: string){
    this._empleadoService.eliminarEmpleado(id).then(() => {
      console.log('empleado eliminado con exito');
      this.toastr.error('El empleado fue eliminado con exito', 'Registro eliminado!');
    }).catch(error => {
      console.log(error);
    })
  }

}

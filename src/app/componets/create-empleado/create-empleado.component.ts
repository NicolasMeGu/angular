import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
createEmpleado: FormGroup;
submitted = false;
loading = false;
id: string | null;
titulo = 'Agregar Empleado';


  constructor(private fb: FormBuilder,
              private _empleadoService: EmpleadoService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) {
    this.createEmpleado = this.fb.group({
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      contraseña:['', Validators.required],
      repcontraseña:['', Validators.required],
      edad:['', Validators.required],
      rfid:['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)

  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarEmpleado(){
    this.submitted = true;
    if(this.createEmpleado.invalid){
      return;
    }

    if(this.id == null){
      this.agregarEmpleado();
    }else{
      this.editarEmpleado(this.id);
    }



  }
  editarEmpleado(id:string){
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      contraseña: this.createEmpleado.value.contraseña,
      repcontraseña: this.createEmpleado.value.repcontraseña,
      edad: this.createEmpleado.value.edad,
      rfid: this.createEmpleado.value.rfid,
      fechaActualizacion: new Date(),
    }
    this._empleadoService.actualizarEmpleado(id, empleado).then(() => {
      this.loading = false;
      this.toastr.info('La informacion fue modificada con exito','Editado con exito!')
    })
    this.router.navigate(['/list-empleados' ]);

  }

  agregarEmpleado(){
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      contraseña: this.createEmpleado.value.contraseña,
      repcontraseña: this.createEmpleado.value.repcontraseña,
      edad: this.createEmpleado.value.edad,
      rfid: this.createEmpleado.value.rfid,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }
    this.loading = true;

    this._empleadoService.agregarEmpleado(empleado).then(() => {
     this.toastr.success('El empleado fue registrado con exito', 'Empleado registrado',{

     });
     this.loading = false;
      this.router.navigate(['/list-empleado'])

    }).catch(error => {
     console.log(error);
    })

  }

  esEditar() {
    this.titulo = 'Editar Empleado';
    if(this.id !== null) {
      this.loading = true;
      this._empleadoService.getEmpleado(this.id).subscribe(data => {
        this.loading = false;
        console.log(data);
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          contraseña: data.payload.data()['contraseña'],
          repcontraseña: data.payload.data()['repcontraseña'],
          edad: data.payload.data()['edad'],
          rfid: data.payload.data()['rfid']
        })
    })
  }
  }
}

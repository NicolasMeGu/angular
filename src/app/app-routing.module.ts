import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListEmpleadoComponent } from './componets/list-empleado/list-empleado.component';
import { CreateEmpleadoComponent } from './componets/create-empleado/create-empleado.component';

const routes: Routes  = [
  {path: '',redirectTo: 'create-empleado', pathMatch:'full'},
  {path: 'list-empleado', component: ListEmpleadoComponent},
  {path: 'create-empleado', component: CreateEmpleadoComponent},
  {path: 'editEmpleado/:id', component: CreateEmpleadoComponent},

  {path: '**',redirectTo: 'create-empleado', pathMatch:'full'},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

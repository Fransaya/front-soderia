import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

const routes: Routes = [
  { path:'', component:HomeComponent, title:'Aguas de Mesa Delfina'},
  { path:'ingresar', component: LoginComponent, title:"Iniciar Sesion"},
  { path:'contacto', component:ContactoComponent, title:"Contacto"},
  { path:'**', redirectTo:'', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

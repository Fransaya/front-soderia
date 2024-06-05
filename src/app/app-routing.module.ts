import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactoComponent } from './pages/contacto/contacto.component';

const routes: Routes = [
  { path:'', component:HomeComponent, title:'Aguas de Mesa Delfina'},
  { path:'contacto', component:ContactoComponent, title:"Contacto"},
  { path:'**', redirectTo:'', pathMatch:'full'}
];


const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

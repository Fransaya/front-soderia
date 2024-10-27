import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { RecorridosComponent } from './pages/recorridos/recorridos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ListaPreciosComponent } from './pages/lista-precios/lista-precios.component';
import { MenuComponent } from './pages/menu/menu.component';
import { protectionGuard } from './core/guard/protection.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: { title: 'Aguas de Mesa Delfina' } },
  { path: 'contacto', component: ContactoComponent, data: { title: 'Contacto' } },
  { path: 'login', component: LoginComponent, data: { title: 'Iniciar Sesión' } },
  { path: 'menu', component:MenuComponent, data: { title: 'Menu' }},
  {
    path: 'panel', component: DashboardComponent, children: [
      { path: '', redirectTo: 'cliente', pathMatch: 'full' }, // Redirige a cliente por defecto
      { path: 'cliente', component: ClienteComponent, canActivate:[protectionGuard], data: { title: 'Cliente' } },
      { path: 'ventas', component: VentasComponent, canActivate:[protectionGuard], data: { title: 'Productos' } },
      { path: 'recorridos', component: RecorridosComponent, canActivate:[protectionGuard], data: { title: 'Recorridos' } },
      { path: 'usuarios', component: UsuariosComponent, canActivate:[protectionGuard], data: { title: 'Usuarios' } },
      { path: 'pedidos', component: PedidosComponent, canActivate:[protectionGuard], data: { title: 'Pedidos' } },
      { path: 'lista-precios', component:ListaPreciosComponent, canActivate:[protectionGuard], data:{title: 'Lista de Precios'}}
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
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

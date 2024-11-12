import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UtilsService } from '../../core/services/utils/utils.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { ClientesService } from '../../core/services/clientes/clientes.service';
import { ProductosService } from '../../core/services/productos/productos.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {

  ventasForm:FormGroup;

  ventasData:any[] = [];

  clients:any[] = [];

  usuarios:any[] = [];

  filteredClients:any[]= [];

  productos:any[] = [];

  productosRespaldo = this.productos;

  inputProducto:string= "";

  productosVentas:any[] = [];

  productoSeleccionados:any[] = [];

  metodosPago:any[] = [];

  totalVenta:number = 0;

  isAdmin:boolean=false;

  showVentas:boolean=false;

  ngOnInit(): void {
    this.getMetodosPago();
    this.validateUser();
    this.getClientes();
    this.resetForm();
    this.obtenerProductos();
    
  }

  constructor(private fb: FormBuilder, private utilsService:UtilsService, private userService: AuthService, private clienteService: ClientesService,
    private productosService:ProductosService
  ){


    this.ventasForm = this.fb.group({
      idCliente:[0, Validators.required],
      cliente: ['', Validators.required],
      fecha: ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      metodoPago: ['', Validators.required],
      total: ['', Validators.required],
      notaAdicional:[''],
    });

    
  }

  //* iniciarlizar formulario con la fecha de hoy
  public resetForm(){
    const fechaActual = new Date().toISOString().split('T')[0];
    this.ventasForm.reset();
    this.ventasForm.get('fecha')?.setValue(fechaActual);
  }

  //! FUNCIONES ADICIONALES DE CLIENTES
  onClientInput() {
    const input = this.ventasForm.get('cliente')?.value.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.nombre.toLowerCase().includes(input)
    );
  }

  onClientBlur() {
    // Si la lista está vacía, limpia el campo
    if (this.filteredClients.length === 0) {
      this.ventasForm.get('cliente')?.setValue('');
    }
  }

  selectClient(client:any) {
    this.ventasForm.get('cliente')?.setValue(client.nombre);
    this.ventasForm.get('idCliente')?.setValue(client.id);
    this.filteredClients = [];
  }

  //! FILTROS DE TABLA DE VENTAS
  public applyFilters(){

  }

  public onClientFilterInput(){
    
  }

  public filtrarProducto(){
    const input = this.inputProducto.toLowerCase();
    this.productosVentas = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(input)
    );  
    if(input == ""){
      this.productosVentas=[];
    }
  };

  // eliminar productos de la lista
  public eliminarProducto(indice:number){
    this.productoSeleccionados.splice(indice, 1);
  }

  //* validacion de usuario para seleccion
  public validateUser(){
    let idUser = localStorage.getItem("idUser");
    // valido el tipo de usuario
    this.userService.getUserById(Number(idUser)).subscribe({
      next:(res:any)=>{
        if(res[0].idRol == 1){
          this.isAdmin = true;
          this.ventasForm.patchValue({usuario: res[0].idUser});
          this.getAllUsers();
        }else{
          this.ventasForm.value.usuario = res[0].idUser;
          let input = document.getElementById('inputUserVenta') as HTMLInputElement;
          input.value = res[0].alias;
        };
      },
      error:(err:any)=>{
        console.error("Error al obtener datos del usuario", err);
      }
    });
  };

  //* obtener todos los usuarios
  public getAllUsers(){
    this.userService.getAllUsers().subscribe({
      next:(res:any)=>{
        this.usuarios = res;
      },
      error:(err:any)=>{
        console.error("Error al obtener datos del usuario", err);
      }
    });
  }

  //* obtener todos los clientes
  public getClientes(){
    this.clienteService.getClientesActivos().subscribe({
      next:(res:any)=>{
        this.clients = res;
      },
      error:(err:any)=>{
        console.error("Error al obtener datos de los clientes", err);
      }
    })
  }

  //* obtener metodos de pago
  public getMetodosPago(){
    this.utilsService.getMetodosPagos().subscribe((resp:any)=>{
      this.metodosPago = resp;
      this.metodosPago.forEach((metodo:any)=>{
          if(metodo.nombre == "Efectivo"){
            this.ventasForm.patchValue({metodoPago: metodo.id});
          }
      })
    });
  }

  //* obtener productos
  public obtenerProductos(){
    this.productosService.getProductosActivos().subscribe({
      next:(res:any)=>{
        // console.log("response", res);
        this.productos = res;
      },
      error:(err:any)=>{
        console.error("Error al obtener datos de los productos", err);
      }
    })
  }


  public agregarProducto(producto:any){
    // console.log("producto", producto);
    
    this.productoSeleccionados.push(producto);
    this.calcularTotal();
  }

  public calcularTotal(){
    this.totalVenta = this.productoSeleccionados.reduce((acc, producto) => {
      const cantidad = producto.cantidadUnidades || 0;
      return acc + (producto.precio * cantidad);
    }, 0);
  }

  //todo: Registrar venta
  public registerSell(){
    if(this.ventasForm){
      
    }

  }
}

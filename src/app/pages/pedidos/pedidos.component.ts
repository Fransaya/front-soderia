import { TokenType } from '@angular/compiler';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {

  pediosForm:FormGroup;

  visible: boolean = false;

  editUser:boolean = false;

  idPedidoSelect:number= 0;

  clients = [
    { id: 1, name: 'Juan Pérez', contact: 'juan@example.com', phone: '123456789' },
    { id: 2, name: 'María García', contact: 'maria@example.com', phone: '987654321' },
    { id: 3, name: 'Carlos Rodríguez', contact: 'carlos@example.com', phone: '456789123' },
    // Agrega más clientes según sea necesario
  ];


  pedidosData=[
    {
      "cliente": "Juan Pérez",
      "cantUnidades": 5,
      "totalVenta": 150.00,
      "estado": "Completado"
    },
    {
      "cliente": "María López",
      "cantUnidades": 3,
      "totalVenta": 90.00,
      "estado": "Pendiente"
    },
    {
      "cliente": "Carlos Gómez",
      "cantUnidades": 10,
      "totalVenta": 300.00,
      "tstado": "En proceso"
    }
  ]
  

  filteredClients:any[]= [];

  ngOnInit(): void {
    
  }

  constructor(private fb: FormBuilder){
    this.pediosForm= this.fb.group({
      cliente:['', Validators.required],
      cantUnidades:[0, Validators.required],
      precioUnidades:[0, Validators.required],
      estado:[''],
      total:[0, Validators.required]
    })
  }

  //! FUNCIONES ADICIONALES DE CLIENTES
  onClientInput() {
    const input = this.pediosForm.get('cliente')?.value.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().includes(input)
    );
  }

  onClientBlur() {
    // Si la lista está vacía, limpia el campo
    if (this.filteredClients.length === 0) {
      this.pediosForm.get('cliente')?.setValue('');
    }
  }

  selectClient(client:any) {
    this.pediosForm.get('cliente')?.setValue(client.name);
    this.filteredClients = [];
  }

  //todo: MOSTRAR MODAL DE MODIFICAR
  public showUpdateStatus(){
    this.visible=true;
    //! guardar aqui el id del pedido seleccioado para despues hacer el update
    // this.idPedidoSelect= idrecibido
  }

   //TODO: OCULTAR MODAL DE MODIFICAR / CREAR
   cancelar(){
    this.visible=false;
    this.pediosForm.reset();
  }

  //todo register de pedidos
  public registerPedidos(){

  }


  //todo: modificar estado de pedidos
  public updateStatus(){

  }

  //todo eliminar pedidos
  public deletePedidos(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
        if(result.isConfirmed){
          //! accion para eliminar el pedido si apreta eliminar
        }
    });
  }
  

  public onClientFilterInput(){
    
  }


}

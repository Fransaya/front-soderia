import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {

  ventasForm:FormGroup;

  ventasData=[
    {
      "cliente": "Juan Pérez",
      "fecha": "2024-07-22",
      "hora": "14:30",
      "usuario": "Usuario 1",
      "metodoPago": "Efectivo"
    },
    {
      "cliente": "María García",
      "fecha": "2024-07-23",
      "hora": "09:00",
      "usuario": "Usuario 2",
      "metodoPago": "Transferencia"
    },
    {
      "cliente": "Carlos Rodríguez",
      "fecha": "2024-07-24",
      "hora": "11:45",
      "usuario": "Usuario 3",
      "metodoPago": "Débito"
    }
  ];

  clients = [
    { id: 1, name: 'Juan Pérez', contact: 'juan@example.com', phone: '123456789' },
    { id: 2, name: 'María García', contact: 'maria@example.com', phone: '987654321' },
    { id: 3, name: 'Carlos Rodríguez', contact: 'carlos@example.com', phone: '456789123' },
    // Agrega más clientes según sea necesario
  ];

  usuarios = [
    { id: 1, name: 'Usuario 1' },
    { id: 2, name: 'Usuario 2' },
    { id: 3, name: 'Usuario 3' },
    { id: 4, name: 'Usuario 4' },
    { id: 5, name: 'Usuario 5' }
  ];

  metodosPago = [
    { id: 'efectivo', name: 'Efectivo' },
    { id: 'transferencia', name: 'Transferencia' },
    { id: 'debito', name: 'Débito' },
    { id: 'credito', name: 'Crédito' },
    { id: 'cheque', name: 'Cheque' },
    { id: 'otro', name: 'Otro' }
  ];
  filteredClients:any[]= [];

  ngOnInit(): void {
    
  }

  constructor(private fb: FormBuilder){

    const usuarioCreador = 1
    const metodoPagoPredeterminado = 'efectivo';

    this.ventasForm = this.fb.group({
      cliente: ['', Validators.required],
      fecha: ['', [Validators.required, Validators.email]],
      hora: ['', Validators.required],
      usuario: [usuarioCreador, Validators.required],
      metodoPago: [metodoPagoPredeterminado, Validators.required],
      total: ['', Validators.required],
      notaAdicional:[''],
    });
  }

  //! FUNCIONES ADICIONALES DE CLIENTES
  onClientInput() {
    const input = this.ventasForm.get('cliente')?.value.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().includes(input)
    );
  }

  onClientBlur() {
    // Si la lista está vacía, limpia el campo
    if (this.filteredClients.length === 0) {
      this.ventasForm.get('cliente')?.setValue('');
    }
  }

  selectClient(client:any) {
    this.ventasForm.get('cliente')?.setValue(client.name);
    this.filteredClients = [];
  }

  //! FILTROS DE TABLA DE VENTAS
  public applyFilters(){

  }

  public onClientFilterInput(){
    
  }

  //TODO: Registrar venta
  public registerSell(){

  }
}

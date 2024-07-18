import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {

    clienteForm: FormGroup;

    visible: boolean = false;

    editClient:boolean = false;

    filter = {
      id: '',
      nombre: '',
      direccion: ''
    };

    //! eliminar cuando se obtengan los clientes de la base de datos
    clientes = [
      {
        id:1,
        nombre: "Juan Perez",
        email: "juan.perez@example.com",
        telefono: "1234567890",
        direccion: "Calle Falsa 123",
        ciudad: "Ciudad Ejemplo",
        codigoPostal: "5000"
      },
      {
        id:2,
        nombre: "Ana Gomez",
        email: "ana.gomez@example.com",
        telefono: "0987654321",
        direccion: "Avenida Siempreviva 742",
        ciudad: "Otra Ciudad",
        codigoPostal: "4000"
      },
      {
        id:3,
        nombre: "Carlos Lopez",
        email: "carlos.lopez@example.com",
        telefono: "111222333",
        direccion: "Boulevard de los Sueños 456",
        ciudad: "Ciudad Fantasía",
        codigoPostal: "3000"
      },
      {
        id:4,
        nombre: "Lucia Rodriguez",
        email: "lucia.rodriguez@example.com",
        telefono: "333222111",
        direccion: "Calle de la Luna 789",
        ciudad: "Ciudad Luna",
        codigoPostal: "2000"
      },
      {
        id:5,
        nombre: "Pedro Fernandez",
        email: "pedro.fernandez@example.com",
        telefono: "444555666",
        direccion: "Calle del Sol 321",
        ciudad: "Ciudad Sol",
        codigoPostal: "1000"
      }
    ];


    ngOnInit(): void {
    }

    constructor(private fb: FormBuilder){
      this.clienteForm = this.fb.group({
        nombre: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', Validators.required],
        direccion: [''],
        ciudad: [''],
        codigoPostal: ['']
        // Agrega más campos según tus necesidades
      });
    };

    //TODO: MOSTRAR MODAL DE MODIFICAR/CREAR
    showDialog() {
        this.visible = true;
        this.editClient=false;
    }

    //TODO: OCULTAR MODAL DE MODIFICAR / CREAR
    cancelar(){
      this.visible=false;
      this.clienteForm.reset();
    }

    //TODO: FILTROS DE  CLIENTES
    public filterClients(){ //! falta hacer logica para distingir el filtrado de clientes
      //**ver si se puede realizar logica de filtrado en el back o directamente hacer desde el frontned */

    }

    //TODO: REGISTRAR CLIENTE
    public registerClient(){

    }

    //TODO: MOSTRAR MODIFICAR CLIENTE
    public showUpdate(cliente:any){
      this.visible=true;
      this.editClient=true;
      this.clienteForm.patchValue(cliente)
    }

    //TODO: MODIFICAR CLIENTE
    public updateClient(){
      this.visible=true;
      this.editClient=true;
    }

    
    //TODO: ELIMINAR CLIENTE
    public deleteClient(id:number){
      Swal.fire({
        title:"Desea eliminar el cliente?",
        text:"perdera todos los datos del mismo",
        timer:5000,
        showCancelButton:true,
        showConfirmButton:true,
        cancelButtonText:"Cancelar",
        confirmButtonText:"Eliminar",
        confirmButtonColor:"#dc3545",
        cancelButtonColor:"#79ae92"
      });
    }
}

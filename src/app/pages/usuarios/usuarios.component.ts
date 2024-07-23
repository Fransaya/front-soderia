import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

    usuarioForm: FormGroup;

    visible: boolean = false;

    editUser:boolean = false;

    filter = {
      id: '',
      nombre: '',
      rol: ''
    };

  //! eliminar cuando se obtengan los clientes de la base de datos
  usuarios = [
    {
      id:1,
      nombre: "Juan Perez",
      email: "juan.perez@example.com",
      telefono: "1234567890",
      rol: {id:1, tipo:"Administrador"},
      estado: {id:1, tipo:"Activo"},
    },
    {
      id:2,
      nombre: "Ana Gomez",
      email: "ana.gomez@example.com",
      telefono: "0987654321",
      rol: {id:1, tipo:"Produccion"},
      estado: {id:1, tipo:"Activo"},
    },
    {
      id:3,
      nombre: "Carlos Lopez",
      email: "carlos.lopez@example.com",
      telefono: "111222333",
      rol: {id:1, tipo:"Produccion"},
      estado: {id:1, tipo:"Inactivo"},
    },
    {
      id:4,
      nombre: "Lucia Rodriguez",
      email: "lucia.rodriguez@example.com",
      telefono: "333222111",
      rol: {id:1, tipo:"Repartidor"},
      estado: {id:2, tipo:"Inactivo"},
    },
    {
      id:5,
      nombre: "Pedro Fernandez",
      email: "pedro.fernandez@example.com",
      telefono: "444555666",
      rol: {id:1, tipo:"Repartidor"},
      estado: {id:2, tipo:"Activo"},
    }
  ];

  ngOnInit(): void {
    
  }

  constructor( private fb: FormBuilder ){
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      rol: [''],
      estado: [''],
      // Agrega más campos según tus necesidades
    });
  };

   //TODO: MOSTRAR MODAL DE MODIFICAR/CREAR
    showDialog() {
      this.visible = true;
      this.editUser=false;
    }

    //TODO: OCULTAR MODAL DE MODIFICAR / CREAR
    cancelar(){
      this.visible=false;
      this.usuarioForm.reset();
    }

    //TODO: FILTROS DE  CLIENTES
    public filterClients(){ //! falta hacer logica para distingir el filtrado de clientes
      //**ver si se puede realizar logica de filtrado en el back o directamente hacer desde el frontned */

    }

    //TODO: REGISTRAR CLIENTE
    public registerClient(){

    }

    //TODO: MOSTRAR MODIFICAR CLIENTE
    public showUpdate(usuario:any){
      this.visible=true;
      this.editUser=true;

      const rolMap:any = {
        '1': 'administrador',
        '2': 'produccion',
        '3': 'repartidor'
      };
    
      const estadoMap:any = {
        '1': 'activo',
        '2': 'inactivo'
      };
    
      this.usuarioForm.patchValue({
        nombre: usuario.nombre,
        email: usuario.email,
        telefono: usuario.telefono,
        rol: rolMap[usuario.rol.id], // Mapea el id al valor correcto
        estado: estadoMap[usuario.estado.id] // Mapea el id al valor correcto
      });
      
    }

    //TODO: MODIFICAR CLIENTE
    public updateClient(){
      this.visible=true;
      this.editUser=true;
    }

    
    //TODO: ELIMINAR CLIENTE
    public deleteClient(id:number){
      Swal.fire({
        title:"Desea desactivar el usuario?",
        text:"",
        timer:5000,
        showCancelButton:true,
        showConfirmButton:true,
        cancelButtonText:"Cancelar",
        confirmButtonText:"Desactivar",
        confirmButtonColor:"#dc3545",
        cancelButtonColor:"#79ae92"
      });
    }



}

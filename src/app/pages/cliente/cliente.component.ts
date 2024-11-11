import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClientesService } from '../../core/services/clientes/clientes.service';
import { BarriosService } from '../../core/services/barrios/barrios.service';

export interface Cliente {
    id: number;
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    idBarrio: number;
    barrio_nombre: string;
    estado: number;
    observaciones: string | null;
}


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {

    clienteForm: FormGroup;

    visible: boolean = false;

    editClient:boolean = false;

    idClientSelect:number=0;

    filter = {
      id: null,
      nombre: '',
      estado: -1
    };

    clientes:Cliente[] = [];
    clientesCopy:Cliente[] = [];

    barrios:any[] = [];

    

    ngOnInit(): void {
      this.getClientes();
      this.getBarrios();
    }

    constructor(private fb: FormBuilder, private clienteService:ClientesService, private barriosService:BarriosService){
      this.clienteForm = this.fb.group({
        nombre: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', Validators.required],
        direccion: [''],
        idBarrio: [null, Validators.required],
        estado: [1]
      });
    };


    //todo: MOSTRAR MODAL DE MODIFICAR/CREAR
    showDialog() {
        this.visible = true;
        this.editClient=false;
    }

    //todo: OCULTAR MODAL DE MODIFICAR / CREAR
    cancelar(){
      this.visible=false;
      this.clienteForm.reset();
    }

    //todo: FILTROS DE  CLIENTES
    public filterClients(){ 
      // console.log("entro al filtro")
      if(this.filter.id){
        this.clienteService.getClienteId(this.filter.id).subscribe({
          next: (data:any) => {
            this.clientes = data;
          },
          error: (error) => {
            console.error('Error al obtener los clientes:', error);
          }
        })
      }else if(this.filter.nombre){
        this.clientes = this.clientesCopy.filter(cliente => cliente.nombre.toLowerCase().includes(this.filter.nombre.toLowerCase()));
      }else if(this.filter.estado){
        if(this.filter.estado < 0){
          this.clientes = this.clientesCopy;

        }else{
          this.clientes = this.clientesCopy.filter(cliente => this.filter.estado ==  cliente.estado);

        }

      }else{
        this.getClientes()
      }
    }

    //todo OBTENER BARRIOS
    public getBarrios(){
      this.barriosService.getBarrios().subscribe({
        next: (data) => {
          this.barrios = data;

        },
        error: (error) => {
          console.error('Error al obtener los barrios:', error);
        }
      })
    } 

    //todo: OBTENER CLIENTES
    public getClientes(){
      this.clienteService.getClientes().subscribe({
        next: (data) => {
          // console.log("data",data)
          this.clientes = data;
          this.clientesCopy = [...this.clientes];
        },
        error: (error) => {
          console.error('Error al obtener los clientes:', error);
        }
      })
    }

    //todo: REGISTRAR CLIENTE
    public registerClient(){
      if(this.clienteForm.valid){
        this.clienteService.createCliente(this.clienteForm.value).subscribe({
          next: (data) => {
            this.getClientes();
            this.cancelar();
            Swal.fire({
              title: 'Cliente creado',
              text: 'El cliente ha sido creado correctamente',
              icon: 'success',
              timer: 3000
            });
          },
          error: (err) => {
            console.log(" erro al registrar",err)
            Swal.fire({
              title: 'Error',
              text: err.error.message,
              icon: 'error',
              timer: 3000,
              
            });
          }
        })
      }

    }

    //todo: MOSTRAR MODIFICAR CLIENTE
    public showUpdate(cliente:any){
      this.visible=true;
      this.editClient=true;
      this.idClientSelect=cliente.id;
      this.clienteForm.patchValue(cliente)
    }

    //todo: MODIFICAR CLIENTE
    public updateClient(){
      this.visible=true;
      this.editClient=true;
      this.clienteService.updateCliente(this.idClientSelect, this.clienteForm.value).subscribe({
        next: (data) => {
          this.getClientes();
          this.cancelar();
          Swal.fire({
            title: 'Cliente modificado',
            text: 'El cliente ha sido modificado correctamente',
            icon: 'success',
            timer: 3000
          });
        },
        error: (error) => {
          console.error('Error al modificar el cliente:', error);
        }
      })
    }

    
    //todo: ELIMINAR CLIENTE
    public deleteClient(id:number, cliente:any){
      Swal.fire({
        title:"Desea Cambiar el estado del cliente?",
        text:`pasara a estar ${cliente.estado == 0 ? 'Activado' : 'Desactivado'}`,
        timer:5000,
        showConfirmButton:true,

        showCancelButton:true,
        confirmButtonText:`${cliente.estado == 0 ? 'Activar' : 'Desactivar'}`,
        cancelButtonText:"Cancelar",
        confirmButtonColor:"#43cd29",
        cancelButtonColor:"#ee0f0f"
      }).then((result)=>{
        if(result.isConfirmed){
          cliente.estado = cliente.estado == 0 ? 1 : 0;
          this.clienteService.updateCliente(id, cliente).subscribe({
            next: (data) => {
              this.getClientes();
              Swal.fire({
                title: 'Cliente Actualizado',
                text: 'El estado del cliente fue actualizado',
                icon: 'success',
                timer: 3000
              });
            },
            error: (error) => {
              console.error('Error al actualizar el cliente:', error);
            }
          })
        }
      });
    }
}
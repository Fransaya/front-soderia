import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth/auth.service';
import { RolesService } from '../../core/services/roles/roles.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  providers: [MessageService]
})
export class UsuariosComponent implements OnInit {

    usuarioForm: FormGroup;

    passwordForm:FormGroup;

    visible: boolean = false;

    showEditPassword:boolean = false;

    showPassword:boolean = false;

    editUser:boolean = false;

    filter = {
      id: '',
      nombre: '',
      rol: ''
    };

    // guardo el usuario seleccionado para recuperar datos
    userSelected:any = null;

  
    // array de usuarios
    usuarios:any[] = [];
    usuariosCopia:any[] = [];
    // array de roles
    roles:any[] = [];

  ngOnInit(): void {
    // llamo metodo para obtener usuarios
    this.getAllUsers();
    // metodo para obtener los roles
    this.getAllRoles();
  }

  constructor( private fb: FormBuilder, private userService:AuthService, private roleService:RolesService, private messageService: MessageService ){
    // formulario del usuario
    this.usuarioForm = this.fb.group({
      alias: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      idRol: [''],
      estado: ['1'],
      fechaNacimiento: ['', Validators.required],
      // Agrega más campos según tus necesidades
    });

    // formulario para cambiar la clave
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],  // Para confirmar la contraseña
    }, { validator: this.passwordMatchValidator });
  };

    //todo: Validador personalizado para confirmar contraseñas
    passwordMatchValidator(g: FormGroup) {
      return g.get('password')?.value === g.get('confirmPassword')?.value
        ? null : { mismatch: true };
    }

    //todo: mostrar y ocultar clave
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

   //todo: MOSTRAR MODAL DE MODIFICAR/CREAR
    showDialog() {
      this.visible = true;
      this.editUser=false;
    }

    //todo: OCULTAR MODAL DE MODIFICAR / CREAR
    cancelar(){
      this.visible=false;
      this.usuarioForm.reset();
    }

    //todo: FILTROS DE  CLIENTES
    public filterClients(){ 
      this.usuarios = [...this.usuariosCopia];

      // Filtrar por id si el filtro no está vacío
      if(this.filter.id !== "") {
          this.usuarios = this.usuarios.filter((usuario:any) => usuario.idUser == this.filter.id);
      }

      // Filtrar por nombre si el filtro no está vacío
      if(this.filter.nombre !== "") {
          this.usuarios = this.usuarios.filter((usuario:any) => usuario.alias.toLowerCase().includes(this.filter.nombre.toLowerCase()));
      }

      // Filtrar por rol si el filtro no está vacío
      if(this.filter.rol !== "") {
          this.usuarios = this.usuarios.filter((usuario:any) => usuario.idRol == this.filter.rol);
      }
    }

    //todo: OBTENER TODOS LOS ROLES
    private getAllRoles(){
      this.roleService.getRoles().subscribe({
        next: (response:any)=>{
          this.roles = response;
        },
        error: (error:any)=>{
          console.log(error);
        }
      });
    }
    //todo: OBTENER TODOS LOS USUARIOS
    private getAllUsers(){
      this.userService.getAllUsers().subscribe({
        next: (response:any)=>{
          // console.log("data", response)
          this.usuarios = response;
          this.usuariosCopia = [...this.usuarios];
        },
        error: (error:any)=>{
          console.log(error);
        }
      })
    }

    //todo: REGISTRAR CLIENTE
    public registerClient(){
      console.log("valor form", this.usuarioForm.value)
      if(this.usuarioForm.valid){
        this.userService.createUser(this.usuarioForm.value).subscribe({
          next: (response:any)=>{
            console.log("response", response)
            Swal.fire({
              title:"Usuario creado correctamente",
              text:"",
              timer:2000,
              showCancelButton:false,
              showConfirmButton:false,
              icon:"success"
            });
            this.getAllUsers();
            this.cancelar();
          },
          error: (error:any)=>{
            console.log(error);
          }
        })
      }

    }

    //todo: MOSTRAR MODIFICAR CLIENTE
    public showUpdate(usuario:any){
      this.visible=true;
      this.editUser=true;
      this.userSelected=usuario;

      this.usuarioForm.patchValue({
        alias: usuario.alias, 
        email: usuario.email,
        telefono: usuario.telefono,
        idRol: usuario.idRol, // Mapea el id al valor correcto
        estado: usuario.estado == 'Activo' ? 1 : 0, // Mapea el id al valor correcto
        fechaNacimiento:new Date(usuario.fecha_nacimiento).toISOString().split('T')[0]
      });
      
    }

    //todo: MODIFICAR CLIENTE
    public updateUser(){
      this.visible=true;
      this.editUser=true;
      
        this.userService.updateUser(this.userSelected.idUser, this.usuarioForm.value).subscribe({
          next: (response:any)=>{
            Swal.fire({
              title:"Usuario actualizado correctamente",
              text:"",
              timer:2000,
              showCancelButton:false,
              showConfirmButton:false,
              icon:"success"
            });
            this.getAllUsers();
            this.cancelar();
          },
          error: (error:any)=>{
            console.log(error);
            this.messageService.add({
              severity: 'error', 
              summary: 'Error al actualizar usuario', 
              detail: error.error.message, 
              life: 2000 // Esto controla el tiempo que el mensaje estará visible (en milisegundos)
            });
          }
        })
    };

    //todo: MOSTRAR MODIFICAR CONTASEÑA
    public showUpdatePassword(usuario:any){
      this.showEditPassword=true;
      this.userSelected=usuario;
    }

    //todo: CAMBIAR CLAVE DEL USUARIO
    public updatePasswordUser(){
      if(this.passwordForm.valid){
        let password = this.passwordForm.get('password')?.value;
        this.userService.updatePassword(this.userSelected.idUser, password).subscribe({
          next: (response:any)=>{
            console.log("response", response);
            this.messageService.add({
              severity: 'success',
              summary: response.message,
              detail: '',
              life: 2000 // Esto controla el tiempo que el mensaje estará visible (en milisegundos)
            });
            this.getAllUsers();
            this.passwordForm.reset();
            setTimeout(()=>{
              this.showEditPassword=false;
            },2000)
          },
          error: (error:any)=>{
            console.log(error);
          }
        });
      }
    }

    
    //todo: desactivar cliente
    public deleteUser(usuario:any){
      Swal.fire({
        title:`Desea ${usuario.estado == 'Activo' ? 'Desactivar' : 'Activar'} el usuario?`,
        text:"",
        timer:5000,
        showCancelButton:true,
        showConfirmButton:true,
        cancelButtonText:"Cancelar",
        confirmButtonText:`${usuario.estado == 'Activo' ? 'Desactivar' : 'Activar'}`,
        confirmButtonColor:"#dc3545",
        cancelButtonColor:"#79ae92"
      }).then((result:any)=>{
        if(result.isConfirmed){
          usuario.estado = usuario.estado == 'Activo' ? 0 : 1;
          let nuevoEstado = usuario.estado == 1 ? 'Activo' : 'Inactivo';

          //formateo de fecha
          usuario.fecha_nacimiento = new Date(usuario.fecha_nacimiento).toISOString().split('T')[0];

          this.userService.updateUser(usuario.idUser, usuario).subscribe({
            next: (response:any)=>{
              Swal.fire({
                title:`Usuario ${nuevoEstado} correctamente`,
                text:"",
                timer:1000,
                showCancelButton:false,
                showConfirmButton:false,
                icon:"success"
              });
              this.getAllUsers();
            },
            error: (error:any)=>{
              console.log(error);
            }
          })
        }
      });
    }



}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import Swal from 'sweetalert2';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router, private authService:AuthService, private messageService: MessageService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if(this.loginForm.valid){
        const body = this.loginForm.value;

        this.authService.login(body).subscribe({
          next:(res:any)=>{
            console.log("res", res);
            if(res){

              localStorage.setItem('token', res.data.token);
              localStorage.setItem('idUser', res.data.id);
              this.router.navigate(['/menu']);
            }
          },
          error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            // Swal.fire("Error", err.error.message, "error");
            console.error("Error al iniciar sesion", err);
          }
        })
      }
    
      
    }
  }

}

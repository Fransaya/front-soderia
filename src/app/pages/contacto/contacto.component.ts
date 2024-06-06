import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { EmailServicesService } from '../../core/services/emailService/email-services.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
  providers:[MessageService]
})

export class ContactoComponent implements OnInit {

  contactoForm: FormGroup= this.fb.group({});

  ngOnInit(): void {
    this.initForm();
  }

  constructor(private fb:FormBuilder, private messageServices: MessageService, private emailService: EmailServicesService ){

  }

  // inicializo el formulario
  private initForm(){
    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      mensaje: ['', Validators.required]
    });
  };

  // mostrar alertas
  private seeAlert(title:string,message:string,status:string){
    this.messageServices.add({severity:status, summary:title, detail:message});
  }


  public enviarForm(){
    console.log("valores del form", this.contactoForm)
    if(this.contactoForm.valid){
      const mailEmpresa = 'fransay04@gmail.com';
      const to = this.contactoForm.value.correo;
      const celular= this.contactoForm.value.celular;
      const message = this.contactoForm.value.mensaje;
      console.log("aca llego")
      const template = {
        from_name: mailEmpresa,
        to_name:to,
        message
      };
      this.sendMail(template);
      // window.location.href=`mailto:${mailEmpresa}?subject${encodeURIComponent(to)}&body=${encodeURIComponent(message)}`;
      // this.seeAlert("Enviado","Hemos recibio tu consulta y nos pondemos en contacto!. Muchas Gracias", "success");
      this.contactoForm.reset();
      //todo: se debe realizar una consulta al back, primero en donde se guarden los datos de la consulta, y despues se 
      //todo un mail notificando de que hemos recibido su consulta y nos pondremos en contacto
    }else{
      this.seeAlert("Incompleto","Verifica los datos en el formulario","warning");
    }
  };

  private sendMail(templateParams:any){
    this.emailService.sendEmail(templateParams)
      .then((response: EmailJSResponseStatus) => {
        console.log('Correo enviado con éxito!', response.status, response.text);
        if(response.status){
          this.seeAlert("Enviado","Hemos recibio tu consulta y nos pondemos en contacto!. Muchas Gracias", "success");
        }else{
          this.seeAlert("Error","Succedio un error y no pudimos enviar tu mail","warning");

        }
      }, (error) => {
        console.error('Error al enviar el correo', error);
      });
  }



}

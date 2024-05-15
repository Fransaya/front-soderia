import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactoComponent implements OnInit {

  contactoForm: FormGroup= this.fb.group({})

  ngOnInit(): void {
    this.initForm();
  }

  constructor(private fb:FormBuilder){

  }

  private initForm(){
    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      mensaje: ['', Validators.required]
    });
  };

  public enviarForm(){
    console.log("valores del form", this.contactoForm)
    if(this.contactoForm.valid){

    }
  }



}

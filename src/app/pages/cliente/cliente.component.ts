import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {

    clienteForm: FormGroup;

    visible: boolean = false;


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


    showDialog() {
        this.visible = true;
    }

    //TODO: REGISTRAR CLIENTE
    public registerClient(){

    }
}

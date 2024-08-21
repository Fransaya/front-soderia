import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  actualYear:number=0;

  ngOnInit(): void {
    this.actualYear= (new Date().getFullYear())  
  }

  constructor(private router:Router){

  }

  iniciarSesion(){
    //! falta valiadar que no este logueado cuando apreta el boton
    this.router.navigate(['login']);
  }
}

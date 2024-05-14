import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  navbarOpen = false;


  ngOnInit(): void {
    
  }

  constructor(private router:Router){

  }

  public rutaComponent(ruta:string){
    this.router.navigate([ruta])
  }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}

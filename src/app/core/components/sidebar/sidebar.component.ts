import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  isExpanded = true;

  ngOnInit(): void {
  }

  constructor(private router:Router){

  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  public cerrarSesion(){
    this.router.navigate(['']);

  }

}

import { Component, OnInit  } from '@angular/core';
import { Router,Event, NavigationEnd } from '@angular/router';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  navbarOpen: boolean = false;

  currentUrl: string = '';

  activeSection: string = '';

  constructor(private router:Router){
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.urlAfterRedirects;
    });
  }

  ngOnInit(): void {
    
  }

  public rutaComponent(ruta:string){
    this.router.navigate([ruta])
  }

  public toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }


  
}

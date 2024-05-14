import { Component, OnInit } from '@angular/core';

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

  constructor(){

  }
}

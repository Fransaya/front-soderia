import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  isExpanded = true;

  ngOnInit(): void {
  }

  constructor(){

  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

}

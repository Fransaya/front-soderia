import { Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TimeLineComponent{

  events: any[];

  constructor(){
    this.events = [
      { 
        status: 'Creación y comienzo', 
        date: '2005', 
        content:"Aqui es donde comienza y surge en base a la necesidad de la gente de alguien que le pudiera llevar la soda a su casa",
        icon: 'pi pi-hammer', 
      },
      { 
        status: 'Expansion', 
        date: '2010', 
        content:"Expandimos nuestras zonas de reparto a barrios aledaños y mas zonas de villa maria",
        icon: 'pi pi-arrows-alt', 
      },
      { 
        status: 'Mejora de equipos', 
        date: '2015', 
        content:"Adquisicion de nuevas maquinarias para mejorar la capacidad de producción",
        icon:"pi pi-truck"
      },
      { 
        status: 'Personal', 
        date: '2020', 
        content:"Incorporamos nuevo personal para mejorar la calidad y velocidad de entrega y de producción",
        icon: 'pi pi-users', 
      },
      { 
        status: 'Actualidad', 
        date: '2024', 
        content:"En la actualidad queremos seguir mejorando en todos los aspectos, con mejores equipos y cada vez sumando mas personal",
        icon: 'pi pi-calendar-times', 
      }
    ];
  }

}

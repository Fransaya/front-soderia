import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-product-list-demo',
  template: `
    <p-table [value]="detallesPedido" responsiveLayout="scroll">
      <ng-template pTemplate="header">
        <tr>
          <th>Producto</th>
          <th>Unidades</th>
          <th>Precio Unitario</th>
          <th>Total</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-detalle>
        <tr>
          <td>{{detalle.nombreProd}}</td>
          <td>{{detalle.unidadesPedidas}}</td>
          <td>{{detalle.precioUnitario}}</td>
          <td>{{detalle.total}}</td>
        </tr>
      </ng-template>
    </p-table>
    <button pButton type="button" label="Cerrar" (click)="cerrarDialogo()"></button>
  `,
  styleUrl: './product-list-demo.component.css'
})
export class ProductListDemoComponent {

  detallesPedido: any[];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    // Recibe los detalles del pedido a través de la configuración del diálogo
    this.detallesPedido = this.config.data.detallesPedido;
  }

  cerrarDialogo() {
    this.ref.close();
  }

}

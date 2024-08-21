import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-lista-precios',
  templateUrl: './lista-precios.component.html',
  styleUrl: './lista-precios.component.css'
})
export class ListaPreciosComponent implements OnInit{

   mostrarFormulario = false;

   formProducto: FormGroup;

  visible:boolean=false;

  productos1:any[]=[];

  productos2:any[]=[];

  precioModificado:number=0;

  productoSelect:any;

    ngOnInit(): void {
      
    }

    constructor(private fb:FormBuilder){
      this.productos1 = [
        {
            "id": 1,
            "producto": "Producto A",
            "precio": 10.00
        },
        {
            "id": 2,
            "producto": "Producto B",
            "precio": 15.00
        },
        {
            "id": 3,
            "producto": "Producto E",
            "precio": 12.00
        },
        {
            "id": 4,
            "producto": "Producto F",
            "precio": 8.50
        }
      ];

      this.formProducto = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0.01)]]
    });
    }

    //! FUNCIONES Y METODOS DEL CODIGO PARA LA FUNCIONALIDAD


  //todo: OCULTAR MODAL DE MODIFICAR PRECIO
  cancelar(){
    this.visible=false;
  }

  agregarProducto() {
    if (this.formProducto.valid) {
      const producto = this.formProducto.value;
      console.log('Producto agregado:', producto);
      // Lógica para agregar el producto
      this.mostrarFormulario = false;
      this.formProducto.reset();
    }
  }

  //todo metodo para mostrar el modal para modificar el precio del producto
    public modificarPrecio(producto:any){
      this.visible=true;
      this.productoSelect=producto;
      this.precioModificado=producto.precio;
    }
    //todo metodo para actualizar el precio de un producto
    public actualizarPrecio(){

    }
    //todo metodo para eliminar un producto de la lista de precios
    public eliminarProductoLista(){
      Swal.fire({
        title: '¿Desea eliminar el producto de la lista de precios?',
        text: 'No podrás revertir esto.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
          if(result.isConfirmed){
            //! accion para eliminar el pedido si apreta eliminar
          }
      });
    }

}

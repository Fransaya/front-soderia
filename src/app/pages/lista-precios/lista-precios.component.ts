import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../core/services/productos/productos.service';
import { MessageService } from 'primeng/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-lista-precios',
  templateUrl: './lista-precios.component.html',
  styleUrl: './lista-precios.component.css',
  providers: [MessageService]
})
export class ListaPreciosComponent implements OnInit{

  mostrarFormulario = false;

  formProducto: FormGroup;

  visible:boolean=false;

  mostrarModal:boolean = false;

  editProducto:boolean = false;

  productos:any[]=[];

  productosSeleccionados: any[] = [];

  listaProductos: any[] = []; 

  precioModificado:number=0;

  productoSelect:any;

    ngOnInit(): void {
      this.obtenerProductos();
      this.getProductosLista();
    }

    constructor(private fb:FormBuilder, private productosService:ProductosService, private MessageService:MessageService){
      this.formProducto = this.fb.group({
        nombre: ['', Validators.required],
        descripcion:[''],
        precio: ['', [Validators.required, Validators.min(0.01)]],
        estado:[1, Validators.required]
      });
    }

  //! FUNCIONES Y METODOS DEL CODIGO PARA LA FUNCIONALIDAD

  //todo: OBTENER TODOS LOS PRODUCTOS
  public obtenerProductos(){
    this.productosService.getProductos().subscribe({
      next:(res:any)=>{
        console.log("response", res)
        this.productos=res;
      },
      error:(err:any)=>{
        console.log("error", err)
        Swal.fire("Error", "Ocurrio un error al obtener los productos", "error")
      }
    });
  }

  //todo: VER INFORMACION DEL PRODUCTO
  public verInformacion(producto:any){
    Swal.fire({
      title:`Informacion de ${producto.nombre}`,
      text: `Descripcion ${producto.descripcion},  Estado: ${producto.estado == 1 ? 'Activo' : 'Inactivo'}`,
      confirmButtonText:"Aceptar",
      showConfirmButton:true
    })
  };

  //todo: MOSTRAR EDITAR PROUCTO
  public showEditProduct(producto:any){
    this.editProducto=true;
    this.productoSelect = producto;
    this.mostrarFormulario = true;
    this.formProducto.patchValue({
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion, 
      estado: producto.estado
    });

  }

  //todo: EDITAR INFORMACION DEL PRODUCTO
  public editProduct(){
    const producto = this.formProducto.value;
    this.productosService.updateProducto(this.productoSelect.id, producto).subscribe({
      next:(res:any)=>{
        console.log("response", res)
        Swal.fire("Exito", "Producto editado correctamente", "success")
        this.obtenerProductos();
        this.mostrarFormulario = false;
        this.formProducto.reset();
      },
      error:(err:any)=>{
        console.log("error", err)
        Swal.fire("Error", "Ocurrio un error al editar el producto", "error")
      }
    })
  };


  //todo: OCULTAR MODAL DE MODIFICAR PRECIO
  cancelar(){
    this.visible=false;
    this.mostrarFormulario=false;
    this.editProducto=false;
    this.formProducto.reset();
  }

  //todo: MOSTRAR PARA CREAR PRODUCTO
  public showAgregarProducto() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.editProducto=false;
    this.formProducto.reset();
  }

  agregarProducto() {
    if (this.formProducto.valid) {
      const producto = this.formProducto.value;
      this.productosService.createProducto(producto).subscribe({
        next:(res:any)=>{
          console.log("response", res)
          this.obtenerProductos();
          this.mostrarFormulario = false;
          this.formProducto.reset();
        },
        error:(err:any)=>{
          console.log("error", err)
          Swal.fire("Error", "Ocurrio un error al crear el producto", "error" )
        }
      })
    }
  };

  //todo: MOSTRAR MODAL PARA AGREGAR PRODUCTO A LA LISTA DE PRECIOS
  public showAgregarLista(){
    this.mostrarModal=true;
  }

  // Cerrar el modal
  cerrarModal() {
    this.mostrarModal = false;
  }

  //todo: OBTENER PRODUCTOS DE LA LISTA DE PRECIOS
  public getProductosLista(){
    this.productosService.getProductosListaPrecios().subscribe({
      next:(res:any)=>{
        console.log("lista precios", res)
        if(res.status){
          this.listaProductos=res.data;
        }else{
          this.MessageService.add({severity:'error', summary: 'Error', detail: res.message});
        }
      },
      error:(err:any)=>{
        console.log("error", err)
        this.MessageService.add({severity:'error', summary: 'Error', detail: err.message});
      }
    })
  }


  //todo: AGREGAR PRDUCTOS A LA LISTA DE PRECIOS
  public addProductoLista(){
    // envio los productos al back para agregarlos
    this.productosService.addProductosListaPrecios(this.productosSeleccionados).subscribe({
      next:(res:any)=>{
        console.log("response", res)
        Swal.fire("Exito", "Productos agregados correctamente", "success")
        this.obtenerProductos();
        this.getProductosLista();
        this.productosSeleccionados = [];
        this.cerrarModal();
      },
      error:(err:any)=>{
        console.log("error", err)
        Swal.fire("Error", "Ocurrio un error al agregar los productos", "error")
      }
    })

  }

  //todo metodo para mostrar el modal para modificar el precio del producto
    public modificarPrecio(producto:any){
      this.visible=true;
      this.productoSelect=producto;
      this.precioModificado=producto.precio;
    }

    // check selector de la lista de producto
    onCheckboxChange(producto: any) {
    if (producto.seleccionado) {
      // Agregar el producto a la lista de seleccionados
      this.productosSeleccionados.push(producto);
    } else {
      // Remover el producto si se deselecciona
      this.productosSeleccionados = this.productosSeleccionados.filter(p => p !== producto);
    }
  }


    //todo metodo para actualizar el precio de un producto
    public actualizarPrecio(){
      this.productoSelect.precioProducto =this.precioModificado;
      this.productosService.updateProductLista(this.productoSelect.idDetalleLista, this.productoSelect).subscribe({
        next:(res:any)=>{
          this.getProductosLista();
          this.visible=false;
          this.MessageService.add({severity:'success', summary: 'Exito', detail: 'Producto actualizado correctamente'});
        },
        error:(err:any)=>{
          console.log("error", err)
          this.MessageService.add({severity:'error', summary: 'Error', detail: 'Ocurrio un error al actualizar el producto'});
        }
      })

    }

    //todo metodo para eliminar un producto de la lista de precios
    public eliminarProductoLista(idDetalle:number){
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
            this.productosService.deleteProductLista(idDetalle).subscribe({
              next:(res:any)=>{
                this.listaProductos = this.listaProductos.filter(producto => producto.idDetalleLista !== idDetalle);
                this.productoSelect = [];
                this.MessageService.add({severity:'success', summary: 'Exito', detail: 'Producto eliminado correctamente'});
                setTimeout(()=>{
                  this.getProductosLista();
                },1000);
              },
              error:(err:any)=>{
                console.log("error", err)
                this.MessageService.add({severity:'error', summary: 'Error', detail: 'Ocurrio un error al eliminar el producto'});
              }
            })
          }
      });
    }

    // DESCARGAR PDF
    public createPDF(){
        const doc = new jsPDF();
        const fechaHoy = new Date().toLocaleDateString();

        // Título y Fecha
        doc.setFontSize(18);
        doc.text('Lista de Precios', 14, 22);
        doc.setFontSize(12);
        doc.text(`Fecha: ${fechaHoy}`, 14, 30);

        // Datos de la tabla
        const data = this.listaProductos.map(prod => [prod.idDetalleLista, prod.nombre, prod.precioProducto]);

        // Generar la tabla
        (doc as any).autoTable({
          head: [['Codigo', 'Producto', 'Precio']],
          body: data,
          startY: 40,
        });

        // Guardar el PDF con nombre "ListaDePrecios-Fecha.pdf"
        doc.save(`ListaDePrecios-${fechaHoy}.pdf`);
    }

    // DESCARGAR EXEL
    public createExcel(){
      const fechaHoy = new Date().toLocaleDateString().replace(/\//g, '-'); // Formato de fecha como "13-10-2024"
      const wsData = this.listaProductos.map(prod => ({
          Codigo: prod.idDetalleLista,
          Producto: prod.nombre,
          Precio: prod.precioProducto,
      }));

      // Crear una hoja de trabajo
      const worksheet = XLSX.utils.json_to_sheet(wsData);

      // Crear un libro de trabajo
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de Precios');

      // Escribir archivo
      XLSX.writeFile(workbook, `ListaDePrecios-${fechaHoy}.xlsx`);

    }

}

import { Component, OnChanges, OnDestroy, OnInit,ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClientesService } from '../../core/services/clientes/clientes.service';
import { ProductosService } from '../../core/services/productos/productos.service';
import { PedidosService } from '../../core/services/pedidos/pedidos.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductListDemoComponent } from './product-list-demo/product-list-demo.component';
import { NotExpr } from '@angular/compiler';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
  providers: [DialogService, MessageService]
})
export class PedidosComponent implements OnInit, OnDestroy {
  // formulario de pedido
  pediosForm:FormGroup;
  // valor seleccionado para buscar por fecha de pedido
  fechaPedido:any;
  // fecha desde para buscar los pedidos cuando se buscan en todos
  fechaDesde:Date= new Date();
  // fecha hasta para buscar los pedidos cuando se buscan en todos
  fechaHasta:Date= new Date();
  // variable para mostrar modal de filtro con rango de fechas
  showRangeDateFilter:boolean= false;
  // variable para mostrar modal de modificar estado pedido
  visible: boolean = false;
  // almacena el pedido seleccionado para guardar sus valores provicionalmente ( cuandos se hacer modificaciones )
  pedidoSelect:any;;
  // array de clientes 
  clients: any[] = [];
  // array de pediidos 
  pedidosData:any[] = [];
  // copia de array de pedidos para funcionaldiades
  pedidosCopia:any[] = [];
  // array de productos
  productos:any[] = [];
  // array para productos filtrados en el input
  productosFiltered:any[]= [];
  // array para guardar productos seleccioandos
  productoSeleccionados:any[] = [];
  // array de clientes filtrados
  filteredClients:any[]= [];
  // variable para guardar el total de la venta
  totalVenta:number = 0;
  // variable para modal
  ref: DynamicDialogRef | undefined;
  // viewchil de selector de estado
  @ViewChild('estadoSelect') estadoSelect!: ElementRef;
  // viewchild de input de busqueda
  @ViewChild('inputProduct') inputProduct!: ElementRef;


  // METODO INICIALIZADO AL CARGAR EL COMPONENTE
  ngOnInit(): void {
    // obtengo clientes
    this.getClientes();
    // obtengo productos
    this.getProductos();
    // inicializo la variable fecha con la fecha de hoy
    this.fechaPedido = this.formatDate(new Date());
    // OBTENGO PEDIDO CON LA FECHA DE HOY
    this.getPedidosByDate(this.fechaPedido);
  }

  // METODO UTILIZADO AL DESTRUIR EL COMPOENTE
  ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
  };

  constructor(private fb: FormBuilder, private clienteService:ClientesService, private productoService:ProductosService, private pedidoService:PedidosService,
    public dialogService: DialogService, public messageService: MessageService
  ){
    this.pediosForm= this.fb.group({
      idCliente:[0],
      cliente:['', Validators.required],
      direccion:['', Validators.required],
      telefono:['', Validators.required],
      estado:[1],
      observaciones:[''],
      productos:[null]
    })
  };

  //? -------- FUNCIONALIDADES GENERALES BASICAS


    // mostrar modal de detalle de pedido
    show(pedido: any) {
      this.ref = this.dialogService.open(ProductListDemoComponent, {
          header: 'Detalles del Pedido',
          width: '70%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true,
          data: {
              detallesPedido: pedido.detalles // Pasas los detalles del pedido
          }
      });

      this.ref.onClose.subscribe((pedidoCerrado: any) => {
          if (pedidoCerrado) {
              this.messageService.add({
                  severity: 'info',
                  summary: 'Pedido cerrado',
                  detail: `Pedido ID: ${pedidoCerrado.idPedido}`
              });
              
          }
          this.pedidoSelect=null;
      });

      this.ref.onMaximize.subscribe((value) => {
          this.messageService.add({
              severity: 'info',
              summary: 'Maximizado',
              detail: `maximizado: ${value.maximized}`
          });
      });
    }

    //formatear fecha
    private formatDate(date:Date){
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Agrega un 0 si es necesario
      const day = String(date.getDate()).padStart(2, '0'); // Agrega un 0 si es necesario

      return `${year}-${month}-${day}`;
    };

     // limpiar filtros
    public resetearFiltro(){
      let fechaActual = this.formatDate(new Date());
      this.fechaPedido = fechaActual;
      this.getPedidosByDate(fechaActual);
      this.estadoSelect.nativeElement.value = '';
      this.showRangeDateFilter = false;
      this.fechaDesde = new Date();
      this.fechaHasta = new Date();
    }

    // filtrar cliente en la busqueda de pedido
    onClientInput(parameterBusqueda:number) {
      const input = this.pediosForm.get('cliente')?.value.toLowerCase();
      this.filteredClients = this.clients.filter(client =>
        client.nombre.toLowerCase().includes(input)
      );
    }

    // filtro de clientes en lista de pedidos
    public onClientFilterInput(parameterBusqueda:number, event:any){
      // obtento el valor de la busqueda
      let input = event.target.value.toLowerCase();
      let pedidosCopia  = this.pedidosData;
      this.pedidosData = this.pedidosCopia.filter(pedido => pedido.nombre.toLowerCase().includes(input));
      if(input == ""){
        this.pedidosData = this.pedidosCopia;
      }
    }

    // setear valores al formulario de cliente seleccionado
    selectClient(client:any) {
      this.pediosForm.get('idCliente')?.setValue(client.id);
      this.pediosForm.get('cliente')?.setValue(client.nombre);
      this.pediosForm.get('direccion')?.setValue(client.direccion);
      this.pediosForm.get('telefono')?.setValue(client.telefono);
      this.filteredClients = [];
    }

    // MOSTRAR MODAL DE MODIFICAR
    public showUpdateStatus(pedido:any){
      this.visible=true;
      this.pediosForm.patchValue({estado: pedido.idEstado});
      // this.pediosForm.patchValue(pedido);
      this.pedidoSelect = pedido;
      
    }

    // ver detalle de pedido
    public verDetalle(pedido:any){
      this.pedidoSelect = pedido;
      this.show(pedido)
    }

    // OCULTAR MODAL DE MODIFICAR / CREAR
    cancelar(){
      this.pedidoSelect=null;
      this.visible=false;
      this.pediosForm.reset();
      this.productoSeleccionados=[];
    }

    // CANCELAR REGISTRO DE PEDIDO
    cancelarRegistro(){
      this.pedidoSelect=null;
      this.visible=false;
      this.pediosForm.reset();
      this.productoSeleccionados=[];
      this.totalVenta = 0;
    }
  
  //? --------- FUNCIONALIDADES PARA EL REGISTRO DE PEDIDO
    // definir unidades del producto
    public agregarUnidades(event:any, producto:any){
      const valor = event.target.value;
      producto.cantidadUnidades = valor;
    }

    // para caluclar el total del pedido
    public calcularTotal(){
      this.totalVenta = this.productoSeleccionados.reduce((acc, producto) => {
        const cantidad = producto.cantidadUnidades || 0;
        return acc + (producto.precio * cantidad);
      }, 0);
    }

    // agregar productos al pedido
    public filterProd(event:any){
      let text = event.target.value.toLowerCase();
      this.productosFiltered = this.productos.filter(producto =>
        producto.nombre.toLowerCase().includes(text)
      );  
      if(text == ""){
        this.productosFiltered=[];
      }
    }

    // agregar producto a la lista
    public addProduct(producto:any){
      console.log("producto", producto);
      if(this.productoSeleccionados.some(detail=> detail.id == producto.id)){
        producto.cantidadUnidades +=1;
      }else{
        producto.cantidadUnidades = 1;
        this.productoSeleccionados.push(producto);
      };
      this.calcularTotal();
    }
  
  //? ------- OBTENER DATOS DE LOS FILTROS
    // obtiene pedidos por fecha
    public filterDate(event:any){
      let fecha = event.target.value;
      this.pedidoService.getPedidosParams(fecha, null, null, null, null).subscribe({
        next: (res) => {
          this.pedidosData = res;
          this.pedidosCopia = res;
        },
        error: (err) => {
          this.pedidosCopia = [];
          this.pedidosData = [];
          Swal.fire("Error", err.error.message, "error");
        } 
      })
    };
    
    // obtiene pedidos por estado y fecha seleccionada
    public filterEstado(event:any){
      let estado = event.target.value;
      let fecha = this.fechaPedido;
      console.log("estado", estado);  
      if(estado !== '0'){
        this.showRangeDateFilter = false;
        this.pedidoService.getPedidosParams(fecha, estado, null, null, null).subscribe({
          next: (res) => {
            this.pedidosData = res;
            this.pedidosCopia = res;
          },
          error: (err) => {
            console.log(err);
            this.pedidosCopia = [];
            this.pedidosData = [];
            Swal.fire("Error", err.error.message, "error");
          }
        })
      }else{ // puede obtener todos los pedidos y con una fecha desde y hasta
        console.log("entro aca")
        this.showRangeDateFilter = true;
        
      }
    }

    public filterByRangeDate(){
      if(this.fechaDesde && this.fechaHasta && this.fechaDesde <= this.fechaHasta){
          let fechaDesde = this.fechaDesde;
          let fechaHasta = this.fechaHasta;
          this.pedidoService.getPedidosParams(null, null,null, fechaDesde, fechaHasta).subscribe({
            next: (res) => {
              this.pedidosData = res;
              this.pedidosCopia = res;
            },
            error: (err) => {
              console.log(err);
              this.pedidosCopia = [];
              this.pedidosData = [];
              Swal.fire("Error", err.error.message, "error");
            }
          })
        }else{
          Swal.fire("Error", "La fecha desde no puede ser mayor a la fecha hasta", "error");
        }
    }

  //? -------- METODOS PARA OBTENER DATOS
    // OBTENER TODOS LOS CLINTES
    public getClientes(){
      this.clienteService.getClientesActivos().subscribe({
        next: (res) => {
          this.clients = res;
        },
        error: (err) => {
          console.log(err);
        }
      });
    };

    // OBTENER TODOS LOS PRODUCTOS ACTIVOS
    public getProductos(){
      this.productoService.getProductosActivos().subscribe({
        next: (res) => {
          // console.log("response", res);
          this.productos = res;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

    // OBTENER PEDIDOS POR FECHA
    public getPedidosByDate(date:any){
      this.pedidoService.getPedidosParams(date, null, null, null, null).subscribe({
        next: (res) => {
          // console.log("SE LLAMO ACA", res);
          this.pedidosData = res;
          this.pedidosCopia = res;
        },
        error: (err) => {
          console.log("Error al obtener pedido por fecha",err.error.message);
          this.pedidosCopia = [];
          this.pedidosData = [];                                                                                                    
          Swal.fire({
            title:"Error al obtener pedidos",
            text: err.error.message,
            icon: "error",
            timer:1000,
            showConfirmButton:true,
            confirmButtonText:"Aceptar"
          });
        }
      });
    } 

  //? ------- METODOS DE REGISTRO Y ACTUALIZACION
    // REGISTRAR NUEVO PEDIDO
    public registerPedidos(){
      if(this.pediosForm.value.idCliente){
        let pedido = {
          idCliente: this.pediosForm.value.idCliente,
          idUsuario:1,
          totalPedido: this.totalVenta,
          fechaRegistro: this.formatDate(new Date()),
          direccion: this.pediosForm.value.direccion,
          telefono: this.pediosForm.value.telefono,
          estado: this.pediosForm.value.estado,
          observaciones: this.pediosForm.value.observaciones,
          detalles: this.productoSeleccionados
        };
        // registro el pedido
        this.pedidoService.createPedido(pedido).subscribe({
          next: (res) => {
            if(res.status){ // si ele pedido es reseteado limpio todos los filtros
              
              Swal.fire({
                title: "Exito", 
                text: res.message,
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
              this.pediosForm.reset();
              this.pediosForm.patchValue({estado: 1});
              this.productoSeleccionados = [];
              this.formatDate(new Date());
              this.inputProduct.nativeElement.value = '';
              this.productosFiltered = [];
            }
            this.getPedidosByDate(this.fechaPedido);
          },
          error: (err) => {
            console.log("Error al crear pedido", err);
          }
        });    
      }else{
        Swal.fire("Atencion", "Debe seleccionar un cliente para poder registrar el pedido", "error");
      }
    };

    // MODIFICAR ESTADO DE PEDIDO (RECIBIDO, ENTREGADO, CANCELADO)
    public updateStatus(){
      let idPedido = this.pedidoSelect.idPedido;
        let pedido = {
          idCliente:this.pedidoSelect.idCliente,
          idUsuario:1,
          totalPedido:this.pedidoSelect.totalPedido,
          estado: Number(this.pediosForm.value.estado),
          observaciones: this.pediosForm.value.obeservaciones,
          detalles:[]
        };

        this.pedidoService.updatePedido(idPedido, pedido).subscribe({
          next: (res) => {
            if(res.status){
              Swal.fire("Exito", res.message, "success");
            }else{
              Swal.fire("Error", res.message, "error");
            }
            this.cancelar();
            this.getPedidosByDate(this.fechaPedido);
          },
          error: (err) => {
            console.error("Error al crear pedido", err);
          }
        });
    }

    //  MODIFICAR PEDIDO SELECCIONADO (INFORMACION)
    public updatePedido(pedido:any){
      this.pedidoSelect = pedido;

        this.pediosForm.patchValue({
          idCliente: pedido.idCliente,
          cliente: pedido.nombre,
          direccion: pedido.direccion,
          telefono: pedido.telefono,
          estado: pedido.idEstado,
          observaciones: pedido.observaciones,
          productos: pedido.detalles
        });
        // modifico los nombres de las propiedades del los valroes del detalle del pedido
        const pedidoModificado = pedido.detalles.map((detalle:any) => {
          return {
            idDetalle: detalle.idDetalle,
            idProducto: detalle.idProducto,
            nombre: detalle.nombreProd,
            precio: detalle.precioUnitario,
            cantidadUnidades: detalle.unidadesPedidas
          };
        });
        this.productoSeleccionados = pedidoModificado;

    };

  // MODIFICAR INFORMACION DEL PEDIDO SELECCIONADO
  public updateInfoPedido(){

    Swal.fire({
      title:"Actualizacion de pedido",
      text: "¿Desea actualizar el pedido?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar"
    }).then((res:any)=>{
      if(res.isConfirmed){
        const productosPedidos = this.productoSeleccionados.map((producto:any) => {
          return {
            idDetalle: producto.idDetalle || 0,
            idProducto: producto.idProducto || producto.id,
            nombreProd: producto.nombre,
            precioUnitario: producto.precio,
            unidadesPedidas: producto.cantidadUnidades
          };
        });

        let idPedido = this.pedidoSelect.idPedido;
        let pedido = {
          idCliente:this.pedidoSelect.idCliente,
          idUsuario:1,
          totalPedido:this.pedidoSelect.totalPedido,
          estado: Number(this.pediosForm.value.estado),
          observaciones: this.pediosForm.value.observaciones,
          detalles:productosPedidos
        };

        this.pedidoService.updatePedido(idPedido, pedido).subscribe({
          next: (res) => {
            if(res.status){
              Swal.fire({
                title: "Exito", 
                text: res.message,
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
              this.pediosForm.reset();
              this.pediosForm.patchValue({estado: 1});
              this.productoSeleccionados = [];
              this.formatDate(new Date());
              this.inputProduct.nativeElement.value = '';
              this.productosFiltered = [];
              this.getPedidosByDate(this.fechaPedido);
              this.pedidoSelect=null;
            };
          },
          error: (err) => {
            console.error("Error al crear pedido", err);
          }
        });
      }
    });
  };

  //? ------- METODO DE ELIMINACION
    // ELIMINAR ITEM DE UN PEDIDO 
    public deleteItemPedido(producto:any){
      if(this.pedidoSelect){
        // mando al backend para eliminar el item del pedido ya registrado
        this.pedidoService.deleteItemPedido(this.pedidoSelect.idPedido, producto).subscribe({
          next:(res:any)=>{
            console.log("respuesta al eliminar",res)
            if(res.status){
              Swal.fire({
              title: "Exito",
              text: res.message,
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });
            }else{
              Swal.fire({
              title: "Atencion",
              text: res.message,
              icon: "info",
              timer: 1000,
              showConfirmButton: false,
            });
            }
            
          },
          error:(err:any)=>{
            console.error("error al eliminar", err);
          }
        });
        // elimino el item de la tabla y del pedido sin volver a llamar al backend
        this.productoSeleccionados = this.productoSeleccionados.filter((item:any) => item.idDetalle !== producto.idDetalle);
      }else{
        // elimino item de un pedido que todavia no fue registrado
        this.productoSeleccionados = this.productoSeleccionados.filter((item:any) => item.id !== producto.id);
      }
    }



}

export enum endpoints  {

    // auth
    login = 'usuario/login',
    logout = 'usuario/logout',
    registerUser = 'usuario/',
    allUsers = 'usuario/',
    userById = 'usuario/:id',
    updateUser = 'usuario/:id',
    updatePasswordUser = 'usuario/password/:id',

    //roles
    allRoles = 'roles/',

    // permisos
    permisos = 'permisos/:id',
    createPermisos = 'permisos/',
    updatePermiso = 'permisos/',
    modulos = 'permisos/user/:id',

    // clientes
    allClientes = 'clientes/',
    clientesActivos = 'clientes/activos',
    clienteById = 'clientes/:id',
    clientByType = 'clientes/tipo/:tipo',
    createCliente = 'clientes/',
    updateCliente = 'clientes/:id',
    updateStatusClient = 'clientes/estado/:id',


    // producto
    allProductos = 'producto/allProduct',
    productosActivos = 'producto/activo',
    productById= 'producto/id/:id',
    productByCodigo = 'producto/codigo/:codigo',
    createProduct = 'producto/registrar',
    updateProduct = 'producto/actualizar/:id',
    eliminarProduct = 'producto/:id',

    productosListaPrecios = 'producto/lista-precios',
    addProductListaPrecio = 'producto/lista-precios',
    updateProductListaPrecio = 'producto/lista-precios/:idDetalle',
    deleteProductListaPrecio = 'producto/lista-precios/:idDetalle',

    //ventas
    obtenerVentas = 'venta/',
    ventaXidCliente = 'venta/:id',
    ventaXidUsuario = 'venta/usuario/:id',
    ventaXfecha = 'venta/fecha/:fecha',
    ventaXRangoFecha = 'venta/rango-fecha/:fechaInicio/:fechaFin',
    registrarVenta = 'venta/',
    modificarVenta = 'venta/:id',

    // barrio
    allBarrios = 'barrios/',

    // pedidos
    allPedidos = 'pedidos',
    registrarPedido = 'pedidos/',
    editarPedido = 'pedidos/:id',
    deleteItemPedido = 'pedidos/eliminar/:id',

    metodosPago = 'utilidades/metodos-pago',



  }
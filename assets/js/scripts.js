const productos = [
  { id: 1, nombre: 'Converse Botitas', precio: 10.555, imagen: './assets/img/conversebotitas.jpg' },
  { id: 2, nombre: 'Nike Pipa Negra', precio: 15.399, imagen: './assets/img/nikepipanegra.jpg' },
  { id: 3, nombre: 'Air Force', precio: 20.355, imagen: './assets/img/air force.jpg' },
  { id: 4, nombre: 'Botitas ', precio: 11.599, imagen: './assets/img/conversebotitas.jpg '},
  { id: 5, nombre: 'Nike skt8 Blancas', precio: 40.999, imagen: './assets/img/zapasblacasnike.jpg' },
  { id: 6, nombre: 'Clasicas Negras', precio: 17.259, imagen: './assets/img/converseclasicasnegras.jpg' },
  { id: 7, nombre: ' Vans Clasica', precio: 7.199, imagen: './assets/img/zapasvan.jpg' },
  { id: 8, nombre: 'Botas Vans', precio: 9.999, imagen: './assets/img/botasvansk8.jpg' },
  
];


let carrito = [];


const generarProductosHTML = () => {
  const productosContainer = document.getElementById('productos-container');

  const productosHTML = productos.map(producto => `
    <div class="col-md-3 cardd">
      <div class="card">
        <img src="${producto.imagen}" class="card-img-top lolo" alt="${producto.nombre}">
        <div class="card-body text-center">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text"> $${producto.precio}</p>
          <button class="btn-custom" onclick="agregarAlCarrito (${producto.id})">Agregar al carrito</button>
        </div>
      </div>
    </div>
  `).join('');

  productosContainer.innerHTML = productosHTML;
};


const obtenerIndiceProducto = (productoId) => {
  return carrito.findIndex(item => item.producto.id === productoId);
};

const agregarAlCarrito = (productoId) => {
  const producto = productos.find(p => p.id === productoId);
  if (producto) {
    const indice = obtenerIndiceProducto(productoId);
    if (indice !== -1) {
      
      carrito[indice].cantidad++;
    } else {
      
      carrito.push({ producto, cantidad: 1 });
    }
    actualizarCarrito();
  }
};

const eliminarDelCarrito = (productoId) => {
  const indice = obtenerIndiceProducto(productoId);
  if (indice !== -1) {
   
    if (carrito[indice].cantidad > 1) {
      carrito[indice].cantidad--;
    } else {
      carrito.splice(indice, 1);
    }
    actualizarCarrito();
  }
};


const calcularTotalCompra = () => {
  const total = carrito.reduce((acumulador, item) => acumulador + (item.producto.precio * item.cantidad), 0);
  return total;
};


const mostrarCarrito = () => {
  const carritoContainer = document.getElementById('carrito-container-modal');
  if (carritoContainer) {
    const carritoHTML = carrito.map(item => `
      <div class="card mb-2">
        <div class="card-body">
          <h5 class="card-title">${item.producto.nombre}</h5>
          <p class="card-text">Precio: $${item.producto.precio} x ${item.cantidad}</p>
          <button class="btn btn-danger" onclick="eliminarDelCarrito(${item.producto.id})">Eliminar</button>
        </div>
      </div>
    `).join('');

    carritoContainer.innerHTML = carritoHTML;
  }

  const totalCompraElemento = document.getElementById('total-compra-modal');
  if (totalCompraElemento) {
    const totalCompra = calcularTotalCompra();
    totalCompraElemento.textContent = `Total de la compra: $${totalCompra}`;
  }
};

const actualizarCarrito = () => {
  mostrarCarrito();
};


generarProductosHTML();


const buscarProductos = (event) => {
  event.preventDefault();
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.toLowerCase();

  const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(searchTerm));
  const productosContainer = document.getElementById('productos-container');

  const productosHTML = productosFiltrados.map(producto => `
    <div class="col-md-3">
      <div class="card">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">Precio: $${producto.precio}</p>
          <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        </div>
      </div>
    </div>
  `).join('');

  productosContainer.innerHTML = productosHTML;
};


const searchForm = document.getElementById('searchForm');
if (searchForm) {
  searchForm.addEventListener('submit', buscarProductos);
}







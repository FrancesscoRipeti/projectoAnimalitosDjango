const carrito = document.getElementById('contenido-carrito-des');
const elementos1 = document.getElementById('lista1');
const lista = document.querySelector('#lista-del-carrito tbody');
const vaciarCarrito = document.querySelector('.vaciar-carro');
const pagarCarrito = document.querySelector('.pagar'); // Nueva variable para el botón de pagar
const resumenCarrito = document.getElementById('resumen-carrito').querySelector('tbody');
const resumenTotalPrecio = document.getElementById('resumen-total-precio');

// Cargar los event listeners
document.addEventListener('DOMContentLoaded', cargarEventListener);

function cargarEventListener() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarrito.addEventListener('click', vaciarCarritoTotal);
    pagarCarrito.addEventListener('click', mostrarResumenCarrito);
    // Cargar carrito desde localStorage
    cargarCarritoLocalStorage();
}

// Función para añadir elemento al carrito
function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

// Función para leer los datos del elemento seleccionado
function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    insertarCarrito(infoElemento);
}

// Función para insertar el elemento en el carrito
function insertarCarrito(elemento) {
    // Verificar si el producto ya está en el carrito
    const existente = document.querySelector(`#lista-del-carrito tbody tr[data-id="${elemento.id}"]`);
    if (existente) {
        // El producto ya está en el carrito, incrementar la cantidad
        const cantidad = existente.querySelector('.cantidad');
        cantidad.textContent = parseInt(cantidad.textContent) + 1;
    } else {
        // El producto no está en el carrito, agregar una nueva fila
        const row = document.createElement('tr');
        row.setAttribute('data-id', elemento.id); // Agregar el ID del producto a la fila
        row.innerHTML = `
            <td><img src="${elemento.imagen}" width="100" height="150px"></td>
            <td>${elemento.titulo}</td>
            <td class="cantidad">1</td>
            <td>${elemento.precio}</td>
            <td><a href="#" class="borrar-elemento" data-id="${elemento.id}">X</a></td>
        `;
        lista.appendChild(row);
    }
    totalCarrito(); // Llamar a la función totalCarrito para actualizar el total
    guardarCarritoLocalStorage(); // Guardar carrito en localStorage
}

// Función para eliminar un elemento del carrito
function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-elemento')) {
        const row = e.target.parentElement.parentElement;
        const cantidad = row.querySelector('.cantidad');
        if (parseInt(cantidad.textContent) > 1) {
            // Si hay más de uno del producto, disminuir la cantidad
            cantidad.textContent = parseInt(cantidad.textContent) - 1;
        } else {
            // Si solo hay uno del producto, eliminar la fila
            row.remove();
        }
        totalCarrito(); // Llamar a la función totalCarrito para actualizar el total
        guardarCarritoLocalStorage(); // Guardar carrito en localStorage
    }
}

// Función para vaciar todo el carrito
function vaciarCarritoTotal() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    totalCarrito(); // Llamar a la función totalCarrito para actualizar el total
    guardarCarritoLocalStorage(); // Guardar carrito en localStorage
    return false;
}

// Función para calcular el total del carrito
function totalCarrito() {
    let total = 0;
    const items = document.querySelectorAll('#lista-del-carrito tbody tr');
    items.forEach(item => {
        const precio = parseFloat(item.children[3].textContent.replace('$', ''));
        const cantidad = parseInt(item.children[2].textContent);
        total += precio * cantidad;
    });
    document.getElementById('total-precio').textContent = '$' + total.toFixed(2);
}

// Función para mostrar el resumen del carrito
function mostrarResumenCarrito(e) {
    e.preventDefault();
    // Limpiar el contenido del resumen
    resumenCarrito.innerHTML = '';
    // Obtener los elementos del carrito
    const items = document.querySelectorAll('#lista-del-carrito tbody tr');
    items.forEach(item => {
        const row = document.createElement('tr');
        const titulo = item.children[1].textContent;
        const cantidad = item.children[2].textContent;
        const precio = item.children[3].textContent;
        row.innerHTML = `
            <td>${titulo}</td>
            <td>${cantidad}</td>
            <td>${precio}</td>
        `;
        resumenCarrito.appendChild(row);
    });
    // Mostrar el total
    const total = document.getElementById('total-precio').textContent;
    resumenTotalPrecio.textContent = total;
    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('modalResumenCarrito'));
    modal.show();
}

// Funciones para manejar el almacenamiento local
function guardarCarritoLocalStorage() {
    const items = document.querySelectorAll('#lista-del-carrito tbody tr');
    const carrito = [];
    items.forEach(item => {
        const producto = {
            id: item.getAttribute('data-id'),
            imagen: item.querySelector('img').src,
            titulo: item.children[1].textContent,
            cantidad: item.children[2].textContent,
            precio: item.children[3].textContent
        };
        carrito.push(producto);
    });
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoLocalStorage() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-id',        row.innerHTML = `
            <td><img src="${item.imagen}" width="100" height="150px"></td>
            <td>${item.titulo}</td>
            <td class="cantidad">${item.cantidad}</td>
            <td>${item.precio}</td>
            <td><a href="#" class="borrar-elemento" data-id="${item.id}">X</a></td>
        `);
        lista.appendChild(row);
    });
    totalCarrito(); // Actualizar el total del carrito al cargar desde localStorage
}

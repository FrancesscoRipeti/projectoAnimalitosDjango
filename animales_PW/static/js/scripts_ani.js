

// Variables del carrito y elementos de la tienda
const carrito = document.getElementById('contenido-carrito-des');
const elementos1 = document.getElementById('lista1');
const lista = document.querySelector('#lista-del-carrito tbody');
const vaciarCarrito = document.querySelector('.vaciar-carro');

// Cargar los event listeners
cargarEventListener();

function cargarEventListener() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarrito.addEventListener('click', vaciarCarritoTotal);
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
        id: elemento.querySelector('a').getAttribute('data-id')
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
            <td>
                <img src="${elemento.imagen}" width=100 height=150px >
            </td>
            <td>
                ${elemento.titulo}
            </td>
            <td class="cantidad">
                1
            </td>
            <td>
                ${elemento.precio}
            </td>
            <td>
                <a href="#" class="borrar-elemento" data-id="${elemento.id}">X</a>
            </td>
        `;
        lista.appendChild(row);
    }
    totalCarrito(); // Llamar a la función totalCarrito para actualizar el total
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
    }
}

// Función para vaciar todo el carrito
function vaciarCarritoTotal() {
    const items = document.querySelectorAll('#lista-del-carrito tbody tr');
    items.forEach(item => {
        item.remove();
    });
    totalCarrito(); // Llamar a la función totalCarrito para actualizar el total
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


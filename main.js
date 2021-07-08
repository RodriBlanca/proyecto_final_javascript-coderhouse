// Carrito de compras

// La idea es tener elementos en la página web que al hacerles click se agreguen al carrito de comprar.
// Cada producto va a tener un botón para poder agregarse al carrito.
/* 
    En el carrito de compras un botón para eliminar todos los productos y otro para eliminar uno en particular. 
    Además que muestre el nombre del producto, el precio y una descripción del producto.
    Debajo que se muestre el total con la suma del precio de todos los productos. 
*/

// Objeto
// Clase de productos
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = parseInt(precio);
    }
}

// Función para crear los productos
const crearPorducto = () => {
    const nombre = prompt('Ingrese el nombre del producto');
    const precio = parseInt(prompt('Ingrese el precio del producto'));
    return new Producto(nombre, precio);
}

// Variable del carrito de compras donde se van a ir apregando los productos en el array
let carrito = [];

// Función para agregar los productos al carrito de compras
const agregarProductos = producto => carrito.push(producto);

const producto1 = crearPorducto();
const producto2 = crearPorducto();
const producto3 = crearPorducto();
agregarProductos(producto1);
agregarProductos(producto2);
agregarProductos(producto3);
console.log(carrito);

// Función para saber el total a pagar
const totalAPagar = (arr) => {
    let total = 0;
    arr.forEach(producto => {
        total = total + producto.precio; 
        return total;
    });
    return `El total a pagar es ${total}`;
}

console.log(totalAPagar(carrito));
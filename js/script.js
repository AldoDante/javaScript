

const productos = [{
        id: 1,
        nombre: 'Pizza',
        img: 'https://i.pinimg.com/236x/f0/3d/a8/f03da8d9c04d4c34b7055e23e48f9364.jpg',
        precio: 500
    },
    {
        id: 2,
        nombre: 'Hamburguesa',
        img: 'https://conelmorrofino.com/wp-content/uploads/2015/11/Anauco-Hamburguesas-Gourmet-Hamburguesa-Goya-200x300.jpg',
        precio: 600
    },
    {
        id: 3,
        nombre: 'Lomito',
        img: 'https://cdn.shopify.com/s/files/1/0540/4114/9614/products/roll-2760504_1920_300x300.jpg?v=1625020693',
        precio: 500
    },
    {
        id: 4,
        nombre: 'Papas Fritas',
        img: 'https://image.shutterstock.com/image-photo/falling-french-fries-potato-fry-260nw-1556718356.jpg',
        precio: 400
    }
]

let divDOM = document.getElementById('catalogo')


const listaProductos = (array) =>{
    for (const elemento of array) {
        let div = document.createElement('div');
        div.className = ('card');
        div.innerHTML = `
        <h2> ${elemento.nombre}</h2>
        <img src="${elemento.img}">
        <h3> $ ${elemento.precio}</h3>
        <button id= ${elemento.id}>Comprar</button>
        `
        divDOM.append(div)
    }
}

listaProductos(productos)


let menu = '';
menu += 'Menu\n';
menu += '1 - selecciona un producto\n';
menu += '2 - mostrar carrito\n';
menu += '3 - Total\n';
menu += '0 - salir\n';

const porcentaje = 10
const carrito = []

const agregarProducto = () => {
    let list = 'Selecciona tu Opcion \n'
    for (const item of productos) {
        list += item.id + '--' + item.nombre + ' $'+ item.precio + '\n';
    }
    let prodSeleccionado = parseInt(prompt(list));
    for (const elemento of productos) {
        if (elemento.id == prodSeleccionado) {
            carrito.push(elemento)
            alert("Producto Argregado")
            return
        }
    }
    alert('Producto inexistente');
    return
}

const mostrarCarrito = () => {
    let list = 'Contenido \n'
    let index = 1;
    for (const item of carrito) {
        list += index++ + ' - ' + item.nombre + ' $' + item.precio + '\n';
    }
    alert(list)
}

const total = () => {
    let compra = carrito.reduce((acumulador, elemento) => acumulador + elemento.precio, 0)
    
    if (compra < 1000) {
        alert('El total de la compra sin descuento es de $ ' + compra)

    } else {
        function descuento(compra, porcentaje) {
            compra = compra - (compra * porcentaje / 100);
            alert("El total de la compra con DESCUENTO es de $ " + compra);
        }
        descuento(compra, porcentaje);
    }
    
}
let opcion = parseInt(prompt("Ingrese 1 para comenzar o CERO para SALIR"));

while (opcion != 0) {
    let seleccion = parseInt(prompt(menu));
    switch (seleccion) {

        case 0:
            alert('Gracias vuelva Pronto!')
            break

        case 1:
            agregarProducto();
            break;

        case 2:
            mostrarCarrito();
            break;

        case 3:
            total();
            break;

        default:
            alert('Ingresar una opcion Valida')
            break;
    }
    if (seleccion == 0) {
        break
    }
}

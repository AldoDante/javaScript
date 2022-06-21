window.onload = getData();

const productos = [{
        id: 1,
        nombre: 'Pizza',
        img: 'https://i.pinimg.com/236x/f0/3d/a8/f03da8d9c04d4c34b7055e23e48f9364.jpg',
        precio: 500,
        cantidad: 1
    },
    {
        id: 2,
        nombre: 'Hamburguesa',
        img: 'https://conelmorrofino.com/wp-content/uploads/2015/11/Anauco-Hamburguesas-Gourmet-Hamburguesa-Goya-200x300.jpg',
        precio: 600,
        cantidad: 1
    },
    {
        id: 3,
        nombre: 'Lomito',
        img: 'https://cdn.shopify.com/s/files/1/0540/4114/9614/products/roll-2760504_1920_300x300.jpg?v=1625020693',
        precio: 500,
        cantidad: 1
    },
    {
        id: 4,
        nombre: 'Papas Fritas',
        img: 'https://image.shutterstock.com/image-photo/falling-french-fries-potato-fry-260nw-1556718356.jpg',
        precio: 400,
        cantidad: 1
    }
]

let divDOM = document.getElementById('catalogo')
let divCarro = document.getElementById('carro')
let borrarTodo = document.getElementById('vaciar')
let contador = document.getElementById('cantidad')
let total = document.getElementById('total')
let vacio = document.getElementById('vacio')
const porcentaje = 10

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        listaCarrito()
    }
})

async function getData() {
    const response = await fetch('./js/datos.json');
    const data = await response.json();
    /* console.log(getData) */
    listaProductos(data);
}

const listaProductos = (array) => {
    for (const elemento of array) {
        let div = document.createElement('div');
        div.className = ('card');
        div.innerHTML = `
        <h2> ${elemento.nombre}</h2>
        <h3> Codigo del articulo ${elemento.id}</h3>
        <img src="${elemento.img}">
        <h3> $ ${elemento.precio}</h3>
        <button id= "${elemento.id}">Comprar</button>
        `
        divDOM.append(div)

        const boton = document.getElementById(`${elemento.id}`)

        boton.addEventListener('click', () => {
            comprar(elemento.id)



        })
    }

}



const comprar = (elementoId) => {
    const item = productos.find((elemen) => elemen.id === elementoId)
    carrito.push(item)
    Toastify({
        text: "Producto Agregado",
    }).showToast();

    listaCarrito()
    /* console.log(carrito) */
}

const eliminarProd = (elementoId) => {
    const item = carrito.find((elemen) => elemen.id === elementoId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    Toastify({
        text: "Producto Eliminado",
    }).showToast();

    listaCarrito()

}
const listaCarrito = () => {
    divCarro.innerHTML = ""
    carrito.forEach((elemen) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${elemen.nombre}</p>
        <p>Precio:$${elemen.precio}</p>
        <p>Cantidad: <span id="cantidad">${elemen.cantidad}</span></p>
        <button onclick = "eliminarProd (${elemen.id})">Eliminar</button>
        `

        divCarro.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    contador.innerText = carrito.length
    total.innerText = carrito.reduce((acumulador, elemen) => acumulador + elemen.precio, 0)

    let total1 = carrito.reduce((acumulador, elemen) => acumulador + elemen.precio, 0)

    carrito.length === 0 && localStorage.removeItem('carrito')
    carrito.length === 0 && Swal.fire('Carrito Vacio')

    total1 > 1000 ? vacio.textContent = 'Tenes una devolucion del 10% en tu resumen de Tarj. Cred.' : vacio.textContent = ''

    let copiaDeCarrito = [...carrito]
    console.log(copiaDeCarrito)
}

borrarTodo.addEventListener('click', () => {
    Swal.fire({
        title: 'Vaciar Carrito?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',

    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0
            localStorage.removeItem('carrito')
            listaCarrito()
            Swal.fire('Carrito Vacio')
        } else Swal.fire('A seguir comprando!')
    })

})

/* let [a, , , d] = productos
console.log("El primero producto del catalogo es: " + a.nombre)
console.log("El cuarto producto del catalogo es: " + d.nombre) */


/* const form = document.getElementById('formu')
let borrar = document.getElementById('erase')
let divformu = document.getElementById('formulario')
 */


/* const enviar = (e) => {
    e.preventDefault();
    let nombre = document.getElementById('nombre').value
    let mail = document.getElementById('mail').value
    let expLab = document.getElementById('expLab').value

    const usuario = {
        'nombre': nombre,
        'Email': mail,
        'Experiencia': expLab,

    }

    let div = document.createElement('div');

    div.innerHTML = `
    <h3>Confirma tus Datos</h3>
    <h3>Nombre: ${e.target.name.value}</h3>
    <h3>E-mail: ${e.target.email.value}</h3>
    <h3>Experiencia Laboral: ${e.target.text.value}</h3>
    `
    divformu.append(div)
    sessionStorage.setItem('temporal', JSON.stringify(usuario));
    
}


const formulario = addEventListener('submit', enviar)

function borrarDatos() {
    sessionStorage.removeItem('temporal')
}

borrar.addEventListener('click', borrarDatos)
 */
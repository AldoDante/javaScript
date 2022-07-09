window.onload = getData();

const productos = [{
        id: 1,
        nombre: 'Pizza Cooper.',
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
        nombre: 'Lomito Sandw',
        img: 'https://cdn.shopify.com/s/files/1/0540/4114/9614/products/roll-2760504_1920_300x300.jpg?v=1625020693',
        precio: 500,
        cantidad: 1
    },
    {
        id: 4,
        nombre: 'Porcion Fritas',
        img: 'https://image.shutterstock.com/image-photo/falling-french-fries-potato-fry-260nw-1556718356.jpg',
        precio: 400,
        cantidad: 1
    }
]

let divDOM = document.getElementById('catalogo')
let divCarro = document.getElementById('carrito-contenedor')
let borrarTodo = document.getElementById('vaciar')
let contador = document.getElementById('cantidad')
let total = document.getElementById('total')
let vacio = document.getElementById('vacio')
let compra = document.getElementById('comprar')
let formulario = document.getElementById('formulario')
let resumenCompra = document.getElementById('resumen');
let finalizar = document.getElementById('confirmar')


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
   
    listaProductos(data);

}

const listaProductos = (array) => {
    for (const elemento of array) {
        let div = document.createElement('div');
        div.className = 'card';
        div.style = 'width: 15rem'
        div.innerHTML = `
        <div class="card-body">
        <h5 class="card-title"> ${elemento.nombre}</h5>
        <img src="${elemento.img}" class="w-50" alt="...">
        <p class="card-text"> $ ${elemento.precio}</p>
        <button id= "${elemento.id}" class="btn btn-primary">Comprar</button>
        `
        divDOM.append(div)

        const boton = document.getElementById(`${elemento.id}`)

        boton.addEventListener('click', () => {
            comprar(elemento.id)
        })
    }

}


const comprar = (elementoId) => {
    const existe = carrito.some(elemen => elemen.id === elementoId)
    if (existe) {
        const item = carrito.map(elemen => {
            if (elemen.id === elementoId) {
                elemen.cantidad++
                Toastify({
                    text: "Producto Agregado",
                    duration: 1000,
                }).showToast();
            }
        })
    } else {

        const item = productos.find((elemen) => elemen.id === elementoId)

        carrito.push(item)

        Toastify({
            text: "Producto Agregado",
            duration: 1000,
        }).showToast();
    }
    listaCarrito()

}


const eliminarProd = (elementoId) => {
    const existe = carrito.some(elemen => elemen.id === elementoId)
    if (existe) {
        const item = carrito.map(elemen => {
            if (elemen.id === elementoId) {
                elemen.cantidad--
                Toastify({
                    text: "Producto Eliminado",
                    duration: 1000

                }).showToast();
                if (elemen.cantidad < 1) {
                    const item = carrito.find((elemen) => elemen.id === elementoId)
                    const indice = carrito.indexOf(item)
                    carrito.splice(indice, 1)
                    elemen.cantidad = 1
                }
            }
        })
    }
    listaCarrito()
}

const listaCarrito = () => {
    divCarro.innerHTML = ""
    carrito.forEach((elemen) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito container')
        div.innerHTML = `
        <p>${elemen.nombre}</p>
        <p>Precio:$${elemen.precio}</p>
        <p>Cantidad: <span id="cantidad">${elemen.cantidad}</span></p>
        <button id = "elimProd" onclick = "eliminarProd (${elemen.id})">Eliminar</button>
        `

        divCarro.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    contador.innerText = carrito.reduce((acumulador, elemen) => acumulador + elemen.cantidad * 1, 0)
    total.innerText = carrito.reduce((acumulador, elemen) => acumulador + elemen.precio * elemen.cantidad, 0)

    let total1 = carrito.reduce((acumulador, elemen) => acumulador + elemen.precio * elemen.cantidad, 0)

    carrito.length === 0 && localStorage.removeItem('carrito')
    if (carrito.length === 0) {
        Swal.fire('Carrito Vacio')
        contenedorModal.classList.toggle('modal-active')
    }

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
            productos.forEach(element => {
                element.cantidad = 1
            });
            carrito.length = 0
            localStorage.removeItem('carrito')
            contenedorModal.classList.toggle('modal-active')
            listaCarrito()
            location.reload()

        } else Swal.fire('A seguir comprando!')

    })

})

const renderFormulario = () => {

    formulario.innerHTML = `
    <form action="">
                    <div class="input">
                        <label for="nombre">Nombre</label>
                        <input type="text" name="nombre" id="nombre" placeholder="Nombre y apellido">
                    </div>
                    <div class="input">
                        <label for="telefono">Teléfono</label>
                        <input type="number" name="telefono" id="telefono" placeholder="Telefono">
                    </div>
                        <div class="input">
                            <label for="direccion">Dirección</label>
                            <input type="text" name="direccion" id="direccion" placeholder="Dirección">
                        </div>
                        
                </form>`
}


const renderCompra = () => {

    resumenCompra.innerHTML = ` `
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    console.log(carritoStorage)
    resumen = carrito.reduce((acumulador, elemen) => acumulador + elemen.precio * elemen.cantidad, 0)
    resumenCompra.innerHTML = ` 
                    <div class="totalF">
                        <h3>Total de tu Compra: $${resumen}</h2>
                    </div>`
    for (let elemento of carritoStorage) {
        let div = document.createElement('div');
        div.innerHTML = ""
        div.className = 'card';
        div.style = 'width: 10rem'
        div.innerHTML = `        
        <h5>${elemento.nombre}</h5>
        <p>Precio: $${elemento.precio}</p>
        <p>Cantidad:${elemento.cantidad}</p>
        `
        resumenCompra.appendChild(div)
    }

}

compra.addEventListener('click', () => {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    if (!carritoStorage) {
        Swal.fire('Carrito Vacio')
    } else if (carritoStorage.length > 0) {

        renderCompra()
        renderFormulario()

        location.href = "#confirmar";

    }


})


function guardar() {
    const datos = {
        usuario: nombre.value,
        telefono: telefono.value,
        direccion: direccion.value,
    }
    Swal.fire({
        title: '¿Deseas guardar tus datos?',
        showCancelButton: true,
        confirmButtonText: 'Guardar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem('datosCliente', JSON.stringify(datos))
            Swal.fire('Se guardaron los datos');
            sessionStorage.removeItem("carrito");
            location.reload();
        } else {
            Swal.fire('No se guardaron los datos')
            sessionStorage.removeItem("carrito")
        }

    })
}

function controlar() {
    const nomb = document.getElementById('nombre').value;
    const tel = document.getElementById('telefono').value;
    const direcc = document.getElementById('direccion').value;
    const datos = {
        usuario: nombre.value,
        telefono: telefono.value,
        direccion: direccion.value,
    }
    if (nomb != "" && tel != "" && direcc != "") {
        Swal.fire({
            title: 'Gracias por tu compra!',
            icon: 'success',
            text: '¿Deseas guardar tus datos?',
            position: 'center',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            timer: 4000

        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem('datosCliente', JSON.stringify(datos))
                Swal.fire('Se guardaron los datos');
                setTimeout(() => {
                    localStorage.removeItem('carrito');
                    location.reload();
                    location.href = "index.html";
                }, 2000);
            } else {
                Swal.fire({
                    title: 'No se guardaron los datos',
                    icon: 'error',
                    position: 'center',
                    timer: 4000

                })

                setTimeout(() => {
                    localStorage.removeItem('carrito');
                    location.reload();
                    location.href = "index.html";
                }, 2000);
            }

        })
    } else {
        Swal.fire({
            title: 'Completa los campos!',
            icon: 'info',
            timer: 3000,
            position: 'center'
        })
    }
}


finalizar.addEventListener('click', () => {
    renderCompra()
    Toastify({
        text: "Actualizando",
    }).showToast();
    setTimeout(() => {
        controlar()
    }, 1000);

})
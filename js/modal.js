const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]
const botonComprar = document.getElementById('comprar')
const botonFinalizar = document.getElementById('confirmar')
const botonVaciar = document.getElementById('vaciar')

botonAbrir.addEventListener('click', ()=>{
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    if (!carritoStorage){
        Swal.fire('Carrito Vacio')
    }  else if ((carritoStorage.length > 0))
    contenedorModal.classList.toggle('modal-active')
})

botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

botonComprar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
    botonFinalizar.classList.toggle('finalizar-active')
})

botonVaciar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', () =>{
    contenedorModal.classList.toggle('modal-active')

})

modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})

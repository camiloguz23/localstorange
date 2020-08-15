const carrito = document.getElementById("carro");
const ventana = document.querySelector(".carrito-compra");
const ingreso = document.querySelector("#caja");
const barra = document.getElementById("titulo_carrito");
const contenido = document.getElementById("contenido");
const eliminarbtn = document.getElementById("eliminar");

let locals = [];

///////// FUNCIONES ////////
obtener();
carrito.addEventListener("click", menu);
function menu() {
    ventana.style.display = "block";
};

barra.addEventListener("click", ocultar);
function ocultar() {
    ventana.style.display = "none";
}

contenido.addEventListener("click", agregar)
function agregar(evento) {
    evento.preventDefault();
    if (evento.target.classList.contains("comprar")) {
        const curso = evento.target.parentElement
        leercompras(curso);
    } else {
        console.log("error")
    }
    
};
// guardamos la informacion de la compra
function leercompras(compras) {
    const informacion ={
        imagen: compras.querySelector(".centrar").src,
        nombre: compras.querySelector(".letra").textContent,
        precio: compras.querySelector(".precio span").textContent,
        id:compras.querySelector("button").getAttribute("data-id")
    };
    //console.log(informacion);
    insertaCarrito(informacion);
}
// lo ingresamos al carrito de compras
function insertaCarrito(info) {
    const inserta = document.createElement("div");
    inserta.innerHTML =`
    <img scr="${info.imagen}" width="100px">
    <p class="letra">${info.nombre}</p>
    <p >${info.precio}</p>
    <button class="comprar borrar" data-id="${info.id}">borrar</button> <br>
    <span>------------------------------------------------------</span>
    `;
    ingreso.appendChild(inserta);
    guardar(info);
}
// eleminar un elemntoi selccionado del carrito
ingreso.addEventListener("click", eliminar);
function eliminar(borrar) {
    borrar.preventDefault();
    let carritols;
    let carritoid;
    if (borrar.target.classList.contains("borrar")) {
        borrar.target.parentElement.remove();
        carritols = borrar.target.parentElement;
        carritoid = carritols.querySelector("button").getAttribute("data-id");

    }
    eliminardelocalst(carritoid);
   

};
// eliminar elemento del carrito con el bonton de eliminar
eliminarbtn.addEventListener("click", vaciarCarrito);
function vaciarCarrito(vaciar) {
    vaciar.preventDefault();
    ingreso.innerHTML =``;
    // eliminar todo del carrito 
    let totals = obtener();
    totals.forEach(function(id,index){
        totals.splice(index);
    })
    localStorage.setItem("elemento", JSON.stringify(totals))
};
// guardaar en el localstorange
function guardar(dato) {
    locals.push(dato)
    localStorage.setItem("elemento",JSON.stringify(locals))
}
// traer informacion de local storange
function obtener() {

    if (localStorage.getItem("elemento") === null) {
        locals= [];
    } else {
        locals = JSON.parse(localStorage.getItem("elemento"))
        
    };
    return locals;
}
// al momento de cargar la pagina volver a mostrar los elemento elegidos en el carrito

document.addEventListener("DOMContentLoaded", leer);
function leer () {
    
    var mostrar = obtener();
    console.log(mostrar);
    for (let index = 0; index < mostrar.length; index++) {
        const camilo = mostrar[index];
        const inserta = document.createElement("div");
        inserta.innerHTML +=`
        <img src="${camilo.imagen}" width="100px>
        <p class="letra">${camilo.nombre}</p>
        <p >${camilo.precio}</p>
        <button class="comprar borrar" data-id="${camilo.id}">borrar</button> <br>
        <span>------------------------------------------------------</span>
        `;
        ingreso.appendChild(inserta);
    };
    
};
//eliminar del localstorange
function eliminardelocalst(elementols) {
    let storange = obtener();
    storange.forEach(function(id, index) {
        if (id.id === elementols) {
            storange.splice(index, 1)
        }
    });
    localStorage.setItem("elemento",JSON.stringify(storange));
}

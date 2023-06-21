// variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos  = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //cuando agregas un curso apretando agregar
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = []; //reseteamos el arreglo

        limpiarHTML(); // eliminamos todo el html
    })
}


//Funciones
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){ //lo limite al boton que dice agregar al carrito
        const cursoSeleccionado = e.target.parentElement.parentElement;
        
        leerDatosCurso(cursoSeleccionado);
    }
    
}

// Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
     

        carritoHTML(); //iterar sobre el carrito y mostrar su html
    }
}

// lee el contenido del curso al que le dimos clic
function leerDatosCurso(curso){
    console.log(curso);

    //crear un objeto con el contenido del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    // Revisa si un elemento ya existe en el carrito (itera entre los elementos para ver si hay repetidos. hay un id repetido en el id?)
const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
if (existe){
    //actualizamos la cantidad
    const cursos = articulosCarrito.map( curso => {
        if(curso.id === infoCurso.id){
            curso.cantidad++;
            return curso; //retorna el objeto actualizado
        } else{
            return curso; // retorna los objetos no duplicados
        }
    } )
    articulosCarrito = [...cursos];
} else{
    //agrega elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso]; 
}


    
    console.log(articulosCarrito);

    carritoHTML();
}


// muestra el carrito en el html
function carritoHTML(){

    //limpiar el html
    limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach( curso =>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr'); //crea un tr en el html del carrito 
        row.innerHTML = `
            <td> <img src="${imagen}" width="100"> </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> 
                <a href="#" class="borrar-curso" data-id="${id}"> X </a> 
            </td>
        `;

        //agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// elimina los cursos de tbody
function limpiarHTML(){
   // contenedorCarrito.innerHTML = ''; -----forma lenta

   while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
   }
}
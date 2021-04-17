let textoProducto = document.querySelector("#nombreDeProducto");
let buscarProducto = document.querySelector("#buscar");
let contenidoTabla = document.querySelector("#contenido");
let selectCategoria = document.querySelector("#categorias");


// seleccionar categorias

fetch("https://disenoydesarrolloapi.azurewebsites.net/api/Producto/Categorias")
.then(response => response.json())
.then(data => {
    data.categorias.forEach(element => {
        selectCategoria.innerHTML += `<option>${element}</option>`;
    })  
})

const buscarApi = (event) => {
    event.preventDefault()
    const productosApi = "https://disenoydesarrolloapi.azurewebsites.net/api/Producto";
    let producto = textoProducto.value;
    let selectOption = selectCategoria.value;

    //invocar a ala api
    fetch(productosApi + `?Nombre=` + producto + `&Categoria=` + selectOption) 

    .then(response => response.json())

    .then(data => tabla(data))
}



//renderizar la tabla 
const tabla = ((data, index) => {
    let salida = "";
    contenidoTabla.innerHTML = "";

    data.forEach(element => {        
        salida += 
        `<tr>
            <td>${element.codigo}</td>
            <td>${element.nombre}</td>
            <td>${element.categoria}</td>
            <td>$ ${element.precio}</td>
            <td>${element.proveedor}</td>
            <td><button class="style-boton"><i class="far fa-trash-alt"></i></button>
            <button class="style-boton"><i class="far fa-edit"></i></button></td>
        </tr>`
    });
    contenidoTabla.innerHTML = salida
})

buscarProducto.addEventListener("click", buscarApi)

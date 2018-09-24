//PROMESAS
var api_sw = "https://swapi.co/api/"; //dirección del api de STAR WARS
var datos = []; //variable qe guardará la información traída del api
var titulo_pagina = document.getElementById("titulo-ppal"); //variable que atrapará qué página está siendo deplegada
var asunto = titulo_pagina.innerHTML; //página que se está desplegando
var direccion; //dirección donde se buscará la info dependiendo de la página que se está desplegando
var crearTarjetas;
var contenedor;
var urls = [];

const CAMPO_DESEADO = "results";

//switch que define la dirección de donde se obtiene la info según la página desplegada
switch (asunto)
{
    case "Personajes":
        urls.push(api_sw + "people/");
        contenedor = document.getElementById("cont-personas");
        crearTarjetas = crearTarjetasPersonas;
    break;
    case "Planetas":
        urls.push(api_sw + "planets/");
        contenedor = document.getElementById("cont-planetas");
        crearTarjetas = crearTarjetasPlanetas;
    break;
    case "Películas":
        urls.push(api_sw + "films/");
        contenedor = document.getElementById("cont-peliculas");
        crearTarjetas = crearTarjetasPeliculas;
    break;
    case "Especies":
        urls.push(api_sw + "species/");
        contenedor = document.getElementById("cont-especies");
        crearTarjetas = crearTarjetasEspecies;
    break;
    case "Vehículos":
        urls.push(api_sw + "vehicles/");
        contenedor = document.getElementById("cont-vehiculos");
        crearTarjetas = crearTarjetasVehiculos;
    break;
    case "Naves":
        urls.push(api_sw + "starships/");
        contenedor = document.getElementById("cont-naves");
        crearTarjetas = crearTarjetasVehiculos;
    break;
}

function getUrls(dir)
{
    var peticion = new XMLHttpRequest(); //objeto que interactúa con los servidores permite obtener info de una URL sin tener que refrescar toda la página
    peticion.onload = function()
    {
        data = JSON.parse(this.responseText); //parse a JSON de la info traída (antes texto)
        
        console.log("cargando datos...");
        
        if(data.next)
        {
            urls.push(data.next);
            getUrls(data.next);
        }
        else
        {
            urls.forEach(function(url)
            {
                datos.push(getPeticion(url, CAMPO_DESEADO));
            });
            Promise.all(datos)
            .then(function(info)
            {
                console.log("datos cargados");
                crearTarjetas(info);
            });
        }
    };
    peticion.open("GET", dir, true); // petición d info tipo GET en la dirección dir de forma asíncrona (true)
    peticion.send(); //enviar petición
}

function getPeticion(url, campo)
{
    return new Promise(function(resolve, reject)
    {
        var peticion = new XMLHttpRequest();
        peticion.onload = function()
        {
            resolve(JSON.parse(peticion.responseText)[campo]);
        }
        peticion.onerror = function()
        {
            reject("Error");
        }
        peticion.open('GET', url, true);
        //peticion.setRequestHeader("llave": "valor"); Se usa para definir una propiedad de autenticación u otras características
        peticion.send();
    });
}

if(sessionStorage.getItem(asunto))
{
    contenedor.innerHTML = sessionStorage.getItem(asunto);
    (asunto === "Personajes") ? $("#cancion").on("click",audi) : asunto = asunto;
}
else
{
    getUrls(urls[0]);
}
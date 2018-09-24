var api_sw = "https://swapi.co/api/"; //dirección del api de STAR WARS
var data; //variable qe guardará la información traída del api
var titulo_pagina = document.getElementById("titulo-ppal"); //variable que atrapará qué página está siendo deplegada
var asunto = titulo_pagina.innerHTML; //página que se está desplegando
var direccion; //dirección donde se buscará la info dependiendo de la página que se está desplegando
var crearTarjetas;
var contenedor;

//switch que define la dirección de donde se obtiene la info según la página desplegada
switch (asunto)
{
    case "Personajes":
        direccion = api_sw + "people/";
        contenedor = document.getElementById("cont-personas");
        crearTarjetas = crearTarjetasPersonas;
    break;
    case "Planetas":
        direccion = api_sw + "planets/";
        contenedor = document.getElementById("cont-planetas");
        crearTarjetas = crearTarjetasPlanetas;
    break;
    case "Películas":
        direccion = api_sw + "films/";
        contenedor = document.getElementById("cont-peliculas");
        crearTarjetas = crearTarjetasPeliculas;
    break;
    case "Especies":
        direccion = api_sw + "species/";
        contenedor = document.getElementById("cont-especies");
        crearTarjetas = crearTarjetasEspecies;
    break;
    case "Vehículos":
        direccion = api_sw + "vehicles/";
        contenedor = document.getElementById("cont-vehiculos");
        crearTarjetas = crearTarjetasVehiculos;
    break;
    case "Naves":
        direccion = api_sw + "starships/";
        contenedor = document.getElementById("cont-naves");
        crearTarjetas = crearTarjetasVehiculos;
    break;
}
var datos = []; //varaible para guardar los datos a desplegar
var tarjetas = "";

getRequestDatos(direccion, datos, "results", crearTarjetas); //llamada a la función que obtiene la info


//función que obtiene info del campo campo de una api en la dirección dir y la guarda en arreglo y cuando se carga la info ejecuta funcion.
function getRequestDatos(dir, arreglo, campo, funcion)
{
    var peticion_personajes = new XMLHttpRequest(); //objeto que interactúa con los servidores permite obtener info de una URL sin tener que refrescar toda la página
    peticion_personajes.open("GET", dir, true); // petición d info tipo GET en la dirección dir de forma asíncrona (true)
    peticion_personajes.send(); //enviar petición
    peticion_personajes.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200) //cuando se obtiene la info (4) de forma exitosa (200)
        {
            data = JSON.parse(this.responseText); //parse a JSON de la info traída (antes texto)
            
            var data_info = Object.entries(data); //obtención de la info del JSON en un arreglo

            data_info.forEach(function(elemento) //función que obtiene los datos que interesan
            {
                crearArreglo(elemento, arreglo, campo); 
                
                if(elemento[0] == "next") //revisa si hay más de una página que contenga la info 
                {
                    if(elemento[1] != null)
                    {
                        getRequestDatos(elemento[1], arreglo, campo, funcion);
                    }
                    else
                    {
                        peticion_personajes.addEventListener("load", funcion);
                    }
                }
            });
        }        
    };
}

/* function getRequestDato(dir, campo)
{
    var xhr = new XMLHttpRequest(); //objeto que interactúa con los servidores permite obtener info de una URL sin tener que refrescar toda la página
    xhr.open("GET", dir, true); // petición d info tipo GET en la dirección dir de forma asíncrona (true)
    xhr.send(); //enviar petición
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200) //cuando se obtiene la info (4) de forma exitosa (200)
        {
            var dato;
            dato = JSON.parse(this.responseText); //parse a JSON de la info traída (antes texto)
            
            xhr.addEventListener("load", function(){return dato[campo]});
        }        
    };
} */

function crearArreglo(inicial, final, campo)//función que crea un arreglo final a partir de los datos en la casilla campo deseado del arreglo inicial
{
    if(inicial[0] == campo) //obtienen los datos de la casilla deseada del objcto (en este caso: results)
    {
        console.log("cargando datos...");
        if(Array.isArray(inicial[1]))
        inicial[1].forEach(function(dato) //creación de un arreglo con los objectos que se desea desplegar
        {
            final.push(dato);
        });
        else
        {
            final.push(inicial[1]);
        }

    }
}

function crearTarjetasPeliculas()
{
    datos.sort(function(a,b){return a.episode_id-b.episode_id});

    datos.forEach(function(objeto, indice)
    {
        if(indice != 0 && indice % 3 == 0)
        {
            tarjetas += `</div>`
        }
        if(indice % 3 == 0)
        {
            tarjetas += `<div class="row my-5">`
        }
        tarjetas += `<div class="col-lg-4 col-sm-6">
            <div class="card">
                <img class="card-img-top mw-100" src="${imgs_peliculas[objeto.episode_id-1]}" alt="Star Wars episode ${objeto.episode_id}  img">
                <div class="card-body">
                    <h4 class="card-title">STAR WARS episodio ${objeto.episode_id} "${objeto.title}"</h4>
                    <hr>
                    <div class="row">
                        <div class="col">
                            <p>Director:</p>
                            <p>Lanzamiento:</p>
                        </div>
                        <div class="col">
                            <p>${objeto.director}</p>
                            <p>${objeto.release_date}</p>
                        </div>
                    </div>
                    <button class="btn btn-info" data-toggle="modal" data-target="#info${objeto.episode_id}">Ver Detalle</button>

                    <!-- El Modal fade: animación-->
                    <div class="modal fade" id="info${objeto.episode_id}">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            
                                <!-- Cabecera del Modal -->
                                <div class="modal-header">
                                    <h3 class="modal-title">STAR WARS episodio ${objeto.episode_id} "${objeto.title}"</h3>
                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                </div>
                                
                                <!-- Cuerpo del Modal -->
                                <div class="modal-body">
                                    <strong>Sinopsis:</strong> ${objeto.opening_crawl} <br /><br /> 
                                    <strong>Director:</strong> ${objeto.director} <br /><br /> 
                                    <strong>Productores:</strong> ${objeto.producer} <br /><br /> 
                                    <strong>Lanzamiento:</strong> ${objeto.release_date} <br /><br /> 
                                </div>
                                
                                <!-- Pie del Modal -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>`;
        contenedor.innerHTML = tarjetas;
        
    });

}

function crearTarjetasPlanetas()
{
    datos.forEach( function(objeto)
    {
        console.log(objeto.url);
    });
}

function crearTarjetasEspecies()
{
    datos.forEach(function(objeto, indice)
    {
        if(indice != 0 && indice % 6 == 0)
        {
            tarjetas += `</div>`
        }
        if(indice % 6 == 0)
        {
            tarjetas += `<div class="row my-5">`
        }
        console.log(indice);
        tarjetas += `<div class="col-lg-2 col-sm-4">
            <div class="card card-especies">
                <div style="background-image: url(${imgs_especies[indice]}); background-size: cover; height:150px"></div>
                <div class="card-body">
                    <h4 class="card-title">Especie ${objeto.name}</h4>
                    <hr>
                    <div class="row">
                        <div class="col">
                            <p>Clasificación: ${objeto.classification}</p>
                            <p>Denominación: ${objeto.designation}</p>
                        </div>
                    </div>
                    <button class="btn btn-info" data-toggle="modal" data-target="#info${indice}">Ver Detalle</button>

                    <!-- El Modal fade: animación-->
                    <div class="modal fade" id="info${indice}">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            
                                <!-- Cabecera del Modal -->
                                <div class="modal-header">
                                    <h3 class="modal-title">Especie ${objeto.name}</h3>
                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                </div>
                                
                                <!-- Cuerpo del Modal -->
                                <div class="modal-body">
                                    <strong>Clasificación:</strong> ${objeto.classification} <br /><br /> 
                                    <strong>Denominación:</strong> ${objeto.designation} <br /><br /> 
                                    <strong>Promedio de Estatura:</strong> ${objeto.average_height} cm <br /><br /> 
                                    <strong>Colores de Piel:</strong> ${objeto.skin_colors} <br /><br /> 
                                    <strong>Colores de Cabello:</strong> ${objeto.hair_colors} <br /><br /> 
                                    <strong>Colores de Ojos:</strong> ${objeto.eyes_colors} <br /><br /> 
                                    <strong>Esperanza de Vida:</strong> ${objeto.average_lifespan} <br /><br /> 
                                    <strong>Lenguaje:</strong> ${objeto.language} <br /><br /> 
                                </div>
                                
                                <!-- Pie del Modal -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>`;
        contenedor.innerHTML = tarjetas;
    });
}

function crearTarjetasVehiculos()
{
    datos.forEach(function(objeto, indice)
    {
        if(asunto == "Vehículos")
        {
            var a = `<strong>Tipo de Vehículo:</strong> ${objeto.vehicle_class} <br /><br />`
        }
        else
        {
            var a = `<strong>Tipo de Nave:</strong> ${objeto.starship_class} <br /><br />`
        }
        if(indice != 0 && indice % 4 == 0)
        {
            tarjetas += `</div>`
        }
        if(indice % 4 == 0)
        {
            tarjetas += `<div class="row my-5">`
        }
        console.log(indice);
        tarjetas += `<div class="col-lg-3 col-sm-6">
            <div class="card card-vehiculos">
                <div class="card-body">
                    <h4 class="card-title">${objeto.name}</h4>
                    <hr>
                    <div class="row">
                        <div class="col">
                            <p>Modelo: ${objeto.model}</p>
                            <p>Costo en créditos: ${objeto.cost_in_credits}</p>
                        </div>
                    </div>
                    <button class="btn btn-info" data-toggle="modal" data-target="#info${indice}">Ver Detalle</button>

                    <!-- El Modal fade: animación-->
                    <div class="modal fade" id="info${indice}">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            
                                <!-- Cabecera del Modal -->
                                <div class="modal-header">
                                    <h3 class="modal-title">${objeto.name}</h3>
                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                </div>
                                
                                <!-- Cuerpo del Modal -->
                                <div class="modal-body">
                                    <strong>Modelo:</strong> ${objeto.model} <br /><br /> 
                                    <strong>Costo en créditos:</strong> ${objeto.cost_in_credits} <br /><br /> 
                                    <strong>Fabricante:</strong> ${objeto.manufacturer} cm <br /><br /> 
                                    <strong>Largo:</strong> ${objeto.length} <br /><br /> 
                                    <strong>Tripulación:</strong> ${objeto.crew} <br /><br /> 
                                    <strong>Pasajeros:</strong> ${objeto.passengers} <br /><br /> 
                                    <strong>Capacidad de Carga:</strong> ${objeto.cargo_capacity} Ton <br /><br />
                                    ${a}                                    
                                </div>
                                
                                <!-- Pie del Modal -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>`;
    });
    contenedor.innerHTML = tarjetas;
}



function crearTarjetasPersonas()
{
    datos.forEach( function(objeto, indice)
    {
        if(indice != 0 && indice % 4 == 0)
        {
            tarjetas += `</div>`
        }
        if(indice % 4 == 0)
        {
            tarjetas += `<div class="row my-5">`
        }
        tarjetas += `<div class="col-lg-3 col-sm-6">
            <div class="card card-planetas">
                <div style="background-image: url(${imgs_personas[indice]}); background-size: cover; height:300px"></div>
                <div class="card-body">
                    <h4 class="card-title">${objeto.name}</h4>
                    <hr>
                    <div class="row">
                        <div class="col">
                            <p>Género: ${objeto.gender}</p>
                            <p>Año de nacimiento: ${objeto.birth_year}</p>
                        </div>
                    </div>
                    <button class="btn btn-info" data-toggle="modal" data-target="#info${indice}">Ver Detalle</button>

                    <!-- El Modal fade: animación-->
                    <div class="modal fade" id="info${indice}">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            
                                <!-- Cabecera del Modal -->
                                <div class="modal-header">
                                    <h3 class="modal-title">${objeto.name}</h3>
                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                </div>
                                
                                <!-- Cuerpo del Modal -->
                                <div class="modal-body">
                                    <strong>Estatura:</strong> ${objeto.height} cm <br /><br /> 
                                    <strong>Peso:</strong> ${objeto.mass} Kg <br /><br /> 
                                    <strong>Género:</strong> ${objeto.gender} <br /><br /> 
                                    <strong>Año de nacimiento:</strong> ${objeto.birth_year} <br /><br /> 
                                    <strong>Color de Cabello:</strong> ${objeto.hair_color} <br /><br /> 
                                    <strong>Color de Piel:</strong> ${objeto.skin_color} <br /><br /> 
                                    <strong>Color de Ojos:</strong> ${objeto.eye_color} <br /><br /> 
                                </div>
                                
                                <!-- Pie del Modal -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>`;
        contenedor.innerHTML = tarjetas;
    });
}
function crearTarjetasPeliculas(informacion)
{
    var tarjetas = "";
    var indice = 0;
    
    informacion.forEach(function(x)
        {
            x.sort(function(a,b){return a.episode_id-b.episode_id});
        });

    informacion.forEach(x => 
        {
            x.forEach(peli => 
                {
                    var personajes = [];
                    peli.characters.forEach(url => 
                        {
                            personajes.push(getPeticion(url, "name"));
                        });
                    Promise.all(personajes)
                    .then(function(personajes)
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
                                <img class="card-img-top mw-100" src="${imgs_peliculas[peli.episode_id-1]}" alt="Star Wars episode ${peli.episode_id}  img">
                                <div class="card-body">
                                    <h4 class="card-title">STAR WARS episodio ${peli.episode_id} "${peli.title}"</h4>
                                    <hr>
                                    <div class="row">
                                        <div class="col">
                                            <p>Director:</p>
                                            <p>Lanzamiento:</p>
                                        </div>
                                        <div class="col">
                                            <p>${peli.director}</p>
                                            <p>${peli.release_date}</p>
                                        </div>
                                    </div>
                                    <button class="btn btn-info" data-toggle="modal" data-target="#info${peli.episode_id}">Ver Detalle</button>

                                    <!-- El Modal fade: animación-->
                                    <div class="modal fade" id="info${peli.episode_id}">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            
                                                <!-- Cabecera del Modal -->
                                                <div class="modal-header">
                                                    <h3 class="modal-title">STAR WARS episodio ${peli.episode_id} "${peli.title}"</h3>
                                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                                </div>
                                                
                                                <!-- Cuerpo del Modal -->
                                                <div class="modal-body">
                                                    <strong>Sinopsis:</strong> ${peli.opening_crawl} <br /><br /> 
                                                    <strong>Director:</strong> ${peli.director} <br /><br /> 
                                                    <strong>Productores:</strong> ${peli.producer} <br /><br /> 
                                                    <strong>Lanzamiento:</strong> ${peli.release_date} <br /><br /> 
                                                    <strong>Personajes:</strong> ${personajes} <br /><br /> 
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
                        $("#cargando").hide();                        
                        contenedor.innerHTML = tarjetas;
                        indice++;
                        sessionStorage.setItem(asunto, tarjetas);
                    });
                });
        });
}


function crearTarjetasPlanetas(informacion)
{
    var tarjetas = "";
    var indice = 0;
    
    informacion.forEach(x => 
        {
            x.forEach(planet => 
                {
                    var residentes = [];
                    planet.residents.forEach(url => 
                        {
                            residentes.push(getPeticion(url, "name"));
                        });
                    Promise.all(residentes)
                    .then(function(res)
                    {
                        var id = planet.url.charAt(29);
                        var id2 = planet.url.charAt(30);
                        (id2 !== "/") ? (id += id2) : (id =id);
                        
                        if(!res.length)
                        {res = "¡Sin residentes conocidos!"}

                        if(indice != 0 && indice % 6 == 0)
                        {
                            tarjetas += `</div>`
                        }
                        if(indice % 6 == 0)
                        {
                            tarjetas += `<div class="row my-5">`
                        }
                        tarjetas += `<div class="col-lg-2 col-sm-4">
                            <div class="card card-planetas">
                                <img class="card-img-top mw-100" src="${imgs_planetas[id-1]}" alt="Planeta ${planet.name} img">
                                <div class="card-body card-body-planetas">
                                    <h4 class="card-title">Planeta ${planet.name}</h4>
                                    <hr>
                                    <div class="row">
                                        <div class="col">
                                            <p>Diametro: ${planet.diameter}</p>
                                            <p>Población: ${planet.population}</p>
                                        </div>
                                    </div>
                                    <button class="btn btn-info pie" data-toggle="modal" data-target="#info${indice}">Ver Detalle</button>

                                    <!-- El Modal fade: animación-->
                                    <div class="modal fade" id="info${indice}">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            
                                                <!-- Cabecera del Modal -->
                                                <div class="modal-header">
                                                    <h3 class="modal-title">Planeta ${planet.name}</h3>
                                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                                </div>
                                                
                                                <!-- Cuerpo del Modal -->
                                                <div class="modal-body">
                                                    <strong>Periodo de Rotación:</strong> ${planet.rotation_period} <br /><br /> 
                                                    <strong>Diametro:</strong> ${planet.diameter} <br /><br /> 
                                                    <strong>Clima:</strong> ${planet.climate} <br /><br /> 
                                                    <strong>Gravedad:</strong> ${planet.gravity} <br /><br /> 
                                                    <strong>Población:</strong> ${planet.population} <br /><br /> 
                                                    <strong>Periodo Orbital:</strong> ${planet.orbital_period} <br /><br /> 
                                                    <strong>Terrenos:</strong> ${planet.terrain} <br /><br /> 
                                                    <strong>Residentes:</strong> ${res} <br /><br /> 
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
                        $("#cargando").hide();
                        contenedor.innerHTML = tarjetas;
                        indice++;
                        sessionStorage.setItem(asunto, tarjetas);
                    });
                });
        });
}


function crearTarjetasEspecies(informacion)
{
    var tarjetas = "";
    var indice = 0;

    informacion.forEach(x => 
        {
            x.forEach(especie => 
                {
                    var personajes = [];
                    especie.people.forEach(url => 
                        {
                            personajes.push(getPeticion(url, "name"));
                        });
                    Promise.all(personajes)
                    .then(function(per)
                    {
                        var id = especie.url.charAt(29);
                        var id2 = especie.url.charAt(30);
                        (id2 !== "/") ? (id += id2) : (id =id);
                        
                        console.log(especie.name, id);

                        if(!per.length)
                        {per = "¡Sin personas que pertenezcan a esta raza conocidas!"}

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
                                <div style="background-image: url(${imgs_especies[id-1]}); background-size: cover; height:150px"></div>
                                <div class="card-body card-body-especie">
                                    <h4 class="card-title">Especie ${especie.name}</h4>
                                    <hr>
                                    <div class="row">
                                        <div class="col">
                                            <p>Clasificación: ${especie.classification}</p>
                                            <p>Denominación: ${especie.designation}</p>
                                        </div>
                                    </div>
                                    <button class="btn btn-info pie" data-toggle="modal" data-target="#info${indice}">Ver Detalle</button>

                                    <!-- El Modal fade: animación-->
                                    <div class="modal fade" id="info${indice}">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            
                                                <!-- Cabecera del Modal -->
                                                <div class="modal-header">
                                                    <h3 class="modal-title">Especie ${especie.name}</h3>
                                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                                </div>
                                                
                                                <!-- Cuerpo del Modal -->
                                                <div class="modal-body">
                                                    <strong>Clasificación:</strong> ${especie.classification} <br /><br /> 
                                                    <strong>Denominación:</strong> ${especie.designation} <br /><br /> 
                                                    <strong>Promedio de Estatura:</strong> ${especie.average_height} cm <br /><br /> 
                                                    <strong>Colores de Piel:</strong> ${especie.skin_colors} <br /><br /> 
                                                    <strong>Colores de Cabello:</strong> ${especie.hair_colors} <br /><br /> 
                                                    <strong>Colores de Ojos:</strong> ${especie.eyes_colors} <br /><br /> 
                                                    <strong>Esperanza de Vida:</strong> ${especie.average_lifespan} <br /><br /> 
                                                    <strong>Lenguaje:</strong> ${especie.language} <br /><br /> 
                                                    <strong>Personas:</strong> ${per} <br /><br /> 
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
                        $("#cargando").hide();
                        contenedor.innerHTML = tarjetas;
                        indice++;
                        sessionStorage.setItem(asunto, tarjetas);
                    });
                });
        });
}

function crearTarjetasVehiculos(informacion)
{
    var tarjetas = "";
    var indice = 0;

    informacion.forEach(x => 
        {
            x.forEach(vehiculo => 
                {
                    var pilotos = [];
                    vehiculo.pilots.forEach(url => 
                        {
                            pilotos.push(getPeticion(url, "name"));
                        });
                    Promise.all(pilotos)
                    .then(function(pil)
                    {                            
                        if(!pil.length)
                        {pil = "¡Sin personas conocidas que piloteen esta nave!"}

                        if(asunto == "Vehículos")
                        {
                            var a = `<strong>Tipo de Vehículo:</strong> ${vehiculo.vehicle_class} <br /><br />`
                        }
                        else
                        {
                            var a = `<strong>Tipo de Nave:</strong> ${vehiculo.starship_class} <br /><br />`
                        }
                        if(indice != 0 && indice % 4 == 0)
                        {
                            tarjetas += `</div>`
                        }
                        if(indice % 4 == 0)
                        {
                            tarjetas += `<div class="row my-5">`
                        }
                        tarjetas += `<div class="col-lg-3 col-sm-6">
                            <div class="card card-vehiculos">
                                <div class="card-body">
                                    <h4 class="card-title">${vehiculo.name}</h4>
                                    <hr>
                                    <div class="row">
                                        <div class="col">
                                            <p>Modelo: ${vehiculo.model}</p>
                                            <p>Costo en créditos: ${vehiculo.cost_in_credits}</p>
                                        </div>
                                    </div>
                                    <button class="btn btn-info pie-ships" data-toggle="modal" data-target="#info${indice}">Ver Detalle</button>

                                    <!-- El Modal fade: animación-->
                                    <div class="modal fade" id="info${indice}">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            
                                                <!-- Cabecera del Modal -->
                                                <div class="modal-header">
                                                    <h3 class="modal-title">${vehiculo.name}</h3>
                                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                                </div>
                                                
                                                <!-- Cuerpo del Modal -->
                                                <div class="modal-body">
                                                    <strong>Modelo:</strong> ${vehiculo.model} <br /><br /> 
                                                    <strong>Costo en créditos:</strong> ${vehiculo.cost_in_credits} <br /><br /> 
                                                    <strong>Fabricante:</strong> ${vehiculo.manufacturer} cm <br /><br /> 
                                                    <strong>Largo:</strong> ${vehiculo.length} <br /><br /> 
                                                    <strong>Tripulación:</strong> ${vehiculo.crew} <br /><br /> 
                                                    <strong>Pasajeros:</strong> ${vehiculo.passengers} <br /><br /> 
                                                    <strong>Capacidad de Carga:</strong> ${vehiculo.cargo_capacity} Ton <br /><br />
                                                    <strong>Pilotos:</strong>${pil}<br /><br />
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

                        $("#cargando").hide();
                        contenedor.innerHTML = tarjetas;
                        indice++;
                        sessionStorage.setItem(asunto, tarjetas);
                    });
                });
        });
}

function crearTarjetasPersonas(informacion)
{
    var tarjetas = "";
    var indice = 0;
    var clase = "";
    var clase2 = "";
 
    informacion.forEach(x => 
        {
            x.forEach(persona => 
                {
                    clase = "";
                    var especie = [];
                    var peliculas = [];
                    getPeticion(persona.homeworld, "name")
                    .then(function(h)
                    {                            
                        persona.species.forEach(url =>
                            {
                                especie.push(getPeticion(url, "name"));
                            })
                            Promise.all(especie)
                            .then(e => 
                            {
                                persona.films.forEach(url =>
                                    {
                                        peliculas.push(getPeticion(url, "title"))
                                    })
                                Promise.all(peliculas)
                                .then(p =>
                                {
                                    (persona.name === "Darth Vader") ? clase = "cancion" : clase = "";
                                    (persona.name === "Darth Vader") ? clase2 = "parar" : clase2 = "";
                                        
                                    var id = persona.url.charAt(28);
                                    var id2 = persona.url.charAt(29);
                                    (id2 !== "/") ? (id += id2) : (id=id);

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
                                            <div style="background-image: url(${imgs_personas[id-1]}); background-size: cover; height:300px"></div>
                                            <div class="card-body">
                                                <h4 class="card-title">${persona.name}</h4>
                                                <hr>
                                                <div class="row">
                                                    <div class="col">
                                                        <p>Género: ${persona.gender}</p>
                                                        <p>Año de nacimiento: ${persona.birth_year}</p>
                                                    </div>
                                                </div>
                                                <button id="${clase}" class="btn btn-info" data-toggle="modal" data-target="#info${indice}">Ver Detalle</button>

                                                <!-- El Modal fade: animación-->
                                                <div class="modal fade" id="info${indice}">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                        
                                                            <!-- Cabecera del Modal -->
                                                            <div class="modal-header">
                                                                <h3 class="modal-title">${persona.name}</h3>
                                                                <button type="button" class="close" data-dismiss="modal">×</button>
                                                            </div>
                                                            
                                                            <!-- Cuerpo del Modal -->
                                                            <div class="modal-body">
                                                                <strong>Estatura:</strong> ${persona.height} cm <br /><br /> 
                                                                <strong>Peso:</strong> ${persona.mass} Kg <br /><br /> 
                                                                <strong>Género:</strong> ${persona.gender} <br /><br /> 
                                                                <strong>Año de nacimiento:</strong> ${persona.birth_year} <br /><br /> 
                                                                <strong>Color de Cabello:</strong> ${persona.hair_color} <br /><br /> 
                                                                <strong>Color de Piel:</strong> ${persona.skin_color} <br /><br /> 
                                                                <strong>Color de Ojos:</strong> ${persona.eye_color} <br /><br /> 
                                                                <strong>Planeta natal:</strong> ${h} <br /><br /> 
                                                                <strong>Especie:</strong> ${e} <br /><br /> 
                                                                <strong>Películas:</strong> ${p} <br /><br /> 
                                                            </div>
                                                            
                                                            <!-- Pie del Modal -->
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-danger" data-dismiss="modal" id="${clase2}">Cerrar</button>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>`;
                                    $("#cargando").hide();
                                    contenedor.innerHTML = tarjetas;
                                    indice++;
                                    $("#cancion").on("click",audi);
                                    $("#parar").on("click",audistp);
                                    sessionStorage.setItem(asunto, tarjetas);                            
                                });
                            });
                    });
                });
        });
}



function audi()
{
    $("#son").trigger("play");
}

function audistp()
{
    $("#son").trigger("pause");
}
/* */   
function cambioVista(info)
{
    $("#cont-buscador").hide();
    $("#cont-info").show();
    establecerPeticionDetalle(info);
}

function establecerPeticionDetalle(id)
{
    $.ajax({
        type: "GET",
        url: API_ENDPOINT,
        data: 
        {
            apikey: API_KEY,
            i: id,
            type: tipo_busqueda,
            plot: "full"
        },
        dataType: "json",
    })
    .done(function(info)
    {
        if(info.Response === "True")
        {
            mostrarDetalle(info);
        }
        else
        {
            detalles = `Lo sentimos, no pudimos acceder a los detalles`;
            $("#detalle").html(detalles);
        }
    })
    .fail(function(err)
    {
        console.log(err);
    });
}

function mostrarDetalle(info)
{   
    var calificaciones = '';
    var poster = '';
    info.Ratings.forEach(rating =>
    {
        calificaciones += `<p>${rating.Source} - ${rating.Value}</p>`    
    });

    if(info.Poster === "N/A")
    {
        poster = "https://bit.ly/2xIvyRU";
    }
    else
    {
        poster = info.Poster;
    }

    var web = '';
    if(info.Website)
    {
        web = info.Website;
    }
    else
    {
        web = '#';
    }

    if(tipo_busqueda === 'movie')
    {
        detalles = `<div class="row my-3" style="justify-content: center">
                        <h3>${info.Title}</h3>
                    </div>
                    <div class="row">
                        <div class="col-4 p-0">
                            <img src="${poster}">
                        </div>
                        <div class="col-8 p-0 info-pelicula">
                            <p><strong>Género:</strong> ${info.Genre}</p>
                            <p><strong>Director:</strong> ${info.Director}</p>
                            <p><strong>Año:</strong> ${info.Year}</p>
                            <p><strong>Clasificación:</strong> ${info.Rated}</p>
                            <p><strong>Lanzamiento:</strong> ${info.Released}</p>
                            <p><strong>Duración:</strong> ${info.Runtime}</p>
                            <p><strong>Guionistas:</strong> ${info.Writer}</p>
                            <p><strong>Actores:</strong> ${info.Actors}</p>
                            <p><strong>Trama:</strong> ${info.Plot}</p>
                            <p><strong>Idioma Original:</strong> ${info.Language}</p>
                            <div>
                                <strong>Calificaciones:</strong>
                                ${calificaciones}
                            </div>
                            <p><strong>Premios:</strong> ${info.Awards}</p>
                            <p><strong>Lanzamiento DVD:</strong> ${info.DVD}</p>
                            <p><strong>Productora:</strong> ${info.Production}</p>
                            <p><strong>Ingresos Taquilla:</strong> ${info.BoxOffice}</p>
                            <p><strong>Sitio Web:</strong> <a href="${web}">Ir al WebSite<a></p>
                        </div>
                    </div>`;
                    $("#detalle").html(detalles);
    }
    else
    {
        var temporadas = `<select class="custom-select mb-5" id="ver-temporadas">
                            <option></option>`;

        for(var i = 0; i < info.totalSeasons; i++)
        {
            temporadas += `<option value="${i+1}">Temporada ${i+1}</option>`
        }

        temporadas += `</select>`;

        detalles = `<div class="row my-3" style="justify-content: center">
                        <h3>${info.Title}</h3>
                    </div>
                    <div class="row">
                        <div class="col-4 p-0">
                            <img src="${poster}">
                        </div>
                        <div class="col-8 p-0 info-pelicula">
                            <p><strong>Género:</strong> ${info.Genre}</p>
                            <p><strong>Director:</strong> ${info.Director}</p>
                            <p><strong>Año:</strong> ${info.Year}</p>
                            <p><strong>Clasificación:</strong> ${info.Rated}</p>
                            <p><strong>Lanzamiento:</strong> ${info.Released}</p>
                            <p><strong>Duración:</strong> ${info.Runtime}</p>
                            <p><strong>Guionistas:</strong> ${info.Writer}</p>
                            <p><strong>Actores:</strong> ${info.Actors}</p>
                            <p><strong>Trama:</strong> ${info.Plot}</p>
                            <p><strong>Idioma Original:</strong> ${info.Language}</p>
                            <div>
                                <strong>Calificaciones:</strong>
                                ${calificaciones}
                            </div>
                            <p><strong>Premios:</strong> ${info.Awards}</p>
                            <p><strong>Número de Temporadas:</strong> ${info.totalSeasons}</p>
                            <p><strong>Lista de Temporadas:</p>
                            ${temporadas}
                        </div>
                    </div>`;
                    $("#detalle").html(detalles);
                    $("#ver-temporadas").on("change", function(e) {establecerPeticionTemporadas(e,info.imdbID)});
    }
}

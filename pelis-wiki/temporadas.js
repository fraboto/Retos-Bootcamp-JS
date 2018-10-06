function establecerPeticionTemporadas(e, id)
{
    $.ajax({
        type: "GET",
        url: API_ENDPOINT,
        data: 
        {
            apikey: API_KEY,
            i: id,
            Season: e.target.value,
        },
        dataType: "json",
    })
    .done(function(info)
    {
        if(info.Response === "True")
        {
            mostrarEpisodios(info.Episodes);
        }
        else
        {
            temp = `Lo sentimos, no pudimos acceder a la temporada`;
            $("#temporadas").html(temp);
        }
    })
    .fail(function(err)
    {
        console.log(err);
    });
}

function  mostrarEpisodios(info)
{
    temp = `<div id="accordion" class="mb-5">`;
    info.forEach((episodio) =>
    {
        temp += `<div class="card">
                    <div class="card-header">
                    <a class="card-link" data-toggle="collapse" href="#collapse${episodio.Episode}">
                        Episodio ${episodio.Episode} - ${episodio.Title}
                    </a>
                    </div>
                    <div id="collapse${episodio.Episode}" class="collapse hide" data-parent="#accordion">
                    <div class="card-body">
                        <p>Fecha de Lanzamiento: ${episodio.Released}</p>
                        <p>Calificación imDB: ${episodio.imdbRating}</p>
                    </div>
                    </div>
                </div>`;    
    });
    temp += `</div>`;
    $("#temporadas").html(temp);
}

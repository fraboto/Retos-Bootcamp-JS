const API_KEY = "8309ed66";
const API_ENDPOINT = "http://www.omdbapi.com/";
var tipo_busqueda = "";
var resultados = "";
var detalles = "";
var temp = "";
var pagina_busqueda = 1;
var criterio;

$(function()
{
    $("#cont-busqueda").hide();
    $("#cont-info").hide();
    $("#boton-volver").hide();
    $("#boton-volver-bus").hide();
    $("#busqueda").keyup(buscar);
    $("#boton-buscar").on("click", buscar);
    $("#boton-volver").on("click", volver);
    $("#boton-volver-resultados").on("click", volverBusqueda);
    $("#boton-volver-bus").on("click", volver);
    $("#boton-pel").on("click", establecerBusqueda);
    $("#boton-ser").on("click", establecerBusqueda);
})

function establecerBusqueda(e)
{
    $("#cont-clasificacion").hide();
    $("#boton-volver-bus").hide();
    $("#cont-busqueda").show();
    $("#busqueda").focus();
    $("#boton-volver").show();
    if(e.target.id === "boton-pel")
    {
        $("#busqueda").attr("placeholder", "titulo de la película");
        tipo_busqueda = "movie";
    }
    else    
    {
        $("#busqueda").attr("placeholder", "titulo de la serie");
        tipo_busqueda = "series";
    }
}

function volver()
{
    resultados = "";
    $("#resultado").html(resultados);
    $("#cont-busqueda").hide();
    $("#boton-volver").hide();
    $("#boton-volver-resultados").hide();
    $("#cont-clasificacion").show();
    $("#espacio-volver").show();
    $("#busqueda").val("");
    $("#paginacion").html("");
    $("#total-resultados").html("");
}

function volverBusqueda()
{
    detalles = ``;
    $("#detalle").html(temp);
    temp = ``;
    $("#temporadas").html(temp);
    $("#cont-info").hide();
    $("#cont-buscador").show();
}

function buscar(evento)
{
    if(evento.key == "Enter" || evento.type=="click")
    {
        pagina_busqueda = 1;
        criterio = $("#busqueda").val();
        getDatosDB(criterio, pagina_busqueda);
    }
}

function getDatosDB(cri, pagina)
{
    reiniciarBuscador();

    $("#espacio-volver").hide();
    $("#boton-volver-bus").show();
    $("#total-resultados").hide();

    establecerPeticionBusqueda(cri, pagina)
    
}

function establecerPeticionBusqueda(cri, pagina)
{
    resultados = "";
    $("#resultado").html(resultados);
    $.ajax({
        type: "GET",
        url: API_ENDPOINT,
        data: 
        {
            apikey: API_KEY,
            s: cri,
            type: tipo_busqueda,
            page: pagina
        },
        dataType: "json",
    })
    .done(function(info)
    {
        if(info.Response === "True")
        {
            listarPeliculas(info);
        }
        else
        {
            resultados = `Lo sentimos, no pudimos encontrar resultados que coincidan con la búsqueda`;
            $("#resultado").html(resultados);
        }
    })
    .fail(function(err)
    {
        console.log(err);
    });
}

function listarPeliculas(info)
{
    var num_pag = Math.ceil(info.totalResults/10);
    $("#total-resultados").show().text(`Resultados encontrados: ${info.totalResults}! Mostrando página ${pagina_busqueda} de ${num_pag}`);
    info.Search.forEach(resultado => 
        {
            var poster = "";
            if(resultado.Poster !== "N/A")
            {
                poster = `<img class="d-flex mr-3 img-busqueda" src="${resultado.Poster}" alt="Poster ${resultado.Title}">`
            }
            else
            {
                poster = `<img class="d-flex mr-3 img-busqueda" src="https://bit.ly/2xIvyRU" alt="Póster desconocido">`
            }
            resultados +=  `<div class="media lista-busqueda my-3">
                                ${poster}
                                <div class="media-body">
                                    <h5 class="my-0 titulos" onclick='cambioVista("${resultado.imdbID}")'>${resultado.Title}</h5>
                                    <span class="ano-busqueda my-0">${resultado.Year}</span>
                                </div>
                            </div>`;
        });
    
    var pag = hacerPaginacion(num_pag);
    
    $("#resultado").html(resultados);
    $("#paginacion").html(pag);
    $("#boton-siguiente").on("click", siguientePagina);
    $("#boton-anterior").on("click", anteriorPagina);
}

function siguientePagina()
{   
    pagina_busqueda++;
    establecerPeticionBusqueda(criterio, pagina_busqueda);
}

function anteriorPagina()
{   
    pagina_busqueda--;
    establecerPeticionBusqueda(criterio, pagina_busqueda);
}

function reiniciarBuscador()
{
    resultados = "";
    $("#resultado").html(resultados);
    $("#paginacion").html("");
}

function hacerPaginacion(num_pag)
{
    if(num_pag > 1)
    {
        if(pagina_busqueda === 1)
        {
            var pag =  `<nav>
                            <ul class="pagination pagination-sm">
                                <li class="page-item">
                                    <button class="page-link" aria-label="Next" id="boton-siguiente">
                                        Siguiente
                                    </button>
                                </li>
                            </ul>
                        </nav>`;
        }
        else if(pagina_busqueda === num_pag)
        {
            var pag =  `<nav>
                            <ul class="pagination pagination-sm">
                                <li class="page-item">
                                    <button class="page-link" aria-label="Anterior" id="boton-anterior">
                                        Anterior
                                    </button>
                                </li>
                            </ul>
                        </nav>`;
        }
        else
        {
            var pag =  `<nav>
                            <ul class="pagination pagination-sm">
                                <li class="page-item">
                                    <button class="page-link" aria-label="Anterior" id="boton-anterior">
                                        Anterior
                                    </button>
                                </li>
                                <li class="page-item">
                                    <button class="page-link" aria-label="Next" id="boton-siguiente">
                                        Siguiente
                                    </button>
                                </li>
                            </ul>
                        </nav>`;
        }
    }
    return pag;
}

var selEquipo = document.getElementById("selec_equipos");
var escudoEquipo = document.getElementById("escudo");
var ciud = document.getElementById("ciudad");
var esta = document.getElementById("estadio");
var stars = document.getElementById("estrellas");
var pres = document.getElementById("presidente");
var nombreEquipo = document.getElementById("nombre");
var tec = document.getElementById("tecnico");
var arco = document.getElementById("arqueros");
var defensa = document.getElementById("defensas");
var mediocampo = document.getElementById("mediocampistas");
var ataque = document.getElementById("delanteros");
var pagina_eq = document.getElementById("cont_eq");
var pagina_tab = document.getElementById("cont_tab");

var equiposA = dataEquipos.filter(function(equipo){
    return equipo.categoria == "A";
});

var equiposB = dataEquipos.filter(function(equipo){
    return equipo.categoria == "B";
});

var lista_liga = document.getElementById("boton_liga");
lista_liga.addEventListener("click", function(){selector(equiposA)});
var lista_torneo = document.getElementById("boton_torneo");
lista_torneo.addEventListener("click", function(){selector(equiposB)});

pagina_tab.style.display = "none";

var boton_eq = document.getElementById("boton_equipos");
boton_eq.addEventListener("click", intercalar);

var boton_tabla = document.getElementById("boton_tablas");
boton_tabla.addEventListener("click", intercalar2);

function intercalar()
{
    pagina_tab.style.display = "none";
    pagina_eq.style.display = "block";
}

function intercalar2()
{
    pagina_tab.style.display = "block";
    pagina_eq.style.display = "none";
}

function selector(arreglo)
{
    console.log(arreglo);
    var text = "";
    arreglo.forEach(function(equipo)
    {
        text += "<option>" + equipo.nombre + "</option>";
    });
    selEquipo.innerHTML = text;

    selEquipo.onchange = function() 
    {
        ciud.innerHTML = arreglo[this.selectedIndex].ciudad; 
        esta.innerHTML = arreglo[this.selectedIndex].estadio;
        stars.innerHTML = arreglo[this.selectedIndex].estrellas;
        pres.innerHTML = arreglo[this.selectedIndex].presidente;
        escudoEquipo.src = arreglo[this.selectedIndex].escudo;
        nombreEquipo.innerHTML = arreglo[this.selectedIndex].nombre;
        tec.innerHTML = arreglo[this.selectedIndex].tecnico;
        arco.innerHTML = arreglo[this.selectedIndex].plantilla.arqueros.join("<br />");
        defensa.innerHTML = arreglo[this.selectedIndex].plantilla.defensas.join("<br />");
        mediocampo.innerHTML = arreglo[this.selectedIndex].plantilla.mediocampistas.join("<br />");
        ataque.innerHTML = arreglo[this.selectedIndex].plantilla.delanteros.join("<br />");
    };
}
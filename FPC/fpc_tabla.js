var mostrar_tabla_liga = document.getElementById("boton_tabla_liga");
mostrar_tabla_liga.addEventListener("click", intercalar_tabla_A);
var mostrar_tabla_torneo = document.getElementById("boton_tabla_torneo");
mostrar_tabla_torneo.addEventListener("click", intercalar_tabla_B);

var tabla_liga = document.getElementById("TablaLigaAguila");
var tabla_torneo = document.getElementById("TablaTorneoAguila");

tabla_liga.style.display = "none";
tabla_torneo.style.display = "none";

function intercalar_tabla_A()
{
    tabla_torneo.style.display = "none";
    tabla_liga.style.display = "block";
}

function intercalar_tabla_B()
{
    tabla_torneo.style.display = "block";
    tabla_liga.style.display = "none";
}

var equipos_A = datosEquipos.filter(function(equipo){
    return equipo.categoria == "A";
});

var equipos_B = datosEquipos.filter(function(equipo){
    return equipo.categoria == "B";
});

var equiposAPosicionados = equipos_A.sort(function(a,b){return a.diferencia()-b.diferencia();});
var equiposAPosicionados2 = equiposAPosicionados.sort(function(a,b){return a.puntos-b.puntos;});
equiposAPosicionados2 = equiposAPosicionados2.reverse();

var equiposBPosicionados = equipos_B.sort(function(a,b){return a.diferencia()-b.diferencia();});
var equiposBPosicionados2 = equiposBPosicionados.sort(function(a,b){return a.puntos-b.puntos;});
equiposBPosicionados2 = equiposBPosicionados2.reverse();


var escrituraTablaA = "";
var escrituraTablaB = "";
var tablaA = document.getElementById("cont_tabla_liga");
var tablaB = document.getElementById("cont_tabla_torneo");

equiposAPosicionados2.forEach(function(equipo, indice){
    indice++;
    escrituraTablaA += "<tr>" + 
                        "<th>" + indice + "</th>" +
                        "<td>" + equipo.nombre + "</td>" +
                        "<td>" + equipo.jugados + "</td>" +
                        "<td>" + equipo.ganados + "</td>" +
                        "<td>" + equipo.empatados + "</td>" +
                        "<td>" + equipo.perdidos + "</td>" +
                        "<td>" + equipo.favor + "</td>" +
                        "<td>" + equipo.contra + "</td>" +
                        "<td>" + equipo.diferencia() + "</td>" +
                        "<td>" + equipo.puntos + "</td>" +
                     "</tr>";
});

tablaA.innerHTML = escrituraTablaA;

equiposBPosicionados2.forEach(function(equipo, indice){
    indice++;
    escrituraTablaB += "<tr>" + 
                        "<th>" + indice + "</th>" +
                        "<td>" + equipo.nombre + "</td>" +
                        "<td>" + equipo.jugados + "</td>" +
                        "<td>" + equipo.ganados + "</td>" +
                        "<td>" + equipo.empatados + "</td>" +
                        "<td>" + equipo.perdidos + "</td>" +
                        "<td>" + equipo.favor + "</td>" +
                        "<td>" + equipo.contra + "</td>" +
                        "<td>" + equipo.diferencia() + "</td>" +
                        "<td>" + equipo.puntos + "</td>" +
                     "</tr>";
});

tablaB.innerHTML = escrituraTablaB;
var datosEquipos = [
    {
        nombre: "Atlético Nacional",
        categoria: "A",
        jugados: 6,
        ganados: 3,
        empatados: 2,
        perdidos: 1,
        favor: 9,
        contra: 5,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 11
    },
    {
        nombre: "América de Cali",
        categoria: "A",
        jugados: 6,
        ganados: 1,
        empatados: 2,
        perdidos: 3,
        favor: 1,
        contra: 5,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 5
    },
    {
        nombre: "Millonarios F.C.",
        categoria: "A",
        jugados: 6,
        ganados: 2,
        empatados: 3,
        perdidos: 1,
        favor: 7,
        contra: 4,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 9
    },
    {
        nombre: "Deportes Tolima",
        categoria: "A",
        jugados: 6,
        ganados: 4,
        empatados: 1,
        perdidos: 1,
        favor: 10,
        contra: 7,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 13
    },
    {
        nombre: "Club Independiente Santa Fé",
        categoria: "A",
        jugados: 6,
        ganados: 3,
        empatados: 2,
        perdidos: 1,
        favor: 9,
        contra: 5,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 11
    },
    {
        nombre: "Deportivo Independiente Medellín",
        categoria: "A",
        jugados: 6,
        ganados: 1,
        empatados: 4,
        perdidos: 1,
        favor: 5,
        contra: 3,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 7
    },
    {
        nombre: "Asociación Deportivo Pasto",
        categoria: "A",
        jugados: 6,
        ganados: 1,
        empatados: 1,
        perdidos: 4,
        favor: 2,
        contra: 7,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 4
    },
    {
        nombre: "Deportivo Cali",
        categoria: "A",
        jugados: 6,
        ganados: 2,
        empatados: 3,
        perdidos: 1,
        favor: 6,
        contra: 6,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 9
    },
    {
        nombre: "Alianza Petrolera",
        categoria: "A",
        jugados: 6,
        ganados: 3,
        empatados: 0,
        perdidos: 3,
        favor: 10,
        contra: 13,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 9
    },
    {
        nombre: "Boyacá Chicó F.C",
        categoria: "A",
        jugados: 6,
        ganados: 1,
        empatados: 2,
        perdidos: 3,
        favor: 6,
        contra: 10,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 5
    },
    {
        nombre: "Club Deportivo La Equidad",
        categoria: "A",
        jugados: 6,
        ganados: 6,
        empatados: 0,
        perdidos: 0,
        favor: 9,
        contra: 0,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 18
    },
    {
        nombre: "Atlético Huila",
        categoria: "A",
        jugados: 6,
        ganados: 0,
        empatados: 2,
        perdidos: 4,
        favor: 3,
        contra: 9,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 2
    },
    {
        nombre: "Itagüí Leones F.C",
        categoria: "A",
        jugados: 6,
        ganados: 0,
        empatados: 1,
        perdidos: 5,
        favor: 2,
        contra: 8,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 1
    },
    {
        nombre: "Rionegro Águilas Doradas",
        categoria: "A",
        jugados: 6,
        ganados: 3,
        empatados: 2,
        perdidos: 1,
        favor: 7,
        contra: 4,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 11
    },
    {
        nombre: "Envigado F.C",
        categoria: "A",
        jugados: 6,
        ganados: 0,
        empatados: 3,
        perdidos: 3,
        favor: 4,
        contra: 8,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 3
    },
    {
        nombre: "Club Atlético Bucaramanga",
        categoria: "A",
        jugados: 6,
        ganados: 1,
        empatados: 2,
        perdidos: 3,
        favor: 3,
        contra: 7,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 5
    },
    {
        nombre: "Patriotas Boyacá",
        categoria: "A",
        jugados: 6,
        ganados: 1,
        empatados: 3,
        perdidos: 2,
        favor: 6,
        contra: 5,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 6
    },
    {
        nombre: "Once Caldas",
        categoria: "A",
        jugados: 6,
        ganados: 5,
        empatados: 1,
        perdidos: 0,
        favor: 11,
        contra: 4,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 16
    },
    {
        nombre: "Jaguares de Córdoba",
        categoria: "A",
        jugados: 6,
        ganados: 1,
        empatados: 2,
        perdidos: 3,
        favor: 4,
        contra: 9,
        diferencia: function(){             
            return this.favor-this.contra;         
        },
        puntos: 5
    },
    {
        nombre: "Club Deportivo Popular Junior F.C",
        categoria: "A",
        jugados: 6,
        ganados: 4,
        empatados: 1,
        perdidos: 1,
        favor: 10,
        contra: 3,
        diferencia: function(){
            return this.favor-this.contra;
        },
        puntos: 13
    }
];
//var equiposPosicionados = datosEquipos.sort(function(a,b){return -a.favor+b.favor;});
var equiposPosicionados = datosEquipos.sort(function(a,b){return a.diferencia()-b.diferencia();});
var equiposPosicionados2 = equiposPosicionados.sort(function(a,b){return a.puntos-b.puntos;});
equiposPosicionados2 = equiposPosicionados2.reverse();

var escrituraTabla = "";
var tabla = document.getElementById("cont_tabla_liga");

equiposPosicionados2.forEach(function(equipo, indice){
    indice++;
    escrituraTabla += "<tr>" + 
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

tabla.innerHTML = escrituraTabla;
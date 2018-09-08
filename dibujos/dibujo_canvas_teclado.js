document.addEventListener("keydown", moverLobo);

var teclas = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  };

var can = document.getElementById("dibujo");
var papel = can.getContext("2d");

var mapa = {
    fuente: "imagenes/tile.png",
    cargado: false
};
mapa.imagen = new Image();
mapa.imagen.src = mapa.fuente;
mapa.imagen.addEventListener("load", cargaFondo);

var pollo = {
    fuente: "imagenes/pollo.png",
    cargado: false,
    ejeX: 0,
    ejeY: 0
};
pollo.imagen = new Image();
pollo.imagen.src = pollo.fuente;
pollo.imagen.addEventListener("load", cargaPollo);
pollo.ejeX = aleatorio(0, 435);
pollo.ejeY = aleatorio(0,435);

var lobo = {
    fuente: "imagenes/lobo.png",
    cargado: false,
    dinamico: false,
    ejeX: 225,
    ejeY: 450
};
lobo.imagen = new Image();
lobo.imagen.src = lobo.fuente;
lobo.imagen.addEventListener("load", cargaLobo);

var puntos = document.getElementById("puntos");
var puntaje = 0;
puntos.innerHTML = puntaje;

var intervaloTiempo = setInterval(reubicarPollo, 4000);

function cargaFondo()
{
    mapa.cargado = true;
    dibujarMapa();
}

function cargaPollo()
{
    pollo.cargado = true;

    dibujarMapa();
}

function cargaLobo()
{
    lobo.cargado = true;
    dibujarMapa(lobo.ejeX, lobo.ejeY);
}

function dibujarMapa(xLobo, yLobo)
{
    if(mapa.cargado)
    {
        papel.drawImage(mapa.imagen, 0, 0);

        if(pollo.cargado)
        {
            papel.drawImage(pollo.imagen, pollo.ejeX, pollo.ejeY);
        }
        if(lobo.cargado && !lobo.dinamico)
        {
            papel.drawImage(lobo.imagen, lobo.ejeX, lobo.ejeY);
        }
        else if(lobo.cargado && lobo.dinamico)
        {
            papel.drawImage(lobo.imagen, xLobo, yLobo);
        }
    }
}

function moverLobo(event)
{
    lobo.dinamico = true;
    switch(event.keyCode)
    {
        case teclas.LEFT:
            dibujarMapa(lobo.ejeX-5, lobo.ejeY);
            lobo.ejeX = lobo.ejeX-5;
            break;
        case teclas.UP:       
            dibujarMapa(lobo.ejeX, lobo.ejeY-5);
            lobo.ejeY = lobo.ejeY-5;
        break;
        case teclas.RIGHT:
            dibujarMapa(lobo.ejeX+5, lobo.ejeY);
            lobo.ejeX = lobo.ejeX+5;
        break;
        case teclas.DOWN:
            dibujarMapa(lobo.ejeX, lobo.ejeY+5);
            lobo.ejeY = lobo.ejeY+5;
        break;
    }

    comerPollo();
}

function comerPollo()
{
    if(Math.abs(lobo.ejeX - pollo.ejeX) < 35 && Math.abs(lobo.ejeY - pollo.ejeY) < 35)
    {
        reubicarPollo();
        puntaje = puntaje + 10;
        puntos.innerHTML = puntaje;
        if(puntaje == 150)
        {
            puntos.innerHTML = puntaje + " GANASTE!";
        }
        clearInterval(intervaloTiempo);
        intervaloTiempo = setInterval(reubicarPollo, 4000);
    }
}

function reubicarPollo()
{
    pollo.ejeX = aleatorio(0, 435);
    pollo.ejeY = aleatorio(0, 435);
    dibujarMapa(lobo.ejeX, lobo.ejeY);
}

function aleatorio(min, max)
{
    var resultado = Math.floor(Math.random()*(max-min)) + min;
    return resultado;
}
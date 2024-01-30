
var canvas = document.getElementById("canvas");// Obtiene el elemento canvas del documento con el id "canvas"
var ctx = canvas.getContext("2d");// Obtiene el contexto 2D del canvas, que se utilizará para dibujar en él
canvas.width = 1000;// Establece el ancho del canvas a 1000 píxeles
canvas.height = 900;// Establece la altura del canvas a 900 píxeles

var lives = 5; // Número de vidas del jugador
var score = 0; // Puntuación del jugador
var speed = 2; // Velocidad del juego
var okLeft = false; // Indicador de movimiento a la izquierda
var okRight = false; // Indicador de movimiento a la derecha
var stop = false; // Indicador de parada del juego

var line = new Image(); // Creación de un objeto Image para la línea en la carretera
line.src = "img/line.png"; // Ruta de la imagen de la línea
line.X = 180; // Posición inicial en el eje X
line.Y = -140; // Posición inicial en el eje Y

var myCar = new Image(); // Creación de un objeto Image para el coche del jugador
myCar.src = "img/myCar.png"; // Ruta de la imagen del coche del jugador
myCar.X = 500; // Posición inicial en el eje X
myCar.Y = 730; // Posición inicial en el eje Y

var enemyCars = []; // Arreglo para almacenar los coches enemigos

var targetWidth = 65; // Ancho del objetivo (coches enemigos)
var targetHeight = 10; // Altura del objetivo (coches enemigos)


for (var i = 0; i < 8; i++) {
    enemyCars[i] = new Image(); // Creación de un objeto Image para cada coche enemigo
    enemyCars[i].src = "img/enCar" + (i % 4 + 1) + ".png"; // Asignación de la ruta de la imagen del coche enemigo

    // Asignación de posiciones aleatorias para los coches enemigos en el eje X e Y
    enemyCars[i].X = Math.floor(Math.random() * (canvas.width / 8 - targetWidth)) + (i * canvas.width / 5);
    enemyCars[i].Y = -100 - Math.floor(Math.random() * 800);
}

function drawRect() {
    ctx.fillStyle = "Gray"; // Establece el color de relleno del lienzo
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Dibuja un rectángulo que cubre todo el lienzo
}

function drawLives() {
    ctx.font = "25px Sixtyfour"; // Establece el tamaño y tipo de fuente
    var padding = 5; // Espaciado para el cuadro de las vidas
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"; // Establece el color de fondo del cuadro de vidas con transparencia
    var textWidth = ctx.measureText("VIDAS: " + lives).width; // Calcula el ancho del texto
    // Dibuja un cuadro de fondo para las vidas
    ctx.fillRect(760 - padding, 70 - 40 - padding, textWidth + 2 * padding, 60 + 2 * padding);
    ctx.fillStyle = "White"; // Establece el color de texto a blanco
    ctx.fillText("VIDAS: " + lives, 760, 70); // Dibuja el texto de vidas en el lienzo
}


function drawScore() {
    ctx.font = "25px Sixtyfour"; // Establece el tamaño y tipo de fuente
    var padding = 5; // Espaciado para el cuadro del puntaje

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Establece el color de fondo del cuadro de puntaje con transparencia
    var scoreText = "PUNTAJE: " + score; // Texto que muestra el puntaje
    var textWidth = ctx.measureText(scoreText).width; // Calcula el ancho del texto
    // Dibuja un cuadro de fondo para el puntaje
    ctx.fillRect(20 - padding, 30 - padding, textWidth + 2 * padding, 60 + 2 * padding);
    ctx.fillStyle = "White"; // Establece el color de texto a blanco
    ctx.fillText(scoreText, 20, 70); // Dibuja el texto del puntaje en el lienzo
}

function increaseSpeed() {
    if (score > 0 && score % 300 === 0) { // Incrementa la velocidad cada vez que el puntaje es múltiplo de 300
        speed += 1; // Incrementa la velocidad
    }
}

function stopGame() {
    cancelAnimationFrame(myReq); // Cancela la animación del juego

    var gameOverImg = new Image(); // Crea un objeto de imagen para la pantalla de fin de juego
    gameOverImg.onload = function () {
        var x = (canvas.width - gameOverImg.width) / 2; // Calcula la posición x para centrar la imagen
        var y = (canvas.height - gameOverImg.height) / 2; // Calcula la posición y para centrar la imagen
        ctx.drawImage(gameOverImg, x, y); // Dibuja la imagen de fin de juego en el lienzo
    };

    gameOverImg.src = "img/gameover.png";  // Establece la ruta de la imagen de fin de juego

    stop = true; // Establece la variable de parada del juego como verdadera
}


var lines = [
    { X: 200, Y: -140 },
    { X: 200, Y: -620 },   
    { X: 400, Y: -140 },
    { X: 400, Y: -620 },
    { X: 600, Y: -140 },
    { X: 600, Y: -620 },
    { X: 800, Y: -140 },
    { X: 800, Y: -620 },
];

function drawLines() {
    for (var i = 0; i < lines.length; i++) {
        ctx.drawImage(line, lines[i].X, lines[i].Y); // Dibuja la línea en la posición actual
        lines[i].Y += 5; // Mueve la línea hacia abajo (simulando movimiento hacia arriba)
        if (lines[i].Y > canvas.height) {
            lines[i].Y = -140; // Reinicia la posición de la línea cuando llega al final del lienzo
        }
    }
    if (!stop) {
        score += 1; // Incrementa el puntaje
        increaseSpeed(); // Incrementa la velocidad del juego si se cumple una condición
    }

    drawScore(); // Dibuja el puntaje en el lienzo
}

function stopGame() {
    cancelAnimationFrame(myReq); // Cancela la animación del juego

    var gameOverImg = new Image(); // Crea un objeto de imagen para la pantalla de fin de juego
    gameOverImg.onload = function () {
        var x = (canvas.width - gameOverImg.width) / 2; // Calcula la posición x para centrar la imagen
        var y = (canvas.height - gameOverImg.height) / 2; // Calcula la posición y para centrar la imagen
        ctx.drawImage(gameOverImg, x, y); // Dibuja la imagen de fin de juego en el lienzo
    };

    gameOverImg.src = "img/gameover.png";  // Establece la ruta de la imagen de fin de juego

    stop = true; // Establece la variable de parada del juego como verdadera
}

function drawMyCar() {
    if ((okLeft === true && myCar.X > 0) || (okRight === true && myCar.X < 920)) {
        if (okLeft) {
            myCar.X -= 5 + Math.floor(score / 600); // Mueve el coche a la izquierda
            ctx.save();
            ctx.translate(myCar.X + myCar.width / 2, myCar.Y + myCar.height / 2);
            ctx.rotate(-0.2); // Rota el coche ligeramente hacia la izquierda
            ctx.drawImage(myCar, -myCar.width / 2, -myCar.height / 2, myCar.width, myCar.height);
            ctx.restore();
        } else if (okRight) {
            myCar.X += 5 + Math.floor(score / 600); // Mueve el coche a la derecha
            ctx.save();
            ctx.translate(myCar.X + myCar.width / 2, myCar.Y + myCar.height / 2);
            ctx.rotate(0.2); // Rota el coche ligeramente hacia la derecha
            ctx.drawImage(myCar, -myCar.width / 2, -myCar.height / 2, myCar.width, myCar.height);
            ctx.restore();
        }
    } else {
        ctx.drawImage(myCar, myCar.X, myCar.Y);
    }
}

function drawEnemyCars() {
    for (var i = 0; i < enemyCars.length; i++) {
        if (enemyCars[i].Y + 100 > myCar.Y && enemyCars[i].X + 65 > myCar.X && enemyCars[i].X < myCar.X + 65) {
            crash = true; // Indicador de colisión
            enemyCars[i].Y = -100 - Math.floor(Math.random() * 800); // Reinicia la posición del coche enemigo
            enemyCars[i].X = Math.floor(Math.random() * (canvas.width / 5 - 65)) + (i * canvas.width / 5);
            lives--; // Reduce las vidas del jugador
            if (lives < 1) {
                stopGame(); // Si las vidas son menores que 1, detiene el juego
            }
        } else {
            crash = false; // No hay colisión
        }

        if (!crash) {
            ctx.drawImage(enemyCars[i], enemyCars[i].X, enemyCars[i].Y);
            enemyCars[i].Y += speed; // Mueve el coche enemigo hacia abajo
            if (enemyCars[i].Y > canvas.height) {
                enemyCars[i].Y = -100 - Math.floor(Math.random() * 800); // Reinicia la posición del coche enemigo
                enemyCars[i].X = Math.floor(Math.random() * (canvas.width / 5 - 65)) + (i * canvas.width / 5);
            }
        }
    }
}


function render() {
    if (stop) {
        return; // Si el juego está detenido, sale de la función de renderizado
    }
    drawRect(); // Dibuja el fondo del juego
    drawLines(); // Dibuja las líneas en la carretera
    drawMyCar(); // Dibuja el coche del jugador
    drawEnemyCars(); // Dibuja los coches enemigos
    drawLives(); // Dibuja el contador de vidas
    drawScore(); // Dibuja el contador de puntaje
    myReq = requestAnimationFrame(render); // Solicita la siguiente animación de fotogramas
}

render(); // Inicia el bucle de renderizado

addEventListener("keydown", function(event) {
    var newDirect = event.keyCode;
    if (newDirect === 37) {
        okLeft = true; // Activa el indicador de movimiento a la izquierda al presionar la tecla de flecha izquierda
    }
    if (newDirect === 39) {
        okRight = true; // Activa el indicador de movimiento a la derecha al presionar la tecla de flecha derecha
    }
});

addEventListener("keyup", function(event) {
    var newDirect = event.keyCode;
    if (newDirect === 37) {
        okLeft = false; // Desactiva el indicador de movimiento a la izquierda al soltar la tecla de flecha izquierda
    }
    if (newDirect === 39) {
        okRight = false; // Desactiva el indicador de movimiento a la derecha al soltar la tecla de flecha derecha
    }
});


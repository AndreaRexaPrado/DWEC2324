// Variables globales
var matriz = []; // Matriz que representa el tablero del juego
var tablero = document.getElementById("tablero"); // Elemento HTML que contiene el tablero
var numMinas = 0; // Número total de minas en el tablero
var numBanderas = 0; // Número total de banderas disponibles
var numBanderasAcertadas = 0; // Número de banderas colocadas correctamente
var contadorBanderasElemento = document.getElementById("contador-banderas"); // Elemento HTML que muestra el contador de banderas
var temporizadorElemento = document.getElementById("temporizador"); // Elemento HTML que muestra el temporizador
var tiempoTranscurrido = 0; // Tiempo transcurrido en segundos
var temporizador; // Referencia al temporizador

// Al cargar la ventana completamente, se ejecuta la función de inicio
window.onload = function() {
    iniciar(); // Inicia el juego
}

// Función de inicio del juego
function iniciar() {
    reiniciar(); // Reinicia el juego
    numBanderasAcertadas = 0; // Reinicia el contador de banderas acertadas
    var select = document.getElementById("selectMinas");
  
    select.addEventListener("change", function(){
      var selectedOption = this.options[this.selectedIndex];

      switch(selectedOption.value){
        case "op1":
            generarTablero(9,9);
            
            break;
        case "op2":
            generarTablero(16,16);
            break;
        case "op3":
            generarTablero(30,16);
            break;

      }

    });
    // Eventos de los botones del juego
    document.getElementById('solucion').addEventListener('click', revelarBombas); // Revela todas las minas en el tablero
    document.getElementById('nueva').addEventListener('click', iniciar); // Inicia un nuevo juego
    document.getElementById('reiniciar').addEventListener('click', reiniciar); // Reinicia el juego actual
}

// Función para reiniciar el juego
function reiniciar() {
    detenerTemporizador(); // Detiene el temporizador
    tiempoTranscurrido = 0; // Reinicia el tiempo transcurrido
    numMinas = 0; // Reinicia el número de minas
    // Obtiene el tamaño del tablero seleccionado
    var select = document.getElementById("selectMinas");
    var selectedOption = select.options[select.selectedIndex];
    switch (selectedOption.value) {
        case "op1":
            generarTablero(9, 9); // Genera un tablero de 9x9
            break;
        case "op2":
            generarTablero(16, 16); // Genera un tablero de 16x16
            break;
        case "op3":
            generarTablero(30, 16); // Genera un tablero de 30x16
            break;
    }
    iniciarTemporizador(); // Inicia el temporizador
   
}

// Función para habilitar los botones del tablero
function habilitarBotones() {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            const celda = document.getElementById(i + "-" + j);
            celda.disabled = false; // Habilita el botón
        }
    }
}

// Función para generar el tablero de juego
function generarTablero(ancho, alto) {
    matriz = []; // Reinicia la matriz
    dibujarTableroHTML(ancho, alto); // Dibuja el tablero en HTML
    numMinas = calcularNumMinas(ancho, alto); // Calcula el número de minas
    colocarMinasMatriz(ancho, alto); // Coloca las minas en la matriz
    calcularNumerosAlrededor(); // Calcula los números alrededor de las minas
    colocarBombasTableroJS(); // Coloca las bombas en el tablero HTML
    numBanderas = numMinas; // Reinicia el número de banderas
    actualizarContadorBanderas();
    numBanderasAcertadas = 0; // Reinicia el número de banderas acertadas
    detenerTemporizador(); // Detiene el temporizador
    tiempoTranscurrido = 0; // Reinicia el tiempo transcurrido
    actualizarTemporizador(); // Actualiza el temporizador en el HTML
    habilitarBotones(); // Habilita los botones del tablero
}

// Función para iniciar el temporizador
function iniciarTemporizador() {
    temporizador = setInterval(function() {
        tiempoTranscurrido++; // Incrementa el tiempo transcurrido
        actualizarTemporizador(); // Actualiza el temporizador en el HTML
    }, 1000); // Intervalo de 1 segundo
}

// Función para actualizar el contador de banderas en el HTML
function actualizarContadorBanderas() {
    contadorBanderasElemento.innerText = "Banderas: " + numBanderas;
}

// Función para actualizar el temporizador en el HTML
function actualizarTemporizador() {
    temporizadorElemento.innerText = "Tiempo: " + tiempoTranscurrido + "s";
}

// Función para detener el temporizador
function detenerTemporizador() {
    clearInterval(temporizador); // Limpia el intervalo del temporizador
}

// Función para dibujar el tablero de juego en HTML
function dibujarTableroHTML(ancho, alto) {
    // Elimina el tablero anterior si existe
    if (tablero && tablero.childNodes.length > 0) {
        tablero.removeChild(tablero.childNodes[0]);
    }

    let tabla = document.createElement("table"); // Crea un elemento tabla

    // Crea las filas y celdas del tablero
    for (let i = 0; i < alto; i++) {
        let row = tabla.insertRow(i)
        matriz[i] = new Array(ancho);

        for (let j = 0; j < ancho; j++) {
            let celda = row.insertCell(j);
            let button = document.createElement("button"); // Crea un botón
            button.id = i + "-" + j; // Asigna un ID único al botón
            button.innerHTML = ""; // Contenido inicialmente vacío
            button.classList.add("celda-tapada"); // Agrega la clase CSS para ocultar la celda

            // Agrega eventos al botón (clic izquierdo y clic derecho)
            button.addEventListener("click", function click() {
                clicIzqCelda(i, j); // Función al hacer clic izquierdo
            });
            button.addEventListener("contextmenu", function(event) {
                clicDchCelda(event, i, j); // Función al hacer clic derecho
            });
            button.disabled = true; // Deshabilita el botón inicialmente
            celda.appendChild(button); // Agrega el botón a la celda
            matriz[i][j] = 0; // Inicializa la matriz con ceros
        }
    }
    tablero.appendChild(tabla); // Agrega la tabla al tablero
}
// Función para calcular el número de minas según el tamaño del tablero
function calcularNumMinas(x, y) {
    var prob = 0; // Probabilidad inicial de minas
    switch (x) {
        case 9:
            prob = 0.15; // Probabilidad de minas para un tablero de 9x9
            break
        case 16:
            prob = 0.25; // Probabilidad de minas para un tablero de 16x16
            break
        case 30:
            prob = 0.3; // Probabilidad de minas para un tablero de 30x16
            break
    }
    return Math.floor((x * y) * prob); // Retorna el número total de minas
}
  
// Función para colocar las minas en la matriz
function colocarMinasMatriz(x, y,cont=0) {
    var numMinasFila = 0;
    switch (x) {
        case 9:
            numMinasFila = 1; // Probabilidad de minas para un tablero de 9x9
            break
        case 16:
            numMinasFila = 4; // Probabilidad de minas para un tablero de 16x16
            break
        case 30:
             numMinasFila = 6; // Probabilidad de minas para un tablero de 30x16
            break
    }
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            if (matriz[i][j] !== 'M' && Math.floor(Math.random() * y) + 1 <= numMinasFila && cont < numMinas) { // Verifica que no se hayan colocado todas las minas
                if(cont == numMinas){
                    break;
                }
                matriz[i][j] = 'M'; // Coloca una mina en la posición i, j
                cont++; // Incrementa el contador de minas
                
            }
        }
    }
    // Si no se han colocado todas las minas, llamar recursivamente a la función
    if (cont < numMinas) {
        colocarMinasMatriz(x, y,cont);
    }
}
  

// Función para colocar las bombas en el tablero HTML
function colocarBombasTableroJS() {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            const celda = document.getElementById(i + "-" + j); // Obtiene el botón correspondiente a la celda
            if (matriz[i][j] !== 'M') { // Si no es una mina
                celda.innerText = matriz[i][j]; // Muestra el número de minas adyacentes en el botón
            }else{
                    celda.innerText = 'M';
            }
        }
    }
}
// Función para calcular los números alrededor de las minas
function calcularNumerosAlrededor() {
    // Recorre cada celda de la matriz
    for (let fila = 0; fila < matriz.length; fila++) {
        for (let columna = 0; columna < matriz[0].length; columna++) {
            // Si la celda contiene una mina
            if (matriz[fila][columna] === 'M') {
                // Define las posiciones adyacentes
                const adyacentes = [
                    { x: fila - 1, y: columna }, // Arriba
                    { x: fila + 1, y: columna }, // Abajo
                    { x: fila, y: columna - 1 }, // Izquierda
                    { x: fila, y: columna + 1 }, // Derecha
                    { x: fila - 1, y: columna - 1 }, // Esquina superior izquierda
                    { x: fila - 1, y: columna + 1 }, // Esquina superior derecha
                    { x: fila + 1, y: columna - 1 }, // Esquina inferior izquierda
                    { x: fila + 1, y: columna + 1 } // Esquina inferior derecha
                ];
                // Incrementa los números alrededor de la mina
                for (const pos of adyacentes) {
                    const x = pos.x;
                    const y = pos.y;
                    incrementarNumerosAlrededor(x, y);
                }
            }
        }
    }
}

// Función para incrementar los números alrededor de una mina
function incrementarNumerosAlrededor(fila, columna) {
     const filas = matriz.length;
    const columnas = matriz[0].length;
    // Verifica que la posición esté dentro de los límites de la matriz
    if (fila >= 0 && fila < filas && columna >= 0 && columna < columnas) {
        // Si no hay una mina en esa posición
        if (matriz[fila][columna] !== 'M') {
            // Incrementa el número en esa posición
            matriz[fila][columna]++;
        }
    }
}

// Función que se ejecuta al hacer clic izquierdo en una celda
function clicIzqCelda(fila, columna) {
    const celda = document.getElementById(fila + "-" + columna); // Obtiene la celda correspondiente al clic
    // Verifica si la celda contiene una mina
    if (matriz[fila][columna] === 'M') {
        revelarBombas(); // Revela todas las minas
        Swal.fire({
            title: "¡Has perdido!",
            html: '<img src="https://emojicdn.elk.sh/💣" class="game-image">¡Has perdido!<p></p>',
            confirmButtonText: 'Volver a jugar',
            customClass: {
                header: 'swal2-header',
                title: 'swal2-title',
                content: 'swal2-content',
                confirmButton: 'swal2-confirm error'
            }
        }).then(() => {    
            location.reload();
        });
        //alert("¡Has perdido!"); // Muestra un mensaje de pérdida
    } else {
        celda.classList.remove("celda-tapada"); // Destapa la celda
        if (matriz[fila][columna] >= 0) {
            destaparCeldasAdyacentes(fila, columna); // Destapa las celdas adyacentes si el número es mayor o igual a cero
        }
    }
}

// Función que se ejecuta al hacer clic derecho en una celda
function clicDchCelda(event, fila, columna) {
    event.preventDefault(); // Evita que se abra el menú contextual del navegador
    const celda = document.getElementById(fila + "-" + columna); // Obtiene la celda correspondiente al clic
    // Verifica si la celda está tapada y no tiene una bandera
    if (celda.classList.contains("celda-tapada") && !celda.classList.contains("bandera")) {
      celda.classList.add("bandera"); // Agrega una bandera a la celda
      celda.disabled=true;
      numBanderas--; // Reduce el número de banderas disponibles
      actualizarContadorBanderas(); // Actualiza el contador de banderas
        // Verifica si la celda contiene una mina y si se ha acertado todas las minas
        if (matriz[fila][columna] === 'M') {
            numBanderasAcertadas++; // Incrementa el número de banderas acertadas
            if (numBanderasAcertadas === numMinas) { // Si todas las minas están acertadas
                    detenerTemporizador(); // Detiene el temporizador
                    Swal.fire({
                        title: '¡Felicidades!',
                        html: '<img src="https://emojicdn.elk.sh/🎉" class="game-image"> <p>¡Has ganado!</p>',
                        confirmButtonText: 'Volver a jugar',
                        customClass: {
                            header: 'swal2-header',
                            title: 'swal2-title',
                            content: 'swal2-content',
                            confirmButton: 'swal2-confirm success'
                        }
                    }).then(() => {
                       
                        location.reload(); 
                    });
            }
        }
    } else if (celda.classList.contains("bandera")) {
        celda.classList.remove("bandera"); // Elimina la bandera de la celda
        celda.disabled=false;
        numBanderas++; // Incrementa el número de banderas disponibles
        if (matriz[fila][columna] === 'M') {
            numBanderasAcertadas--; // Reduce el número de banderas acertadas si se retira una bandera de una mina
        }
        actualizarContadorBanderas(); // Actualiza el contador de banderas
    }
}

// Función para destapar celdas adyacentes recursivamente
function destaparCeldasAdyacentes(fila, columna) {
    // Definir las coordenadas de las celdas adyacentes
    const adyacentes = [
        { x: fila - 1, y: columna }, // Arriba
        { x: fila + 1, y: columna }, // Abajo
        { x: fila, y: columna - 1 }, // Izquierda
        { x: fila, y: columna + 1 }, // Derecha
        { x: fila - 1, y: columna - 1 }, // Esquina superior izquierda
        { x: fila - 1, y: columna + 1 }, // Esquina superior derecha
        { x: fila + 1, y: columna - 1 }, // Esquina inferior izquierda
        { x: fila + 1, y: columna + 1 } // Esquina inferior derecha
    ];

    // Recorre las celdas adyacentes
    for (const pos of adyacentes) {
        const x = pos.x;
        const y = pos.y;

      // Verifica si la celda adyacente está dentro de los límites del tablero
            if (x >= 0 && x < matriz.length && y >= 0 && y < matriz[0].length) {
            const celdaAdyacente = document.getElementById(x + "-" + y);

            // Verifica si la celda adyacente está tapada
            if (celdaAdyacente.classList.contains("celda-tapada") || celdaAdyacente.classList.contains("bandera")) {
                // Si la celda adyacente tiene una mina, detiene la propagación
                if (matriz[x][y] === 'M') {
                    return;
                }

                // Destapa la celda adyacente y llama a la función recursivamente para destapar las celdas adyacentes a esta
                celdaAdyacente.classList.remove("celda-tapada");
                destaparCeldasAdyacentes(x, y);
            }
        }
    }
}

// Función para revelar todas las minas en el tablero
function revelarBombas() {
    // Recorre todas las celdas del tablero
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            const celda = document.getElementById(i + "-" + j);
            celda.disabled = true; // Deshabilita el botón de la celda
            if (matriz[i][j] === 'M') { // Si la celda contiene una mina
                celda.classList.remove("celda-tapada"); // Revela la mina
                celda.classList.add("mina-oculta"); // Agrega una clase para resaltar la mina
            }
        }
    }
    detenerTemporizador(); // Detiene el temporizador
}
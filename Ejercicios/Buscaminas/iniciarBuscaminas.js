var matriz=[];
//let matrizAux2=[];
var ancho = 0;
var tablero = document.getElementById("tablero");
var numMinas=0
var numBanderas=0
var numBanderasAcertadas=0

window.onload=(()=>{


  numMinas=calcularNumMinas(9,9);
  
  dibujarTableroHTML(9,9);
  colocarMinasMatriz(9,9);
  calcularNumerosAlrededor();
  colocarBombasTableroJS();

  var select = document.getElementById("selectMinas");
 
  select.addEventListener("change", function(){
    var selectedOption = this.options[this.selectedIndex];

    switch(selectedOption.value){
      case "op1":
          dibujarTableroHTML(9,9);
          numMinas=calcularNumMinas(9,9);  
          colocarMinasMatriz(9,9);
          calcularNumerosAlrededor();
          ancho = 9;
          colocarBombasTableroJS();
          console.log(numMinas);

          break;
      case "op2":
          dibujarTableroHTML(16,16);
          numMinas=calcularNumMinas(16,16); 
          colocarMinasMatriz(16,16);
          calcularNumerosAlrededor();
          ancho = 16;
          colocarBombasTableroJS();
          
          break;
      case "op3":
          dibujarTableroHTML(30,16);
          numMinas=calcularNumMinas(30,16);  
          colocarMinasMatriz(30,16);
          calcularNumerosAlrededor();
          ancho = 30;
          colocarBombasTableroJS();
          
          break;

    }
  });

  document.getElementById('solucion').addEventListener('click',revelarBombas);
});


function dibujarTableroHTML(ancho,alto){
    if (tablero && tablero.childNodes.length > 0) {
        tablero.removeChild(tablero.childNodes[0]);
    }

    let tabla = document.createElement("table");
    for(let i=0;i< alto;i++) {
        let row = tabla.insertRow(i)
        matriz[i]= new Array(ancho);


        for(let j=0;j< ancho;j++) {
            let celda = row.insertCell(j);
            let button = document.createElement("button");
            button.id = i + "" + j;
            button.innerHTML = ""; // Contenido inicialmente vacío
            button.classList.add("celda-tapada"); 


            button.addEventListener("click", function click() {
              clicIzqCelda(i, j);
            });
            button.addEventListener("contextmenu", function(event) {
              clicDchCelda(event, i, j);
            });
            celda.appendChild(button);
            matriz[i][j]=0;

        }
        
    }

    tablero.appendChild(tabla);
}


function calcularNumMinas(x,y){
    return Math.floor((x*y)*0.2);
}

function colocarMinasMatriz(x,y){
    let probabilidadM = 0.3;
    let cont = 0;
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            if (Math.random() < probabilidadM) {
                matriz[i][j] = 'M';
                cont++;
            }
            if(cont == numMinas){
                break;
            }
        }
    }
}
function colocarBombasTableroJS() {
  
  for (let i = 0; i < matriz.length; i++) {
      //matrizAux2[i]= new Array(matriz[0].length);
      for (let j = 0; j < matriz[0].length; j++) {
          
          const celda = document.getElementById(i + "" + j);
          
          if (matriz[i][j] !== 'M') {
            celda.innerText = matriz[i][j];                  
          } 
         // matrizAux2[i][j]= celda;
      }
  }
/*console.log("MatrizAux2");
console.log(matrizAux2);*/
}

function calcularNumerosAlrededor() {


  // Recorre las celdas adyacentes

    for (let fila = 0; fila < matriz.length; fila++) {
      for (let columna = 0; columna < matriz[0].length; columna++) {
        if (matriz[fila][columna] === 'M') {
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
          // Si hay una mina, incrementa los números alrededor
          for (const pos of adyacentes) {

            const x = pos.x;
            const y = pos.y;
            incrementarNumerosAlrededor(x,y);
          } 

        }
      }
    }
  }
  
  function incrementarNumerosAlrededor(fila, columna) {
    const filas = matriz.length;
    const columnas = matriz[0].length;

    //La posición esté dentro de los límites de la matriz
    if (fila >= 0 && fila < filas && columna >= 0 && columna < columnas) {
      
      if (matriz[fila][columna] !== 'M') {
        // Incrementa el número si no hay una mina en esa posición
        matriz[fila][columna]++;
      }
    }
  }

  function clicIzqCelda(fila, columna) {
    const celda = document.getElementById(fila + "" + columna);

    // Verifica si la celda contiene una mina
    if (matriz[fila][columna] === 'M') {
        // Si la celda contiene una mina, el jugador pierde
        revelarBombas();
        
        alert("¡Has perdido!");
    } else {
        // Si la celda no contiene una mina, destapa la celda y verifica si hay celdas adyacentes que también se deben destapar
        celda.classList.remove("celda-tapada");
        if (matriz[fila][columna] >= 0) {
            destaparCeldasAdyacentes(fila, columna);
        }
    }
  }

  function clicDchCelda(event, fila, columna) {
    event.preventDefault(); // Evita que se abra el menú contextual del navegador al hacer clic derecho

    const celda = document.getElementById(fila + "" + columna);

    // Verifica si la celda está tapada y no tiene una bandera
    if (celda.classList.contains("celda-tapada") && !celda.classList.contains("bandera")) {
        // Agrega una clase para mostrar una bandera en la celda
        celda.classList.add("bandera");
        numBanderas++;
        if(celda.innerText==""){
          numBanderasAcertadas++;
          if(numBanderasAcertadas === numMinas){
            alet("Has ganado!!");
          }
                  
        }
    } else if (celda.classList.contains("bandera")) {
        // Si la celda ya tiene una bandera, quita la bandera al hacer clic derecho nuevamente
        celda.classList.remove("bandera");
    }
  }
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
            const celdaAdyacente = document.getElementById(x + "" + y);

            // Verifica si la celda adyacente está tapada
            if (celdaAdyacente.classList.contains("celda-tapada")||celdaAdyacente.classList.contains("bandera")) {
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
function revelarBombas(){
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[0].length; j++) {
        const celda = document.getElementById(i + "" + j);
 
        if (matriz[i][j] === 'M') {
            celda.classList.remove("celda-tapada");
            celda.classList.add("mina-oculta"); // Puedes añadir una clase para mostrar las minas si lo deseas
        }
    }
  }
}
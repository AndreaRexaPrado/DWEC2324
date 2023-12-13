function dibujarTableroHTML(ancho,alto){
    let tablero="<table>";
 
    for(let i=0;i< alto;i++) {
        tablero+="<tr>"
        for(let j=0;j< ancho;j++) {
            tablero+="<td id='"+i+j+"'><button id='"+i+j+"'></button</td>"
        }
        tablero+="</tr>"
    }
    tablero+="</table>";
    return tablero;
}
var select = document.getElementById("selectMinas");
 
select.addEventListener("change", function(){
  var selectedOption = this.options[this.selectedIndex];

  switch(selectedOption.value){
    case "op1":
        document.getElementById("tablero").innerHTML= dibujarTableroHTML(9,9);
        break;
    case "op2":
        document.getElementById("tablero").innerHTML= dibujarTableroHTML(9,9);
        break;
    case "op3":
        document.getElementById("tablero").innerHTML= dibujarTableroHTML(16,16);
        break;
    case "op4":
        document.getElementById("tablero").innerHTML= dibujarTableroHTML(16,16);
        break;
    case "op5":
        document.getElementById("tablero").innerHTML= dibujarTableroHTML(30,16);
        break;
    case "op6":
        document.getElementById("tablero").innerHTML= dibujarTableroHTML(30,16);
        break;
    case "person":
        let ancho = prompt("Dame el ancho: ");
        let alto = prompt("Dame el alto: ");
        document.getElementById("tablero").innerHTML= dibujarTableroHTML(ancho,alto);
        break;
  }
});
document.getElementById("tablero").innerHTML= dibujarTableroHTML(9,9);

//console.log(dibujarTableroHTML(9,9));


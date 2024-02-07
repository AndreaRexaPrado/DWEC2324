
window.onload = inicio;

function inicio(){
    let cont = 0;
    document.getElementById("caract").innerHTML=cont;
    //Boton ir a google
    document.getElementById("google").addEventListener("click",()=>{
        location.href ="https://www.google.com/?hl=es"
    });
    //Funcion añadir curso
    document.getElementById("curso").addEventListener("change",(e)=>{

     
        var selectedOption = e.target.options[e.target.selectedIndex];
        if(selectedOption.value =="aniadir"){
            
            var newEleText =prompt("Dame el nuevo curso: ");
            var newElem = document.createElement("option");
            
            newElem.value = newEleText;
            newElem.text = newEleText;
            e.target.insertBefore(newElem,selectedOption);
            e.target.selectedIndex=0;
        }
    });

    //Select todos
    document.getElementById("all").addEventListener("click",()=>{
        let dias = document.getElementsByName("dia");
        for (let dia of dias){
            dia.checked=true;
        }
    });


    //Contador caracteres mensajes
    /*document.getElementById("mensaje").addEventListener("input",(e)=>{
        console.log(e.key)
        if(e.key !== 'Backspace'){
            cont++;
            document.getElementById("caract").innerHTML=cont;
        }
    });*/

    document.getElementById("mensaje").addEventListener("keydown",(e)=>{
        if (cont === 0 && e.inputType === 'deleteContentBackward') {
            return; 
        }
    
        if (e.inputType === 'deleteContentBackward') {
            cont--;
        } else {
            cont = e.target.value.length ;
        }
    
        document.getElementById("caract").innerHTML = cont;
    });
}
//Solo una imagen y en local
/*function cambiarFondo(){
    let papelera = document.getElementsByClassName('trash')[0];
    papelera.style.backgroundImage="none";
    alert('La papelera se ha vaciado');
}*/
//Dos imagenes y fuera de local
/*function cambiarFondo(){
    let papelera = document.getElementsByClassName('trash')[0];
    papelera.style.backgroundImage="url('https://ih1.redbubble.net/image.4537843265.3193/fposter,small,wall_texture,product,750x1000.u2.jpg')";
    alert('La papelera se ha vaciado');
}*/
//Con querrySelector
/*function cambiarFondo(){
    let papelera = document.querySelector('.trash');
    papelera.style.backgroundImage="none";
    alert('La papelera se ha vaciado');
}*/
//con event
let papelera = document.querySelector('.trash');
papelera.addEventListener('click',function(){
    papelera.style.backgroundImage="none";
    window.setTimeout(()=>{alert('La papelera se ha vaciado event')},1000);
})
document.oncontextmenu = function() {
    return false;
};

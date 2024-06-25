function autoExpand(element) {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight);
    var counter = document.getElementById("counter");
    var limitemsg = document.getElementById("aviso-limite-msg");
    if (element.value.length > 600) {
        counter.style.color = "red";
        counter.innerHTML = element.value.length + "/600";
        document.getElementById("enviar").disabled = true;
        limitemsg.style.display = "block";
    } else {
        counter.style.color = "black";
        counter.innerHTML = element.value.length + "/600";
        document.getElementById("enviar").disabled = false;
        limitemsg.style.display = "none";
    }
};

// Obtener el elemento de texto
const textoElemento = document.getElementById("tu-elemento-de-texto");

// Agregar el evento input al elemento de texto
textoElemento.addEventListener("input", function() {
    autoExpand(this);
});

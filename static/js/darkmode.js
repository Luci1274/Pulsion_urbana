const palanca = document.querySelector(".switch");
const luna = document.querySelector(".luna");
const circulo = document.querySelector(".circulo");

// Función reutilizable
function toggleDarkMode() {
    document.body.classList.toggle("dark_mode");
    if (circulo) circulo.classList.toggle("prendido");
}

// Eventos con validación
if (palanca) {
    palanca.addEventListener("click", toggleDarkMode);
}

if (luna) {
    luna.addEventListener("click", toggleDarkMode);
}
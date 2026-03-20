const flechaCerrar = document.getElementById("flecha_cerrar");
const barraLateral = document.querySelector(".barra_lateral");
const spans = document.querySelectorAll("span");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");

// Validación para evitar errores si falta algo en el HTML
if (menu && barraLateral && main) {

    menu.addEventListener("click", () => {
        barraLateral.classList.toggle("max-barra-lateral");

        if (barraLateral.classList.contains("max-barra-lateral")) {
            menu.children[0].style.display = "none";
            menu.children[1].style.display = "block";
        } else {
            menu.children[0].style.display = "block";
            menu.children[1].style.display = "none";
        }

        if (window.innerWidth <= 320) {
            barraLateral.classList.add("mini_barra_lateral");
            main.classList.add("min_main");

            spans.forEach((span) => {
                span.classList.add("oculto");
            });
        }
    });
}

// Flecha cerrar
if (flechaCerrar && barraLateral && main) {
    flechaCerrar.addEventListener("click", () => {
        barraLateral.classList.toggle("mini_barra_lateral");
        main.classList.toggle("min_main");

        spans.forEach((span) => {
            span.classList.toggle("oculto");
        });
    });
}
const flechaCerrar = document.getElementById("flecha_cerrar");
const barraLateral = document.querySelector(".barra_lateral");
const spans = document.querySelectorAll("span");
const palanca = document.querySelector(".switch"); // Cambiado a clase
const luna = document.querySelector(".luna");      // Cambiado a clase
const circulo = document.querySelector(".circulo")
const menu = document.querySelector(".menu");
const main = document.querySelector("main");
(function(){
  const track = document.getElementById('track');
  const slides = Array.from(track.children);
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const dotsWrap = document.getElementById('dots');

menu.addEventListener("click",()=>{
    barraLateral.classList.toggle("max-barra-lateral")
    if(barraLateral.classList.contains("max-barra-lateral")){
        menu.children[0].style.display = "none";
        menu.children[1].style.display = "block";
    }
    else{
        menu.children[0].style.display = "block";
        menu.children[1].style.display = "none";
    }
    if(window.innerWidth<=320){
        barraLateral.classList.add("mini_barra_lateral");
        main.classList.add("min_main");
        spans.forEach((span)=>{
            span.classList.add("oculto");
        })
    }
})

palanca.addEventListener("click", () => {
    document.body.classList.toggle("dark_mode");
    circulo.classList.toggle("prendido");
});

luna.addEventListener("click", () => {
    document.body.classList.toggle("dark_mode");
    circulo.classList.toggle("prendido");
});

// Escucha el click en la flecha
flechaCerrar.addEventListener("click", () => {
    barraLateral.classList.toggle("mini_barra_lateral");
    main.classList.toggle("min_main");
    spans.forEach((span) => {
        span.classList.toggle("oculto"); // Corregido
    });
});

  let index = 0;
  const total = slides.length;
  const autoplayDelay = 3500;
  let autoplayTimer = null;
  let isDragging = false;
  let startX = 0;

  // crear dots
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot';
    d.setAttribute('aria-label', 'Ir a la diapositiva ' + (i+1));
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.children);

  function update(){
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function prevSlide(){
    index = (index - 1 + total) % total;
    update();
  }
  function nextSlide(){
    index = (index + 1) % total;
    update();
  }
  function goTo(i){
    index = i;
    update();
  }

  prev.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
  next.addEventListener('click', () => { nextSlide(); resetAutoplay(); });

  // autoplay
  function startAutoplay(){
    autoplayTimer = setInterval(() => { nextSlide(); }, autoplayDelay);
  }
  function stopAutoplay(){
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
  function resetAutoplay(){
    stopAutoplay();
    startAutoplay();
  }

  // pausa al hover
  const carousel = document.getElementById('carousel');
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  // teclado
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowLeft') { prevSlide(); resetAutoplay(); }
    if (e.key === 'ArrowRight') { nextSlide(); resetAutoplay(); }
  });

  // touch / drag básico
  track.addEventListener('pointerdown', (e)=>{
    isDragging = true;
    startX = e.clientX;
    track.style.transition = 'none';
    track.setPointerCapture(e.pointerId);
    stopAutoplay();
  });
  track.addEventListener('pointermove', (e)=>{
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const perc = dx / carousel.clientWidth * 100;
    track.style.transform = `translateX(calc(-${index * 100}% + ${perc}%))`;
  });
  track.addEventListener('pointerup', (e)=>{
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) index = Math.min(index + 1, total - 1);
      else index = Math.max(index - 1, 0);
    }
    update();
    resetAutoplay();
  });

  // iniciar
  update();
  startAutoplay();
})();
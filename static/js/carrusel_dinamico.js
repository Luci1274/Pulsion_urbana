fetch('../static/fotos/carrusel.json')
  .then(res => res.json())
  .then(data => {
    // Buscamos todos los carruseles en la página
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(container => {
      const categoria = container.dataset.category; // "paisajes" o "ciudad"
      const track = container.querySelector('.track');
      const btnNext = container.querySelector('.next');
      const btnPrev = container.querySelector('.prev');
      
      // Filtramos las fotos que le corresponden a ESTE carrusel
      const fotosFiltradas = data.filter(item => item.categoria === categoria);

      // Renderizamos solo sus fotos
      fotosFiltradas.forEach(foto => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `
        <img src="../static/fotos/${foto.url}" alt="${foto.titulo}">
        <div class="informacion">
          <h3>${foto.titulo}</h3>
          <p>${foto.descripcion}</p>
        </div>
        `;
        track.appendChild(slide);
      });

      if (fotosFiltradas.length > 0) {
        // Lógica de movimiento (index local para cada carrusel)
        let currentIndex = 0;
        btnNext.onclick = () => {
          currentIndex = (currentIndex + 1) % fotosFiltradas.length;
          track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };
        // ... mismo para btnPrev
        btnPrev.onclick = () => {
          currentIndex = (currentIndex - 1 + fotosFiltradas.length) % fotosFiltradas.length;
          track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };
        // --- Lógica de Auto-play ---
        let interval;

        const startAutoPlay = () => {
            interval = setInterval(() => {
                // Simulamos un clic en el botón "Siguiente"
                btnNext.click();
            }, 3000); // 3000ms = 3 segundos
        };

        const stopAutoPlay = () => {
            clearInterval(interval);
        };

        // Iniciar el movimiento automático
        startAutoPlay();

        // Pausar cuando el mouse está encima y reanudar al salir
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
      } else {
    // Opcional: ocultar botones o mostrar mensaje de "No hay productos"
    container.style.display = 'none';}

    });
  });

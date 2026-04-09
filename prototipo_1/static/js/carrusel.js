document.querySelectorAll('.carousel').forEach((carousel) => {

    const track = carousel.querySelector('.track');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');
    const dotsWrap = carousel.querySelector('.dots');

    if (!track || !prev || !next || !dotsWrap) return;

    const slides = Array.from(track.children);

    let index = 0;
    const total = slides.length;
    const autoplayDelay = 3500;
    let autoplayTimer = null;
    let isDragging = false;
    let startX = 0;

    // dots
    slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'dot';
        d.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(d);
    });

    const dots = Array.from(dotsWrap.children);

    function update() {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function prevSlide() {
        index = (index - 1 + total) % total;
        update();
    }

    function nextSlide() {
        index = (index + 1) % total;
        update();
    }

    function goTo(i) {
        index = i;
        update();
    }

    prev.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    next.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    function startAutoplay() {
        autoplayTimer = setInterval(nextSlide, autoplayDelay);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // teclado SOLO si está activo este carrusel
    carousel.addEventListener('mouseenter', () => {
        document.onkeydown = (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        };
    });

    carousel.addEventListener('mouseleave', () => {
        document.onkeydown = null;
    });

    // drag
    track.addEventListener('pointerdown', (e) => {
        isDragging = true;
        startX = e.clientX;
        track.style.transition = 'none';
        track.setPointerCapture(e.pointerId);
        stopAutoplay();
    });

    track.addEventListener('pointermove', (e) => {
        if (!isDragging) return;

        const dx = e.clientX - startX;
        const perc = dx / carousel.clientWidth * 100;

        track.style.transform = `translateX(calc(-${index * 100}% + ${perc}%))`;
    });

    track.addEventListener('pointerup', (e) => {
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

    update();
    startAutoplay();

});
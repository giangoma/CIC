document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.dot');

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = dot.getAttribute('data-index');
            const slideWidth = window.innerWidth;
            track.style.transform = `translateX(-${index * slideWidth}px)`;

            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });

    // Optional: make the carousel resize properly
    window.addEventListener('resize', () => {
        const activeDot = document.querySelector('.dot.active');
        const index = activeDot.getAttribute('data-index');
        const slideWidth = window.innerWidth;
        track.style.transform = `translateX(-${index * slideWidth}px)`;
    });
});

document.addEventListener('mousemove', function(e) {
    const floating = document.querySelector('.floating-img');
    if (!floating) return;

    const amount = 20; // Amount of movement relative to cursor
    const x = (e.clientX / window.innerWidth - 0.5) * amount;
    const y = (e.clientY / window.innerHeight - 0.5) * amount;

    floating.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
});

document.addEventListener('DOMContentLoaded', function() {
    // Rolagem suave para a seção clicada no menu de navegação
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetOffset = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetOffset,
                behavior: 'smooth'
            });
        });
    });

    // Destaque na navegação para a seção ativa
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});

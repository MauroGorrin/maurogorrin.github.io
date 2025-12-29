
// Inicializar Lucide Icons
declare var lucide: any;
lucide.createIcons();

// Lógica de Navegación (Header dinámico al hacer scroll)
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar?.classList.add('pt-4');
        navbar?.classList.remove('pt-6');
    } else {
        navbar?.classList.remove('pt-4');
        navbar?.classList.add('pt-6');
    }
});

// Lógica de Menú Móvil (Overlay dinámico)
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

const toggleMenu = (forceClose = false) => {
    if (forceClose) {
        mobileMenu?.classList.remove('active');
        return;
    }
    mobileMenu?.classList.toggle('active');
};

mobileMenuBtn?.addEventListener('click', () => toggleMenu());
closeMenuBtn?.addEventListener('click', () => toggleMenu(true));

// Cerrar menú al hacer clic en un enlace de navegación
mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
});

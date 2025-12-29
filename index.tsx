
// Inicializar Lucide Icons
declare var lucide: any;
lucide.createIcons();

// Lógica de FAQ (Acordeón mejorado y robusto)
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Cerrar todos los demás para un efecto de acordeón puro
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Alternar el estado actual
        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    });
});

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

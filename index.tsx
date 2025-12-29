
// Definición de tipo para Lucide disponible en window
declare var lucide: any;

const initApp = () => {
    // Inicializar Iconos
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

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

    // Lógica de Menú Móvil
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = (open: boolean) => {
        if (open) {
            mobileMenu?.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu?.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    mobileMenuBtn?.addEventListener('click', () => toggleMenu(true));
    closeMenuBtn?.addEventListener('click', () => toggleMenu(false));

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
};

// Asegurar que el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Re-ejecutar creación de iconos por si acaso hay retraso en el CDN
setTimeout(() => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}, 500);


// Inicializar Lucide Icons
declare var lucide: any;
lucide.createIcons();

// Lógica de FAQ (Acordeón mejorado)
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Cerrar otros si se desea comportamiento de acordeón único
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Alternar el actual
        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    });
});

// Lógica de Navegación (Header dinámico)
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
const mobileBtn = document.getElementById('mobile-menu-btn');
mobileBtn?.addEventListener('click', () => {
    // Implementación simple de toggle si se requiere un overlay, 
    // pero para este diseño minimalista los enlaces ancla funcionan directo.
    alert("Navegación móvil habilitada vía scroll.");
});

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. SCROLL SUAVE ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      // Verificamos que el elemento exista antes de hacer scroll
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // --- 2. EFECTO PARALLAX OPTIMIZADO ---
  const heroSection = document.querySelector('.hero');
  
  if (heroSection) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          // Solo actualizamos si hay cambio
          heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- 3. LÓGICA DEL MODAL DE CERTIFICADOS ---
  // Exponemos las funciones a window para que funcionen con onclick en el HTML
  window.mostrarCertificado = function(imgUrl) {
    const modal = document.getElementById('modalCertificado');
    const imgModal = document.getElementById('imgCertificado');
    
    if (modal && imgModal) {
      imgModal.src = imgUrl;
      modal.style.display = "block";
      document.body.style.overflow = "hidden"; // Evita scroll detrás del modal
    }
  };

  window.cerrarModal = function() {
    const modal = document.getElementById('modalCertificado');
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Reactiva el scroll
    }
  };

  // Cerrar modal al hacer clic fuera de la imagen
  window.addEventListener('click', (event) => {
    const modal = document.getElementById('modalCertificado');
    if (event.target === modal) {
      window.cerrarModal();
    }
  });

  // --- 4. LÓGICA DEL CHATBOT ---
  const phoneNumber = '51932721373';

  window.toggleBot = function() {
    const bot = document.getElementById('chatBot');
    if (bot) {
      const isVisible = bot.style.display === 'block';
      bot.style.display = isVisible ? 'none' : 'block';
    }
  };

  window.sendToWhatsApp = function(message) {
    if (!message) return;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // --- EXTRA: ANIMACIÓN AL SCROLL (Fade In) ---
  // Si quisieras añadir elementos que aparecen al hacer scroll, aquí iría
  // Por ahora está listo para el código actual.
});
  
  
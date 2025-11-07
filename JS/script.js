 // Animación de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Efecto parallax
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      document.querySelector('.hero').style.backgroundPositionY = `${scrolled * 0.5}px`;
    });

    function mostrarCertificado(imgUrl) {
    const modal = document.getElementById('modalCertificado');
    const imgModal = document.getElementById('imgCertificado');
    imgModal.src = imgUrl;
    modal.style.display = "block";
  }

  function cerrarModal() {
    document.getElementById('modalCertificado').style.display = "none";
  }

  // Cerrar al hacer click fuera de la imagen
  window.onclick = function(event) {
    const modal = document.getElementById('modalCertificado');
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  function toggleBot() {
    const bot = document.getElementById('chatBot');
    bot.style.display = (bot.style.display === 'none') ? 'block' : 'none';
  }

  function sendToWhatsApp(message) {
    const phoneNumber = '51932721373'; // Reemplaza con tu número real
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
  
  
  
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

 

  // --- EXTRA: ANIMACIÓN AL SCROLL (Fade In) ---
  // Si quisieras añadir elementos que aparecen al hacer scroll, aquí iría
  // Por ahora está listo para el código actual.
});
  
  










  // --- CONFIGURACIÓN ---
  const WHATSAPP_NUMBER = '51932721373'; // TU NÚMERO
  
  // --- ESTADO DEL BOT ---
  let currentStep = 0;
  const userData = {
    service: '',
    budget: '',
    name: ''
  };

  const chatWindow = document.getElementById('chatWindow');
  const chatBody = document.getElementById('chatBody');
  const chatControls = document.getElementById('chatControls');

  // --- FUNCIONES PRINCIPALES ---

  function toggleChat() {
    chatWindow.classList.toggle('active');
    // Si es la primera vez que se abre y no hay mensajes, iniciar
    if (chatWindow.classList.contains('active') && chatBody.children.length === 0) {
      startBot();
    }
  }

  function startBot() {
    addBotMessage("¡Hola! 👋 Bienvenido a NetoWebs. Soy tu asistente virtual.");
    setTimeout(() => {
      addBotMessage("¿Qué tipo de solución estás buscando hoy?");
      showOptions([
        { label: "🌐 Página Web", value: "Sitio Web" },
        { label: "🛒 Tienda Online", value: "E-commerce" },
        { label: "📱 App Móvil", value: "App Móvil" },
        { label: "🛠️ Mantenimiento", value: "Mantenimiento" }
      ], 1);
    }, 800);
  }

  // Agregar mensaje del bot
  function addBotMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message bot';
    msgDiv.innerHTML = text;
    chatBody.appendChild(msgDiv);
    scrollToBottom();
  }

  // Agregar mensaje del usuario
  function addUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user';
    msgDiv.innerText = text;
    chatBody.appendChild(msgDiv);
    scrollToBottom();
  }

  // Simular que el bot escribe
  function showTypingIndicator(callback) {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(typingDiv);
    scrollToBottom();

    setTimeout(() => {
      document.getElementById('typingIndicator').remove();
      callback();
    }, 1200); // Espera 1.2 segundos simulando pensamiento
  }

  // Mostrar botones de opción
  function showOptions(options, nextStep) {
    chatControls.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'option-grid';

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerText = opt.label;
      btn.onclick = () => handleOptionClick(opt.value, nextStep);
      grid.appendChild(btn);
    });
    chatControls.appendChild(grid);
  }

  // Mostrar input de texto
  function showTextInput(placeholder, nextStep) {
    chatControls.innerHTML = '';
    const input = document.createElement('input');
    input.className = 'text-input';
    input.placeholder = placeholder;
    
    input.onkeypress = (e) => {
      if (e.key === 'Enter' && input.value.trim() !== '') {
        handleOptionClick(input.value.trim(), nextStep);
      }
    };
    chatControls.appendChild(input);
    setTimeout(() => input.focus(), 100);
  }

  // Manejar la lógica del flujo (Cerebro del Bot)
  function handleOptionClick(value, nextStep) {
    chatControls.innerHTML = ''; // Limpiar botones temporalmente
    addUserMessage(value);
    
    showTypingIndicator(() => {
      processStep(value, nextStep);
    });
  }

  // Lógica de Negocio / Ventas
  function processStep(value, step) {
    switch(step) {
      case 1: // Servicio seleccionado
        userData.service = value;
        addBotMessage(`¡Excelente elección! ${value} es nuestro fuerte.`);
        setTimeout(() => {
          addBotMessage("¿Cuál es tu presupuesto aproximado?");
          showOptions([
            { label: "$100 - $500", value: "$100-$500" },
            { label: "$500 - $1000", value: "$500-$1000" },
            { label: "$1000 - $2000", value: "$1000-$2000" },
            { label: "Más de $2000", value: "+$2000" }
          ], 2);
        }, 800);
        break;

      case 2: // Presupuesto seleccionado
        userData.budget = value;
        addBotMessage("Entendido. Tengo la información necesaria.");
        setTimeout(() => {
          addBotMessage("Por último, ¿cuál es tu nombre para poder atenderte?");
          showTextInput("Escribe tu nombre aquí...", 3);
        }, 800);
        break;

      case 3: // Nombre ingresado -> Cierre
        userData.name = value;
        addBotMessage(`¡Gracias ${value}!`);
        setTimeout(() => {
          addBotMessage("Estoy generando tu enlace de atención personalizada...");
          setTimeout(() => {
            redirectToWhatsApp();
          }, 1500);
        }, 500);
        break;
    }
  }

  // Redirigir a WhatsApp con todo el resumen
  function redirectToWhatsApp() {
    const text = `Hola NetoWebs, soy *${userData.name}*.%0A%0A` +
                  `Estoy interesado en: *${userData.service}*.%0A` +
                  `Mi presupuesto es: *${userData.budget}*.%0A%0A` +
                  `¿Podrían darme más detalles?`;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    
    // Abrir ventana y cerrar chat
    window.open(url, '_blank');
    toggleChat();
  }

  function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

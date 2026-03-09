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
const WHATSAPP_NUMBER = '51972498691'; // TU NÚMERO

// --- ESTADO DEL BOT ---
let currentStep = 0;
const userData = {
  service: '',
  stage: '', 
  name: ''
};

const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');
const chatControls = document.getElementById('chatControls');

// --- BASE DE DATOS DE VENTAS (Beneficios y Prueba Social) ---
const salesKnowledge = {
  "Sitio Web": {
    benefit: "Tendrás una carta de presentación profesional que vende por ti las 24 horas.",
    tip: "Incluye diseño optimizado para celulares."
  },
  "E-commerce": {
    benefit: "Podrás vender automáticamente y recibir pagos sin estar presente.",
    tip: "Ideal para escalar tu negocio."
  },
  "App Móvil": {
    benefit: "Llegarás directamente a la pantalla de tus clientes, aumentando la fidelidad.",
    tip: "Disponible para iOS y Android."
  },
  "Mantenimiento": {
    benefit: "Olvídate de fallos técnicos, nosotros nos encargamos de que todo funcione perfecto.",
    tip: "Soporte prioritario incluido."
  }
};

// --- FUNCIONES PRINCIPALES ---

function toggleChat() {
  chatWindow.classList.toggle('active');
  // Si es la primera vez que se abre, iniciar con gancho
  if (chatWindow.classList.contains('active') && chatBody.children.length === 0) {
    startBot();
  }
}

function startBot() {
  // 1. SALUDO INTELIGENTE (Hook + Propuesta de valor)
  addBotMessage("¡Hola! 👋 Soy el asesor digital de NetoWebs.");
  setTimeout(() => {
    // Técnica de Curiosidad + Urgencia sutil
    addBotMessage("Tenemos <strong>cupos limitados</strong> esta semana para nuevos proyectos. ¿En qué te puedo ayudar?");
    
    // 2. IDENTIFICAR NECESIDAD (Opciones claras)
    showOptions([
      { label: "🌐 Página Web", value: "Sitio Web" },
      { label: "🛒 Tienda Online (E-commerce)", value: "E-commerce" },
      { label: "📱 App Móvil", value: "App Móvil" },
      { label: "🛠️ Soporte y Mantenimiento", value: "Mantenimiento" }
    ], 1);
  }, 800);
}

// Agregar mensaje del bot (Sin cambios en lógica, pero ahora acepta HTML)
function addBotMessage(text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message bot';
  msgDiv.innerHTML = text; // InnerHTML permite negritas y formato
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

// Simular que el bot escribe (Reducido a 1s para fluidez)
function showTypingIndicator(callback) {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot typing-indicator';
  typingDiv.id = 'typingIndicator';
  typingDiv.innerHTML = '<span></span><span></span><span></span>';
  chatBody.appendChild(typingDiv);
  scrollToBottom();

  setTimeout(() => {
    const indicator = document.getElementById('typingIndicator');
    if(indicator) indicator.remove();
    callback();
  }, 1000); 
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

// Manejar clic
function handleOptionClick(value, nextStep) {
  chatControls.innerHTML = ''; 
  addUserMessage(value);
  
  showTypingIndicator(() => {
    processStep(value, nextStep);
  });
}

// --- CEREBRO DE VENTAS (Optimizado) ---
function processStep(value, step) {
  switch(step) {
    case 1: // Servicio seleccionado -> PRESENTACIÓN DE PRODUCTO
      userData.service = value;
      const info = salesKnowledge[value] || { benefit: "Soluciones a medida.", tip: "" };

      // 3. PRESENTAR PRODUCTO (Beneficio + Prueba Social/Tip)
      addBotMessage(`¡Gran elección! ✅ Un <strong>${value}</strong> es clave para crecer.`);
      setTimeout(() => {
        addBotMessage(`📝 <strong>Beneficio clave:</strong> ${info.benefit}`);
        setTimeout(() => {
          addBotMessage("Para armarte una propuesta a tu medida, ¿en qué etapa estás?");
          
          // 4. MANEJO DE OBJECIONES (Opciones enfocadas en solución)
          showOptions([
            { label: "💡 Tengo solo la idea (Desde cero)", value: "Idea Inicial" },
            { label: "🎨 Tengo diseño/avances (Necesito pulirlo)", value: "Proyecto en curso" },
            { label: "🚀 Lo necesito urgente (Prioridad)", value: "Urgente / Inmediato" },
            { label: "💰 Busco precios (Cotización)", value: "Comparando precios" }
          ], 2);
        }, 800);
      }, 800);
      break;

    case 2: // Estado seleccionado -> URGENCIA Y CIERRE
      userData.stage = value;
      
      // Lógica de Respuesta Personalizada (Objeciones)
      let responseSales = "";
      if(value.includes("Idea")) {
        responseSales = "¡Perfecto! Nosotros te ayudamos desde la conceptualización hasta el lanzamiento. 💡";
      } else if (value.includes("Proyecto")) {
        responseSales = "Excelente. Si ya tienes avances, podemos optimizar costos y tiempos. ⚡";
      } else if (value.includes("Urgente")) {
        responseSales = "🚨 <strong>¡Entendido!</strong> Tenemos una vía rápida para proyectos urgentes. Te priorizaremos.";
      } else if (value.includes("Comparando")) {
        // Objeción de Precio: Valor antes que precio
        responseSales = "Entendido. Nuestros precios son competitivos, pero lo mejor es la <strong>garantía de soporte</strong>. Verás que vale la pena. 😉";
      }

      addBotMessage(responseSales);
      
      // 5. URGENCIA Y ESCACEZ
      setTimeout(() => {
        addBotMessage("⚡ <strong>Importante:</strong> Solo tenemos <u>3 cupos disponibles</u> para iniciar este mes con el 10% de descuento.");
        
        setTimeout(() => {
          // Transición al cierre
          addBotMessage("Para enviarte el presupuesto personalizado y reservar tu cupo, ¿cuál es tu nombre?");
          showTextInput("Escribe tu nombre completo...", 3);
        }, 1000);
      }, 800);
      break;

    case 3: // Nombre ingresado -> CIERRE
      userData.name = value;
      
      // 6. CIERRE DE VENTA (Llamada a la acción clara)
      addBotMessage(`Un gusto, <strong>${value}</strong>. 👋`);
      setTimeout(() => {
        addBotMessage("Estoy generando tu cotización prioritaria en este momento...");
        
        setTimeout(() => {
          addBotMessage("👇 <strong>Haz clic abajo para ver el resumen y empezar</strong>:");
          
          // Botón Final (Mejor que un simple redirect automático)
          showFinalButton();
        }, 1000);
      }, 500);
      break;
  }
}

// Botón Final de WhatsApp (Estilo mejorado en JS, pero puedes usar CSS)
function showFinalButton() {
  chatControls.innerHTML = '';
  const btn = document.createElement('a');
  btn.className = 'option-btn whatsapp-btn'; // Asegúrate de tener estilos para esto o usa 'option-btn'
  btn.style.backgroundColor = '#25D366';
  btn.style.color = 'white';
  btn.style.textDecoration = 'none';
  btn.style.textAlign = 'center';
  btn.style.fontWeight = 'bold';
  btn.innerText = '📱 Ver Cotización por WhatsApp';
  
  btn.onclick = redirectToWhatsApp; // Llama a la función de redirección
  chatControls.appendChild(btn);
}

// 7. POSTVENTA (Redirección con datos estructurados)
function redirectToWhatsApp() {
  // Mensaje diseñado para que el vendedor real responda rápido
  const urgencyTag = userData.stage.includes("Urgente") ? "🚨 URGENTE:" : "📋 Nuevo Lead:";
  
  const text = `${urgencyTag} Hola NetoWebs, soy *${userData.name}*.%0A` +
                `Vi la promoción del mes y me interesa: *${userData.service}*.%0A` +
                `Mi situación es: *${userData.stage}*.%0A` +
                `Quiero saber el precio y disponibilidad.`;
  
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  
  window.open(url, '_blank');
  
  // Mensaje Post-venta dentro del chat
  chatControls.innerHTML = '<p style="text-align:center; font-size:12px; color:#888;">Redirigiendo a WhatsApp...</p>';
  setTimeout(() => {
      if(chatWindow.classList.contains('active')) {
          addBotMessage("¡Listo! Te esperamos en WhatsApp para enviarte los detalles. 🚀");
      }
  }, 500);
}

function scrollToBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Mostrar input de texto (Optimizado para Móvil)
function showTextInput(placeholder, nextStep) {
  chatControls.innerHTML = '';
  const input = document.createElement('input');
  input.className = 'text-input';
  input.placeholder = placeholder;
  input.setAttribute('autocomplete', 'off'); // Evita autocompletados molestos
  
  // Importante para móviles: Tamaño de fuente 16px previene zoom en iOS
  input.style.fontSize = '16px'; 
  
  input.onkeypress = (e) => {
    if (e.key === 'Enter' && input.value.trim() !== '') {
      handleOptionClick(input.value.trim(), nextStep);
    }
  };
  
  chatControls.appendChild(input);
  
  // Pequeño truco: Enfocar con delay para que el teclado móvil no salte de golpe y desordene
  setTimeout(() => {
    input.focus();
    // En móviles, al enfocar, hacemos scroll suave al final
    scrollToBottom(); 
  }, 300);
}
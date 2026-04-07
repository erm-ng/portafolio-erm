document.addEventListener("DOMContentLoaded", () => {
  const left = document.querySelector(".building.left");
  const right = document.querySelector(".building.right");

  const updateBuildings = () => {
    const scrollPos = window.scrollY;
    
    // Umbral dinámico: 20px en móvil, 50px en PC
    const threshold = window.innerWidth < 768 ? 20 : 50;

    if (scrollPos > threshold) {
      left.style.transform = "translateX(0%)";
      right.style.transform = "translateX(0%)";
    } else {
      left.style.transform = "translateX(-100%)";
      right.style.transform = "translateX(100%)";
    }
  };

  window.addEventListener("scroll", updateBuildings, { passive: true });
  updateBuildings();
});


// estrellas
const starLayers = document.getElementById('star-layers');
const totalStars = 300; // Menos elementos para optimizar

for (let i = 0; i < totalStars; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

  // Tamaño aleatorio
  const size = Math.random() * 2 + 1; // 1px a 3px
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  // Posición aleatoria inicial
  star.style.top = `${Math.random() * 100}vh`;
  star.style.left = `${Math.random() * 100}vw`;

  // Duración aleatoria de animación
  const duration = Math.random() * 40 + 20; // 20s a 60s
  star.style.animationDuration = `${duration}s`;

  // Retraso aleatorio
  star.style.animationDelay = `${Math.random() * 60}s`;

  starLayers.appendChild(star);
}


// sidebar 
// =============================
// SIDEBAR INTERACTIVO COMPLETO
// =============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const sidebar = document.querySelector(".sidebar");

let lastScroll = 0;

// 🔥 SCROLL SPY (activar íconos)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;

      navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + id) {
          link.classList.add("active");
        }
      });
    }
  });
}, {
  threshold: 0.6
});

sections.forEach(section => observer.observe(section));


// 🔥 OCULTAR / MOSTRAR SIDEBAR
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Siempre visible arriba
  if (currentScroll <= 50) {
    sidebar.classList.remove("hide");
    return;
  }

  // Scroll hacia abajo → ocultar
  if (currentScroll > lastScroll) {
    sidebar.classList.add("hide");
  } 
  // Scroll hacia arriba → mostrar
  else {
    sidebar.classList.remove("hide");
  }

  lastScroll = currentScroll;
});


// 🔥 Música
// =============================
// 🎵 CONTROL DE MÚSICA PRO
// =============================

// =============================
// 🎵 CONTROL DE MÚSICA PRO FINAL
// =============================

const music = document.getElementById("bg-music");
const btn = document.getElementById("musicBtn");

let playing = false;
let fadeInInterval = null;
let fadeOutInterval = null;

// 🔰 icono inicial
btn.innerHTML = '<i class="bi bi-volume-mute"></i>';

// =============================
// 🔊 FADE IN
// =============================
function fadeIn(audio) {
  clearInterval(fadeOutInterval);

  audio.volume = 0;
  audio.play();

  let vol = 0;
  const target = 0.2;

  fadeInInterval = setInterval(() => {
    if (vol < target) {
      vol += 0.02;
      audio.volume = vol;
    } else {
      audio.volume = target;
      clearInterval(fadeInInterval);
    }
  }, 100);
}

// =============================
// 🔇 FADE OUT
// =============================
function fadeOut(audio) {
  clearInterval(fadeInInterval);

  let vol = audio.volume;

  fadeOutInterval = setInterval(() => {
    if (vol > 0.02) {
      vol -= 0.02;
      audio.volume = vol;
    } else {
      audio.pause();
      clearInterval(fadeOutInterval);
    }
  }, 100);
}

// =============================
// 🎯 CLICK BOTÓN
// =============================
btn.addEventListener("click", () => {

  if (playing) {
    // 🔇 apagar
    fadeOut(music);

    btn.innerHTML = '<i class="bi bi-volume-mute"></i>';
    btn.classList.remove("active");

    playing = false;

  } else {
    // 🔊 encender
    fadeIn(music);

    btn.innerHTML = '<i class="bi bi-volume-up"></i>';
    btn.classList.add("active");

    playing = true;
  }

});




// 🔥 Modal portafolio

// 🔥 MODAL WEB
const modalWeb = document.getElementById('modalWeb');
const iframe = document.getElementById('iframeWeb');

modalWeb.addEventListener('show.bs.modal', function (event) {
  const button = event.relatedTarget;
  const url = button.getAttribute('data-url');
  const title = button.getAttribute('data-title');

  iframe.src = url;
  modalWeb.querySelector('.modal-title').textContent = title;
});

modalWeb.addEventListener('hidden.bs.modal', function () {
  iframe.src = "";
});


// 🖼 MODAL GALERÍA
const modalGaleria = document.getElementById('modalGaleria');
const galeria = document.getElementById('galeriaContenido');

modalGaleria.addEventListener('show.bs.modal', function (event) {
  const button = event.relatedTarget;
  const images = button.getAttribute('data-images').split(',');

  galeria.innerHTML = "";

  images.forEach(img => {
    galeria.innerHTML += `
      <img src="${img}" class="img-fluid mb-3 rounded">
    `;
  });
});





document.addEventListener('DOMContentLoaded', function() {
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const container = document.querySelector('.container');
  const nav = document.querySelector('nav');
  const loadingText = document.querySelector('.loading-text');
  
  const loadingBgs = document.querySelectorAll('.loading-bg');

  const loadingImage = document.querySelector('.loading-image'); 

  let load = 0;
  let int = setInterval(blurring, 15); 
  // Intervallo per il caricamento con sfocatura

  function blurring() {
    load++;

    if (load > 99) {
      clearInterval(int);
    }

    loadingText.innerText = `${load}%`;
    loadingText.style.opacity = `${1 - load / 100}`;

    // Sfocatura per entrambi gli sfondi
    loadingBgs.forEach(bg => {
      bg.style.filter = `blur(${scale(load, 0, 100, 100, 0)}px)`;
    });

    if (loadingImage) {
      loadingImage.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
    }
  }

  // Funzione per fare una scala dei valori (per sfocare)
  function scale(num, inMin, inMax, outMin, outMax) {
    return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  open.addEventListener('click', () => {
    container.classList.add('show-nav');
  });

  close.addEventListener('click', () => {
    container.classList.remove('show-nav');
  });
});

// Funzione per gestire la modalità scura e il cambio di immagine
function toggleDark() {
  document.body.classList.toggle('dark-mode');  // Abilita/disabilita la modalità dark

  const btn = document.querySelector('.dark-toggle');
  btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';

  const loadingBg = document.querySelector('.loading-bg');

  // Se la modalità dark è attiva, nasconde l'immagine chiara e mostra quella scura
  if (document.body.classList.contains('dark-mode')) {
    loadingBg.classList.add('dark');  
    loadingBg.classList.remove('light');  
  } else {
    loadingBg.classList.add('light');  
    loadingBg.classList.remove('dark'); 
  }
}

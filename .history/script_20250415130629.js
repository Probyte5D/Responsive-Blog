document.addEventListener('DOMContentLoaded', function() {
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const container = document.querySelector('.container');
  const nav = document.querySelector('nav');
  const loadingBgs = document.querySelectorAll('.loading-bg'); // Tutti gli sfondi (light + dark)

  const loadingBg = document.querySelector('.loading-bg'); // L'elemento sfondo
  const loadingImage = document.querySelector('.loading-image'); // L'immagine di caricamento

  let load = 0;
  let int = setInterval(blurring, 15); // Intervallo per il caricamento con sfocatura

  function blurring() {
    load++;

    if (load > 99) {
      clearInterval(int);
    }

    // Aggiorna la percentuale di caricamento
    loadingText.innerText = `${load}%`;
    loadingText.style.opacity = `${1 - load / 100}`;

    // Applica la sfocatura all'immagine di sfondo e all'immagine di caricamento
    loadingBg.style.filter = `blur(${scale(load, 0, 100, 100, 0)}px)`;
    loadingImage.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
    console.log(load);
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

  // Se la modalità dark è attiva, nascondi l'immagine chiara e mostra quella scura
  if (document.body.classList.contains('dark-mode')) {
    loadingBg.classList.add('dark');  // Aggiungi la classe per lo sfondo scuro
    loadingBg.classList.remove('light');  // Rimuovi la classe per lo sfondo chiaro
  } else {
    loadingBg.classList.add('light');  // Aggiungi la classe per lo sfondo chiaro
    loadingBg.classList.remove('dark');  // Rimuovi la classe per lo sfondo scuro
  }
}

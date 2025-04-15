document.addEventListener('DOMContentLoaded', function() {
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const container = document.querySelector('.container');
  const nav = document.querySelector('nav');
  const loadingText = document.querySelector('.loading-text');
  const loadingBg = document.querySelector('.loading-bg'); // L'elemento sfondo
  const loadingImage = document.querySelector('.loading-image'); // L'immagine di caricamento

  let load = 0;
  let int = setInterval(blurring, 15);

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




  function toggleDark() {
    document.body.classList.toggle('light-mode');
  }

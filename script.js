// ==============================================
// Black Summer Project - Interactive Data Visualization
// Author: Sviluppatore Web
// Version: 2.1
// ==============================================

// Attendi che il DOM sia completamente caricato
document.addEventListener("DOMContentLoaded", () => {
  console.info("🔥 Inizializzazione Black Summer Project...");
  
  // Inizializza componenti UI
  initNavbar();
  initScrollAnimations();
  initCharts();
  initModalHandlers();
  initNumberAnimations();
  initTemperatureMap();
  initVideoPlayer();
  initLightbox();
  initKonamiCode();
  
  console.info("✅ Tutti i componenti inizializzati correttamente");
});

// Navbar mobile toggle
function initNavbar() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  
  if (!hamburger || !navLinks) return;
  
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
  
  // Chiudi menu quando si clicca su un link
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
  
  // Navbar trasparente/solida in base allo scroll
  let prevScrollPos = window.pageYOffset;
  window.addEventListener("scroll", () => {
    const currentScrollPos = window.pageYOffset;
    const header = document.querySelector(".main-header");
    
    if (!header) return;
    
    if (prevScrollPos > currentScrollPos) {
      // Scroll up
      header.style.top = "0";
    } else {
      // Scroll down
      if (currentScrollPos > 100) {
        header.style.top = "-70px";
      }
    }
    
    prevScrollPos = currentScrollPos;
    
    // Cambia lo stile della navbar in base alla posizione
    if (currentScrollPos > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Animazioni al scroll
function initScrollAnimations() {
  const revealSections = document.querySelectorAll(".reveal-section");
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const revealPoint = 150;
      
      if (sectionTop < windowHeight - revealPoint) {
        section.classList.add("reveal-active");
      }
    });
  };
  
  window.addEventListener("scroll", revealOnScroll);
  // Controlla anche all'avvio per elementi già visibili
  revealOnScroll();
}

// Funzione principale per inizializzare entrambi i grafici
function initCharts() {
  console.log("Inizializzazione grafici...");
  
  // GRAFICO AREA BRUCIATA
  initBurnedAreaChart();
  
  // GRAFICO CO2
  initCO2Chart();
}

// Grafico delle aree bruciate
function initBurnedAreaChart() {
  const burnedAreaCtx = document.getElementById('burnedAreaChart');
  
  if (!burnedAreaCtx) {
    console.error('Elemento canvas per il grafico delle aree bruciate non trovato');
    return;
  }
  
  console.log('Canvas area bruciata trovato, creazione grafico migliorato...');
  
  // Dati delle aree bruciate negli ultimi anni (in milioni di ettari)
  const data = {
    labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
    datasets: [{
      label: 'Area Bruciata (milioni di ettari)',
      data: [1.5, 2.8, 18.6, 4.5, 3.2, 3.8],
      backgroundColor: 'rgba(255, 68, 68, 0.7)',
      borderColor: '#ff4444',
      borderWidth: 2,
      // Aggiunto effetto hover migliorato
      hoverBackgroundColor: 'rgba(255, 68, 68, 0.9)',
      hoverBorderColor: '#ff0000',
      hoverBorderWidth: 3
    }]
  };

  // Configurazione del grafico
  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              family: 'Montserrat, Arial, sans-serif',
              size: 14
            }
          }
        },
        title: {
          display: true,
          text: 'Area bruciata negli ultimi anni',
          font: {
            family: 'Montserrat, Arial, sans-serif',
            size: 18,
            weight: 'bold'
          },
          color: '#333'
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            family: 'Montserrat, Arial, sans-serif'
          },
          bodyFont: {
            family: 'Montserrat, Arial, sans-serif'
          },
          callbacks: {
            label: function(context) {
              return `${context.parsed.y.toLocaleString()} milioni di ettari`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Milioni di ettari',
            font: {
              family: 'Montserrat, Arial, sans-serif',
              size: 14
            }
          },
          ticks: {
            callback: function(value) {
              return value + 'M';
            },
            font: {
              family: 'Montserrat, Arial, sans-serif'
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Anno',
            font: {
              family: 'Montserrat, Arial, sans-serif',
              size: 14
            }
          },
          ticks: {
            font: {
              family: 'Montserrat, Arial, sans-serif'
            }
          },
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  };
  
  try {
    // Creazione del grafico delle aree bruciate
    new Chart(burnedAreaCtx, config);
    console.log('Grafico area bruciata creato con successo');
  } catch (error) {
    console.error('Errore nella creazione del grafico area bruciata:', error);
  }
}

// Grafico delle emissioni di CO2
function initCO2Chart() {
  const co2Ctx = document.getElementById('co2Chart');
  
  if (!co2Ctx) {
    console.error('Elemento canvas per il grafico CO2 non trovato');
    return;
  }
  
  console.log('Canvas CO2 trovato, creazione grafico migliorato...');
  
  // Dati delle emissioni di CO2 durante i mesi del Black Summer
  const co2Data = {
    labels: ['Set 2019', 'Ott 2019', 'Nov 2019', 'Dic 2019', 'Gen 2020', 'Feb 2020', 'Mar 2020'],
    datasets: [{
      label: 'Emissioni CO₂ (Megatonnellate)',
      data: [5, 15, 50, 95, 130, 75, 30],
      backgroundColor: 'rgba(255, 99, 71, 0.7)',
      borderColor: 'rgb(255, 99, 71)',
      borderWidth: 1,
      // Aggiunto effetto hover migliorato
      hoverBackgroundColor: 'rgba(255, 99, 71, 0.9)',
      hoverBorderColor: 'rgb(220, 80, 60)',
      hoverBorderWidth: 2
    }]
  };
  const co2Config = {
    type: 'bar',
    data: co2Data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              family: 'Montserrat, Arial, sans-serif',
              size: 14
            }
          }
        },
        title: {
          display: true,
          text: 'Emissioni di CO₂ durante il Black Summer',
          font: {
            family: 'Montserrat, Arial, sans-serif',
            size: 18,
            weight: 'bold'
          },
          color: '#333'
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            family: 'Montserrat, Arial, sans-serif'
          },
          bodyFont: {
            family: 'Montserrat, Arial, sans-serif'
          },
          callbacks: {
            label: function(context) {
              return `${context.parsed.y} megatonnellate`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Megatonnellate di CO₂',
            font: {
              family: 'Montserrat, Arial, sans-serif',
              size: 14
            }
          },
          ticks: {
            font: {
              family: 'Montserrat, Arial, sans-serif'
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Mese',
            font: {
              family: 'Montserrat, Arial, sans-serif',
              size: 14
            }
          },
          ticks: {
            font: {
              family: 'Montserrat, Arial, sans-serif'
            }
          },
          grid: {
            display: false
          }
        }
      },
      animation: {
        duration: 1800,
        easing: 'easeOutQuint'
      }
    }
  };
  
  try {
    // Creazione del grafico CO2
    new Chart(co2Ctx, co2Config);
    console.log('Grafico CO2 migliorato creato con successo');
  } catch (error) {
    console.error('Errore nella creazione del grafico CO2:', error);
  }
}


// Gestione popup modali
function initModalHandlers() {
  const openBtn = document.getElementById("openModal");
  const modal = document.getElementById("infoModal");
  const closeBtn = document.getElementById("closeModal");

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
}


// Animazioni numeri che contano - VERSIONE CORRETTA
function initNumberAnimations() {
  const numbers = document.querySelectorAll('.number');
  
  if (numbers.length === 0) {
    console.error('Nessun elemento con classe .number trovato');
    return;
  }
  
  console.log('Elementi numerici trovati:', numbers.length);
  
  // Usa IntersectionObserver per attivare l'animazione quando l'elemento è visibile
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const startValue = 0;
        const endValue = parseInt(entry.target.getAttribute('data-value'));
        const duration = 2000;
        
        // Marca l'elemento come già animato
        entry.target.dataset.animated = true;
        
        // Funzione di animazione
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const value = Math.floor(progress * (endValue - startValue) + startValue);
          
          // Formatta il numero con separatori per le migliaia
          entry.target.textContent = new Intl.NumberFormat('it-IT').format(value);
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
    });
  }, { threshold: 0.1 });
  
  numbers.forEach(number => observer.observe(number));
}

// Gestione mappa delle temperature
function initTemperatureMap() {
  const yearBtns = document.querySelectorAll('.year-btn');
  const tempMaps = document.querySelectorAll('.temp-map');
  const playBtn = document.getElementById('playTempAnimation');
  
  if (!yearBtns.length || !tempMaps.length) return;
  
  // Funzione per mostrare la mappa dell'anno selezionato
  const showMap = (year) => {
    // Nascondi tutte le mappe
    tempMaps.forEach(map => {
      map.classList.remove('active');
    });
    
    // Mostra la mappa dell'anno selezionato
    const selectedMap = document.getElementById(`map-${year}`);
    if (selectedMap) {
      selectedMap.classList.add('active');
    }
    
    // Aggiorna i pulsanti
    yearBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-year') === year) {
        btn.classList.add('active');
      }
    });
  };
  
  // Event listener per i pulsanti degli anni
  yearBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const year = btn.getAttribute('data-year');
      showMap(year);
      
      // Interrompi eventuali animazioni in corso
      clearInterval(window.tempMapInterval);
    });
  });
  
  // Animazione play
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      // Interrompi eventuali animazioni precedenti
      clearInterval(window.tempMapInterval);
      
      const years = ['2010', '2015', '2020'];
      let currentIndex = 0;
      
      // Mostra la prima mappa immediatamente
      showMap(years[currentIndex]);
      
      // Imposta l'intervallo per cambiare mappa ogni 2 secondi
      window.tempMapInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % years.length;
        showMap(years[currentIndex]);
        
        // Se abbiamo completato un ciclo, ferma l'animazione
        if (currentIndex === 0) {
          clearInterval(window.tempMapInterval);
        }
      }, 2000);
    });
  }
}

// Gestione video con lazy loading
function initVideoPlayer() {
  const videoContainer = document.querySelector('.video-container');
  const videoPlaceholder = document.querySelector('.video-placeholder');
  const playBtn = document.querySelector('.play-video-btn');
  const lazyVideo = document.querySelector('.lazy-video');
  
  if (!videoContainer || !videoPlaceholder || !playBtn || !lazyVideo) return;
  
  playBtn.addEventListener('click', () => {
    // Carica il video effettivo dall'attributo data-src
    const videoSrc = lazyVideo.getAttribute('data-src');
    
    // Sostituisci l'iframe con un elemento video per maggiore controllo
    const videoElement = document.createElement('video');
    videoElement.src = videoSrc;
    videoElement.controls = true;
    videoElement.autoplay = true;
    videoElement.className = 'active-video';
    
    // Sostituisci il placeholder con il video
    videoContainer.replaceChild(videoElement, lazyVideo);
    
    // Nascondi il placeholder
    videoPlaceholder.style.display = 'none';
  });
}

// Gestione lightbox per la galleria
function initLightbox() {
  const cards = document.querySelectorAll('.card[data-type="image"]');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightbox = document.getElementById('closeLightbox');
  const prevBtn = document.getElementById('prev-img');
  const nextBtn = document.getElementById('next-img');
  
  if (!cards.length || !lightbox || !lightboxImg || !closeLightbox) return;
  
  let currentIndex = 0;
  const images = [];
  
  // Raccolta di tutte le immagini e didascalie
  cards.forEach((card, index) => {
    const img = card.querySelector('img');
    const caption = card.querySelector('.card-back p');
    
    if (img && caption) {
      images.push({
        src: img.src,
        alt: img.alt,
        caption: caption.textContent
      });
      
      // Event listener per aprire il lightbox
      card.addEventListener('click', () => {
        openLightbox(index);
      });
    }
  });
  
  // Funzione per aprire il lightbox
  function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Blocca lo scroll
  }
  
  // Funzione per aggiornare il contenuto del lightbox
  function updateLightboxContent() {
    const image = images[currentIndex];
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightboxCaption.textContent = image.caption;
  }
  
  // Chiusura lightbox
  closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Ripristina lo scroll
  });
  
  // Navigazione lightbox: immagine precedente
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateLightboxContent();
    });
  }
  
  // Navigazione lightbox: immagine successiva
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateLightboxContent();
    });
  }
}

// Easter egg: Konami Code
function initKonamiCode() {
  const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    // Converti il tasto premuto in minuscolo per la corrispondenza con b e a
    const key = e.key.toLowerCase();
    
    // Controlla se il tasto premuto corrisponde al pattern atteso
    if (key === konamiPattern[konamiIndex].toLowerCase()) {
      konamiIndex++;
      
      // Se è stata completato il pattern
      if (konamiIndex === konamiPattern.length) {
        activateKonamiCode();
        konamiIndex = 0; // Reset per permettere di attivarlo nuovamente
      }
    } else {
      konamiIndex = 0; // Reset se viene premuto un tasto sbagliato
    }
  });
  
  // Funzione che attiva l'easter egg
  function activateKonamiCode() {
    console.log('🎮 Konami Code attivato!');
    
    // Effetto visivo per l'easter egg
    const body = document.body;
    body.classList.add('konami-active');
    
    // Crea un elemento per l'effetto visivo
    const overlay = document.createElement('div');
    overlay.className = 'konami-overlay';
    overlay.innerHTML = `
      <div class="konami-message">
        <h2>🔥 Konami Code Attivato! 🔥</h2>
        <p>Hai trovato l'easter egg nascosto!</p>
        <p>Coordinate per il punto di riforestazione: -35.2809, 149.1300</p>
        <button id="closeKonami">Chiudi</button>
      </div>
    `;
    
    body.appendChild(overlay);
    
    // Chiudi l'overlay con il pulsante
    document.getElementById('closeKonami').addEventListener('click', () => {
      body.removeChild(overlay);
      body.classList.remove('konami-active');
    });
  }
}

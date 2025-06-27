// funzione per chiudere tutte le finestre di navigazione tranne quella attiva
function chiudiAltriModaliNav(activeModalId) {
  const navModals = ['#nav-donna', '#nav-uomo', '#nav-bskteen'];
  
  navModals.forEach(modalId => {
      if (modalId !== activeModalId) {
          const modal = document.querySelector(modalId);
          if (modal) {
              modal.classList.remove('show');
              modal.classList.add('hidden');
          }
      }
  });
}

// Funzione per aprire una modale
function apriModale(triggerSelector, modalSelector) {
document.querySelector(triggerSelector).addEventListener('click', () => {
  chiudiAltriModaliNav(modalSelector); // chiudi gli altri prima di aprire il nuovo
  const modale = document.querySelector(modalSelector);
  modale.classList.remove('hidden');
  modale.classList.add('show');
});
}

// Funzione per chiudere una modale
function chiudiModale(closeBtnSelector, modalSelector) {
document.querySelector(closeBtnSelector).addEventListener('click', () => {
  const modale = document.querySelector(modalSelector);
  modale.classList.remove('show');
  modale.classList.add('hidden');
});
}

// Apertura e chiusura modale "Carrello"
apriModale('#linksRIGHT a:nth-child(3)', '#cart-modal');
chiudiModale('.close-btn-cart', '#cart-modal');

function chiudiNavModale(modalSelector) {
const navModale = document.querySelector(modalSelector);

navModale.addEventListener('mouseleave', () => {
  navModale.classList.remove('show');
  navModale.classList.add('hidden');
});
}

// Apertura modali Navbar
apriModale('#linksLEFT a:nth-child(1)', '#nav-donna');
apriModale('#linksLEFT a:nth-child(2)', '#nav-uomo');
apriModale('#linksLEFT a:nth-child(3)', '#nav-bskteen');

// Chiusura modali Navbar al mouseleave
chiudiNavModale('#nav-donna');
chiudiNavModale('#nav-uomo');
chiudiNavModale('#nav-bskteen');

let isSearchOpen = false;

document.querySelector('.search-container').addEventListener('click', function() {
  const searchText = document.querySelector('#search-text');
  const searchIcon = document.querySelector('.search-icon');
  const navbar = document.querySelector('.navbar-container');
  const elementsToToggle = [
      document.querySelector('section'),
      document.querySelector('#linksLEFT'),
  ];

  isSearchOpen = !isSearchOpen;

  // Toggle elements visibility
  elementsToToggle.forEach(el => {
      if (el) {
          el.style.display = isSearchOpen ? 'none' : '';
      }
  });

  // Toglie il bordo da navbar 
  navbar.style.borderBottom = isSearchOpen ? 'none' : '1px solid black';


  // Attiva/disattiva la visibilità dell'input di ricerca
  searchText.textContent = isSearchOpen ? "CHIUDI" : "CERCA";
  searchIcon.src = isSearchOpen ? "./img/close-icon.png" : "./img/54481.png";
  
  // Cambia il colore del testo dell'input di ricerca
  document.querySelector('#search-page').style.display = isSearchOpen ? 'block' : 'none';


});
/* MENU MOBILE */
const openBtn = document.getElementById('menu-mobile');
const closeBtn = document.getElementById('close-menu');
const menu = document.getElementById('side-menu');

openBtn.addEventListener('click', () => {
menu.classList.add('open');
});

closeBtn.addEventListener('click', () => {
menu.classList.remove('open');
});

// Tabs attivi
const tabs = document.querySelectorAll('#gender-tabs .tab');
const contents = document.querySelectorAll('.menu-content');

tabs.forEach(tab => {
tab.addEventListener('click', function (e) {
  e.preventDefault();

  // Aggiorna tab attivo
  tabs.forEach(t => t.classList.remove('active'));
  this.classList.add('active');

  // Mostra il contenuto corretto
  const gender = this.getAttribute('data-gender');
  contents.forEach(content => content.style.display = 'none');
  document.getElementById('menu-' + gender).style.display = 'block';
});
});

/* API CONVERSIONE VALUTA */
// Selettori DOM
const currencySelector = document.getElementById('currency-selector');
const menuValuta = document.getElementById('currency-menu');
const currencyDropdown = document.getElementById('currency');

// Mappa simboli-valuta
const symbols = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF'
};

// Mappa inversa simbolo -> codice
const reverseSymbols = {};
for (const code in symbols) {
  reverseSymbols[symbols[code]] = code;
}

// Mostra/nasconde il menu valuta
if (currencySelector && menuValuta) {
  currencySelector.addEventListener("click", () => {
    menuValuta.classList.toggle("hidden");
  });
}

// Quando si seleziona una nuova valuta
if (currencyDropdown && menuValuta) {
  currencyDropdown.addEventListener('change', () => {
    const selectedCurrency = currencyDropdown.value;
    console.log('Valuta selezionata:', selectedCurrency);
    menuValuta.classList.add('hidden');
    updateExchangeRates(selectedCurrency);
  });
}

// Funzione per aggiornare i prezzi in base alla valuta selezionata
function updateExchangeRates(toCurrency) {
  const priceSelectors = ['.price', '.price-red', '.price-old'];
  const priceElements = document.querySelectorAll(priceSelectors.join(', '));

  priceElements.forEach(priceElement => {
    const text = priceElement.textContent.trim();

    // Trova il simbolo alla fine
    let matchedSymbol = null;
    let symbolLength = 0;

    for (const symbol of Object.values(symbols)) {
      if (text.endsWith(symbol)) {
        matchedSymbol = symbol;
        symbolLength = symbol.length;
        break;
      }
    }

    if (!matchedSymbol) return;

    // Estrai e converti l'importo
    const amountText = text.slice(0, -symbolLength).trim().replace(',', '.');
    const amount = parseFloat(amountText);
    if (isNaN(amount)) return;

    const fromCurrency = reverseSymbols[matchedSymbol];
    if (fromCurrency === toCurrency) return;

    // Chiamata al file PHP per la conversione
    fetch(`/convert_currency?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
      .then(response => {
        if (!response.ok) throw new Error('Errore nella richiesta al server PHP');
        return response.json();
      })
      .then(data => {
        if (data.error) throw new Error(data.error);
        const converted = parseFloat(data.converted).toFixed(2);
        const newSymbol = symbols[toCurrency] || toCurrency;
        priceElement.textContent = `${converted} ${newSymbol}`;
      })
      .catch(error => {
        console.error('Errore:', error);
      });
  });
}
const selector = document.getElementById('language-selector');
const menuTraslate = document.getElementById('language-menu');
const languageSelect = document.getElementById('language');

// Mostra/nasconde il menu a tendina
if (selector && menuTraslate) {
  selector.addEventListener('click', () => {
    menuTraslate.classList.toggle('hidden');
  });
}

// Traduzione al cambio lingua
if (languageSelect) {
  languageSelect.addEventListener('change', () => {
    const selectedLang = languageSelect.value;

    const elements = document.querySelectorAll(
      '#linksLEFT a, #gender-tabs a, .menu-content li, #linksRIGHT a, #search-text, .box-text h1, .product-text, .text_wrapper a, .gtl-text-container p, .cta-button, .suggested-text h2, .suggested-product h3, .spam-conto h2, .spam-conto p, .spam-conto a, .footer-container h3, .footer-container #traslate, .footer-container .small-text, .footer-container a, .modal-title, #facebook-access, .privacy-text, .login-options .traslate, .login-submit .traslate, .signup-link, .cart-header h2, .favorites-btn .traslate, .cart-empty-content h3, .cart-empty-content p, .cart-empty-content .discover-btn, .nav-menu a, .top-search-tag .traslate, .top-search-suggest h3, .product-name, .search-input-page'
    );

    elements.forEach(el => {
      const originalText = el.textContent.trim();
      if (!originalText) return;

      if (!el.dataset.original) {
        el.dataset.original = originalText;
      }

      if (selectedLang === 'it') {
        el.textContent = el.dataset.original;
        return;
      }

      fetch(`/translate?text=${encodeURIComponent(originalText)}&to=${selectedLang}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.responseData && data.responseData.translatedText) {
            el.textContent = data.responseData.translatedText;
          }
        })
        .catch(err => {
          console.error('Errore nella traduzione:', err);
        });
    });

    if (menuTraslate) {
      menuTraslate.classList.add('hidden');
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".search-input-page") || document.getElementById("search-input-products");
  const resultsContainer = document.querySelector("#results") || document.getElementById("results-products");
  const suggestSection = document.querySelector(".top-search-suggest") || document.querySelector(".suggest-section");
  const suggestTitle = document.querySelector(".search-suggest-text") || document.querySelector(".suggest-title");
  const topSearchTags = document.querySelector(".top-search") || document.querySelector(".top-search-tags");

  let timeout = null;

  input?.addEventListener("input", () => {
    clearTimeout(timeout);
    const query = input.value.trim();

    if (query.length < 3) {
      showSuggestions();
      return;
    }

    timeout = setTimeout(() => handleSearch(query), 500);
  });

  // === EVENT LISTENERS ===
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fav-icon")) toggleFavorite(e.target);
    if (e.target.closest(".cart-btn")) toggleCart(e.target.closest(".cart-btn"));
  });

  document.addEventListener("cart-item-removed", (e) => updateCartIcon(e.detail.title));

  // === FUNZIONI DI RICERCA ===
  function handleSearch(query) {
    fetch(`/search?q=${encodeURIComponent(query)}`)    
      .then(res => res.json())
      .then(data => {
        resultsContainer.innerHTML = "";
        hideSuggestions();

        if (!data.shopping_results || data.shopping_results.length === 0) {
          resultsContainer.innerHTML = "<p>Nessun risultato trovato.</p>";
          return;
        }

        Promise.all([
          fetch("/fetch-products").then(res => res.json()),
          fetch("/fetch-cart").then(res => res.json())
        ]).then(([favorites, cartItems]) => {
          data.shopping_results.forEach(item => {
            const favoriteItem = favorites.find(fav => fav.title === item.title);
            const isFav = Boolean(favoriteItem);
            const isInCart = cartItems.some(cart => cart.title === item.title);
            if (isFav) item.id = favoriteItem.id;

            const card = createProductCard(item, isFav, isInCart);
            resultsContainer.appendChild(card);
          });
        });
      })
      .catch(() => {
        resultsContainer.innerHTML = "<p>Errore nel caricamento dei risultati.</p>";
      });
  }

  function createProductCard(item, isFav, isInCart) {
    const card = document.createElement("div");
    card.className = "product-card p-c-search";
    card.dataset.item = JSON.stringify(item);

    card.innerHTML = `
      <img class="product-image" src="${item.thumbnail}" alt="${item.title}">
      <div class="product-info">
        <div class="left-info">
          <p class="product-name">${item.title}</p>
          <div class="price-line">
            <span class="product-price">${item.extracted_price ? item.extracted_price.toFixed(2) + " €" : ""}</span>
            ${item.discount ? `<span class="discount">${item.discount}</span>` : ""}
          </div>
          ${item.previous_price ? `<p class="price-old">${item.previous_price.toFixed(2)} €</p>` : ""}
        </div>
        <div class="right-icon">
          <img class="fav-icon" src="${isFav ? 'img/filled-hearth-search-page.png' : 'img/hearth-search-page.png'}" alt="cuoricino" title="${isFav ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}">
          <a class="cart-btn" data-title="${item.title}" data-thumbnail="${item.thumbnail}" data-price="${item.extracted_price || 0}">
            <img class="cart-icon" src="${isInCart ? 'img/remove-from-cart.png' : 'img/add-to-cart.png'}" alt="carrello" title="${isInCart ? 'Rimuovi dal carrello' : 'Aggiungi al carrello'}">
          </a>
        </div>
      </div>
    `;
    return card;
  }

  function showSuggestions() {
    resultsContainer.innerHTML = "";
    if (suggestSection) suggestSection.style.display = "block";
    if (suggestTitle) suggestTitle.style.display = "block";
    if (topSearchTags) topSearchTags.style.display = "flex";
  }

  function hideSuggestions() {
    if (suggestSection) suggestSection.style.display = "none";
    if (suggestTitle) suggestTitle.style.display = "none";
    if (topSearchTags) topSearchTags.style.display = "none";
  }

  // === FUNZIONI PREFERITI ===
  function toggleFavorite(icon) {
    const card = icon.closest(".product-card");
    const item = JSON.parse(card.dataset.item);
    const isFav = icon.src.includes("filled-hearth-search-page.png");
  
    if (isFav) {
      if (!item.id) {
        alert("ID mancante, impossibile rimuovere dai preferiti.");
        return;
      }
      removeFavorite(item.id).then(() => {
        icon.src = "img/hearth-search-page.png";
        icon.title = "Aggiungi ai preferiti";
        // Aggiorna il dataset rimuovendo id
        delete item.id;
        card.dataset.item = JSON.stringify(item);
      }).catch(() => alert("Errore nella rimozione"));
    } else {
      saveFavorite(item).then((data) => {
        if (data.ok) {
          icon.src = "img/filled-hearth-search-page.png";
          icon.title = "Rimuovi dai preferiti";
          // Aggiorna il dataset con l'id ricevuto dal server
          if (data.id) {
            item.id = data.id;
            card.dataset.item = JSON.stringify(item);
          }
        } else {
          alert("Errore nel salvataggio: " + (data.error || ""));
        }
      }).catch(() => alert("Errore nel salvataggio"));
    }
  }
  
  function removeFavorite(id) {
    return fetch("/remove-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then(res => res.json())
      .then(data => {
        if (!data.ok) return Promise.reject(data.error || "Errore");
        return data;
      });
  }
  
  function saveFavorite(product) {
    const formData = new FormData();
    formData.append("title", product.title || "");
    formData.append("snippet", product.snippet || "");
    formData.append("price", product.extracted_price || "");
    formData.append("thumbnail", product.thumbnail || "");
  
    return fetch("/save-product", {
      method: "POST",
      body: formData,
    }).then(res => res.json());
  }

  // === FUNZIONI CARRELLO ===
  function toggleCart(btn) {
    const img = btn.querySelector("img.cart-icon");
    const title = btn.dataset.title;
    const thumbnail = btn.dataset.thumbnail;
    const price = btn.dataset.price;
    const isInCart = img.src.includes("remove-from-cart.png");

    if (isInCart) {
      removeFromCart(title).then(() => {
        img.src = "img/add-to-cart.png";
        img.title = "Aggiungi al carrello";
        loadCartItems();
      }).catch(() => alert("Errore nella rimozione dal carrello"));
    } else {
      addToCart({ title, thumbnail, price }).then(() => {
        img.src = "img/remove-from-cart.png";
        img.title = "Rimuovi dal carrello";
        loadCartItems();
      }).catch(() => alert("Errore nell'aggiunta al carrello"));
    }
  }

  function removeFromCart(title) {
    return fetch("/remove-from-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
      credentials: 'same-origin'  // 
    }).then(res => res.json())
      .then(data => {
        if (!data.ok) return Promise.reject(data.error || "Errore");
      });
  }

  function addToCart(product) {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("thumbnail", product.thumbnail);
    formData.append("price", product.price);

    return fetch("/add-to-cart", {
      method: "POST",
      body: formData,
    }).then(res => res.json())
      .then(data => {
        if (!data.ok) return Promise.reject(data.error || "Errore");
      });
  }

  function updateCartIcon(title) {
    const btn = document.querySelector(`.cart-btn[data-title="${CSS.escape(title)}"]`);
    if (btn) {
      const img = btn.querySelector("img.cart-icon");
      if (img) {
        img.src = "img/add-to-cart.png";
        img.title = "Aggiungi al carrello";
      }
    }
  }
});
function chiudiAltriModaliNav(activeModalId) {
  const navModals = ['#nav-donna', '#nav-uomo', '#nav-bskteen'];
  for (let modalId of navModals) {
    if (modalId !== activeModalId) {  // nascondo tutti i modali tranne quello passato come parametro
        const modal = document.querySelector(modalId);
        if (modal) {
            modal.classList.remove('show');
            modal.classList.add('hidden');
        }
    }
  }
}

function apriModale(triggerSelector, modalSelector) {
  document.querySelector(triggerSelector).addEventListener('click', () => {
    chiudiAltriModaliNav(modalSelector); 
    const modale = document.querySelector(modalSelector);
    modale.classList.remove('hidden');
    modale.classList.add('show');
  });
}

function chiudiModale(closeBtnSelector, modalSelector) {
document.querySelector(closeBtnSelector).addEventListener('click', () => {
  const modale = document.querySelector(modalSelector);
  modale.classList.remove('show');
  modale.classList.add('hidden');
});
}

apriModale('#linksRIGHT a:nth-child(3)', '#cart-modal');
chiudiModale('.close-btn-cart', '#cart-modal');

function chiudiNavModale(modalSelector) {
const navModale = document.querySelector(modalSelector);

navModale.addEventListener('mouseleave', () => {
  navModale.classList.remove('show');
  navModale.classList.add('hidden');
});
}

apriModale('#linksLEFT a:nth-child(1)', '#nav-donna');
apriModale('#linksLEFT a:nth-child(2)', '#nav-uomo');
apriModale('#linksLEFT a:nth-child(3)', '#nav-bskteen');

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

  for (let el of elementsToToggle) {
      if (el) {
          el.style.display = isSearchOpen ? 'none' : '';
      }
  }

  navbar.style.borderBottom = isSearchOpen ? 'none' : '1px solid black';

  searchText.textContent = isSearchOpen ? "CHIUDI" : "CERCA";
  searchIcon.src = isSearchOpen ? "./img/close-icon.png" : "./img/54481.png";

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

const tabs = document.querySelectorAll('#gender-tabs .tab');
const contents = document.querySelectorAll('.menu-content');

tabs.forEach(tab => {
  tab.addEventListener('click', function (e) {
    e.preventDefault();

    tabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');

    const gender = this.getAttribute('data-gender');
    contents.forEach(content => content.style.display = 'none');
    document.getElementById('menu-' + gender).style.display = 'block';
  });
});


/* API CONVERSIONE VALUTA */
const currencySelector = document.getElementById('currency-selector');
const menuValuta = document.getElementById('currency-menu');
const currencyDropdown = document.getElementById('currency');

const symbols = {
  EUR: '€',
  USD: '$',
  GBP: '£',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF'
};

// imposto la valuta corrente
let currentCurrency = 'EUR'; 
if (currencyDropdown) {
  currentCurrency = currencyDropdown.value;
}

// creo un oggetto per la conversione inversa (es. da € a EUR)
const reverseSymbols = {};
for (const code in symbols) {
  reverseSymbols[symbols[code]] = code; // code è la chiave
}

if (currencySelector && menuValuta) {
  currencySelector.addEventListener("click", () => {
    menuValuta.classList.toggle("hidden");
  });
}

if (currencyDropdown && menuValuta) {
  currencyDropdown.addEventListener('change', () => { 
    const selectedCurrency = currencyDropdown.value;
    currentCurrency = selectedCurrency;   //	aggiorno la variabile currentCurrency.
    console.log('Valuta selezionata:', selectedCurrency);
    menuValuta.classList.add('hidden');
    updateExchangeRates(selectedCurrency); // aggiorno i prezzi 
  });
}

// funzione per aggiornare i prezzi in base alla valuta selezionata
function updateExchangeRates(toCurrency, container = document) {
  const priceSelectors = ['.price', '.price-red', '.price-old', '.wl-price', '.cart-item-price', '.product-price'];
  const priceElements = container.querySelectorAll(priceSelectors.join(', '));

  for (const priceElement of priceElements) { // tolgo spazi prima/dopo.
    const text = priceElement.textContent.trim();

    let matchedSymbol = null;
    let symbolLength = 0;

    // Controllo il testo se termina con un simbolo
    for (const symbol of Object.values(symbols)) {
      if (text.endsWith(symbol)) {  
        matchedSymbol = symbol;
        symbolLength = symbol.length;
        break;
      }
    }
    if (!matchedSymbol) continue;

    const amountText = text.slice(0, -symbolLength).trim().replace(',', '.'); // rimuovo il simbolo
    const amount = parseFloat(amountText);
    if (amount !== amount) continue;
    const fromCurrency = reverseSymbols[matchedSymbol];
    if (fromCurrency === toCurrency) continue;  // se la valuta è già quella selezionata, non faccio nulla

    fetch(`/convert_currency?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
    .then(response => {
      if (!response.ok) throw 'Errore nella richiesta al server PHP';
      return response.json();
    })
    .then(data => {
      if (data.error) throw data.error;
      const converted = parseFloat(data.converted).toFixed(2);
      const newSymbol = symbols[toCurrency] || toCurrency;  // se non trovo il simbolo, uso il codice valuta
      priceElement.textContent = `${converted} ${newSymbol}`;
    })
    .catch(error => {
      console.error('Errore:', error);
    });
  }
}

// API TRADUZIONE
const languageSelectorButton = document.getElementById('language-selector');
const languageMenu = document.getElementById('language-menu');
const languageDropdown = document.getElementById('language');
const translationCache = {};

if (languageSelectorButton && languageMenu) {
  languageSelectorButton.addEventListener('click', () => {
    languageMenu.classList.toggle('hidden');
  });
}

if (languageDropdown) {
  languageDropdown.addEventListener('change', () => {
    const selectedLanguage = languageDropdown.value;

    // Seleziona gli elementi da tradurre
    const elementsToTranslate = document.querySelectorAll(
      '#linksLEFT a, #gender-tabs a, .menu-content li, #linksRIGHT a, #search-text, .box-text h1, .product-text, .text_wrapper a, .gtl-text-container p, .cta-button, .suggested-text h2, .suggested-product h3, .spam-conto h2, .spam-conto p, .spam-conto a, .footer-container h3, .footer-container #traslate, .footer-container .small-text, .footer-container a, .modal-title, #facebook-access, .privacy-text, .login-options .traslate, .login-submit .traslate, .signup-link, .cart-header h2, .favorites-btn .traslate, .cart-empty-content h3, .cart-empty-content p, .cart-empty-content .discover-btn, .nav-menu a, .top-search-tag .traslate, .top-search-suggest h3, .product-name, .search-input-page'
    );

    let currentIndex = 0;

    // Funzione ricorsiva per tradurre un elemento alla volta
    function translateNextElement() {
      if (currentIndex >= elementsToTranslate.length) {
        languageMenu?.classList.add('hidden');
        return;
      }

      const element = elementsToTranslate[currentIndex++];
      const originalText = element.textContent.trim();
      if (!originalText) return translateNextElement();

      // Se la lingua è italiano non tradurre
      if (selectedLanguage === 'it') return translateNextElement();

      // Se la traduzione è già in cache, usala
      if (translationCache[originalText]) {
        element.textContent = translationCache[originalText];
        return translateNextElement();
      }
      fetch(`/translate?text=${encodeURIComponent(originalText)}&to=${selectedLanguage}`)
        .then(response => response.json())
        .then(data => {
          if (data.translatedText) {
            element.textContent = data.translatedText;
            translationCache[originalText] = data.translatedText;
          }
          translateNextElement();
        })
        .catch(() => {
          // Se errore, continua con il prossimo
          translateNextElement();
        });
    }
    translateNextElement();
  });
}

/* SEARCH PAGE */
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

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fav-icon")) toggleFavorite(e.target);
    if (e.target.closest(".cart-btn")) toggleCart(e.target.closest(".cart-btn"));
  });

  // === FUNZIONI DI RICERCA ===
  function handleSearch(query) {
    fetch(`/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        resultsContainer.replaceChildren();   // svuoto i risultati precedenti
        hideSuggestions();
  
        if (!data.shopping_results || data.shopping_results.length === 0) {
          const empty = document.createElement("p");
          empty.textContent = "Nessun risultato trovato.";
          resultsContainer.appendChild(empty);
          return;
        }
        Promise.all([ // carico in parallelo preferiti e carrello
          fetch("/load-favorites").then(res => res.json()),
          fetch("/fetch-cart").then(res => res.json())
        ]).then(([favorites, cartItems]) => {
          for (const item of data.shopping_results) {
            const favoriteItem = favorites.find(fav => fav.title === item.title);
            const cartItem = cartItems.find(cart => cart.title === item.title);
           
            const isFav = Boolean(favoriteItem);
            const isInCart = Boolean(cartItem);
          
            if (isFav) item.favId = favoriteItem.id;
            if (isInCart) item.cartId = cartItem.id;
          
            const card = createProductCard(item, isFav, isInCart);
            resultsContainer.appendChild(card);
          }
  
          updateExchangeRates(currentCurrency, resultsContainer); // aggiorno i prezzi dopo la ricerca
        });
      })
      .catch(() => {
        const error = document.createElement("p");
        error.textContent = "Errore nel caricamento dei risultati.";
        resultsContainer.replaceChildren(error);
      });
  }

  function createProductCard(item, isFav, isInCart, toCurrency = 'EUR') {
    const template = document.querySelector(".product-card.template"); 
    const card = template.cloneNode(true);  
    card.classList.remove("template", "hidden");
    card.dataset.item = JSON.stringify(item); // salvo l'oggetto prodotto nel dataset, oggetto->string
  
    const img = card.querySelector(".product-image");
    img.src = item.thumbnail;
    img.alt = item.title;
  
    const name = card.querySelector(".product-name");
    name.textContent = item.title;
  
    const price = card.querySelector(".product-price");
    price.textContent = item.extracted_price ? item.extracted_price.toFixed(2) + " €" : "";
  
    const favIcon = card.querySelector(".fav-icon");
    favIcon.src = isFav ? 'img/filled-hearth-search-page.png' : 'img/hearth-search-page.png';
    favIcon.alt = "cuoricino";
    favIcon.title = isFav ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti";
    favIcon.dataset.id = item.id || '';
  
    const cartBtn = card.querySelector(".cart-btn");
    cartBtn.dataset.title = item.title;
    cartBtn.dataset.thumbnail = item.thumbnail;
    cartBtn.dataset.price = item.extracted_price || 0;
    cartBtn.dataset.id = item.id || "";
  
    const cartIcon = cartBtn.querySelector(".cart-icon");
    cartIcon.src = isInCart ? 'img/remove-from-cart.png' : 'img/add-to-cart.png';
    cartIcon.alt = "carrello";
    cartIcon.title = isInCart ? "Rimuovi dal carrello" : "Aggiungi al carrello";
  
    updateExchangeRates(toCurrency, card);
  
    return card;
  }

  function showSuggestions() {
    resultsContainer.replaceChildren();
    suggestSection?.classList.remove("hidden");
    suggestTitle?.classList.remove("hidden");
    topSearchTags?.classList.remove("hidden");
  }
  
  function hideSuggestions() {
    suggestSection?.classList.add("hidden");
    suggestTitle?.classList.add("hidden");
    topSearchTags?.classList.add("hidden");
  }

  // === FUNZIONI WISHLIST ===
  function toggleFavorite(icon) {
    const card = icon.closest(".product-card");
    const item = JSON.parse(card.dataset.item);
    const isFav = icon.src.includes("filled-hearth-search-page.png");

    if (isFav) { 
      if (!item.favId) {
        alert("ID mancante, impossibile rimuovere dai preferiti.");
        return;
      }
      
      removeFavorite(item.favId).then(() => {
        icon.src = "img/hearth-search-page.png";
        icon.title = "Aggiungi ai preferiti";
        delete item.favId;  // tolgo la proprietà favId dall'oggetto
        card.dataset.item = JSON.stringify(item); // aggiorno il dataset 
      }).catch(() => alert("Errore nella rimozione dai preferiti"));
      
    } else {
      saveFavorite(item).then((data) => {
        if (!data.ok) return Promise.reject(data.error || "Errore");

        icon.src = "img/filled-hearth-search-page.png";
        icon.title = "Rimuovi dai preferiti";

        if (data.id) {
          // salvo l'id restituito dal DB, così da poter rimuovere senza doverlo ricaricare
          item.favId = data.id; // aggiungo la proprietà favId all'oggetto
          card.dataset.item = JSON.stringify(item);
        }
      }).catch(() => alert("Errore nell'aggiunta ai preferiti"));
    }
  }

  function removeFavorite(id) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    return fetch("/remove-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken
      },
      body: JSON.stringify({ id }), 
      credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(data => {
      if (!data.ok) return Promise.reject(data.error || "Errore");
    });
  }

  function saveFavorite(product) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    return fetch("/save-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken
      },
      body: JSON.stringify({
        title: product.title || '',
        snippet: product.snippet || '',
        price: product.extracted_price || '',
        thumbnail: product.thumbnail || ''
      }),
      credentials: 'same-origin'
    })
    .then(res => res.json());
  }

  // === FUNZIONI CARRELLO ===
  function toggleCart(btn) {
    const card = btn.closest(".product-card");
    const item = JSON.parse(card.dataset.item); 
    const img = btn.querySelector("img.cart-icon");
    const isInCart = img.src.includes("remove-from-cart.png");  // verifica se l'icona è quella del carrello pieno
  
    if (isInCart) { 
      if (!item.cartId) {
        alert("ID mancante, impossibile rimuovere dal carrello.");
        return;
      }
  
      removeFromCart(item.cartId).then(() => {
        img.src = "img/add-to-cart.png";
        img.title = "Aggiungi al carrello";
        delete item.cartId; // tolgo la proprietà cartId dall'oggetto
        card.dataset.item = JSON.stringify(item); // aggiorno il dataset
      }).catch(() => alert("Errore nella rimozione dal carrello"));
  
    } else {
      addToCart(item).then((data) => {
        if (!data.ok) return Promise.reject(data.error || "Errore");
  
        img.src = "img/remove-from-cart.png";
        img.title = "Rimuovi dal carrello";
  
        if (data.id) {
          item.cartId = data.id;  // aggiungo la proprietà cartId all'oggetto
          card.dataset.item = JSON.stringify(item);
        }
      }).catch(() => alert("Errore nell'aggiunta al carrello"));
    }
  }

  function removeFromCart(id) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
    return fetch("/remove-from-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken
      },
      body: JSON.stringify({ id }),
      credentials: 'same-origin'
    })
    .then(res => res.json()) 
    .then(data => {
      if (!data.ok) return Promise.reject(data.error || "Errore");
      loadCartItems(); 
      return data;
    });
  }

  function addToCart(item) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
    return fetch("/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken
      },
      body: JSON.stringify({
        title: item.title || '',
        thumbnail: item.thumbnail || '',
        price: item.price || item.extracted_price || 0, 
        snippet: item.snippet || ''
      }),
      credentials: 'same-origin'
    })
    .then(res => res.json()) 
    .then(data => {
      if (!data.ok) return Promise.reject(data.error || "Errore");
      loadCartItems();
      return data;
    });
  }
});

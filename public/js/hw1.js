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

for (let tab of tabs) {
  tab.addEventListener('click', function (e) {
    e.preventDefault();

    for (let t of tabs) {
      t.classList.remove('active');
    }
    this.classList.add('active');

    const gender = this.getAttribute('data-gender');

    for (let content of contents) {
      content.style.display = 'none';
    }
    document.getElementById('menu-' + gender).style.display = 'block';
  });
}

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
// creo un oggetto per la conversione inversa (es. da € a EUR)
const reverseSymbols = {};
for (const code in symbols) {
  reverseSymbols[symbols[code]] = code;
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

    const amountText = text.slice(0, -symbolLength).trim().replace(',', '.');
    const amount = parseFloat(amountText);
    if (isNaN(amount)) continue;  // skip se numero non valido

    const fromCurrency = reverseSymbols[matchedSymbol];
    if (fromCurrency === toCurrency) continue;  // se la valuta è già quella selezionata, non faccio nulla

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
  }
}

// dopo una ricerca conversione su nuovi elementi 
let currentCurrency = 'EUR'; 
if (currencyDropdown) {
  currentCurrency = currencyDropdown.value;
}

// controllo se il contenitore dei risultati dinamici esiste
const dynamicContainer = document.getElementById('results-container'); 

if (dynamicContainer) {
  const observer = new MutationObserver(() => { // oggetto per osservare le modifiche al DOM
    updateExchangeRates(currentCurrency);
  });

  observer.observe(dynamicContainer, { childList: true, subtree: true });
}

// TRADUZIONE
const selector = document.getElementById('language-selector');
const menuTraslate = document.getElementById('language-menu');
const languageSelect = document.getElementById('language');

if (selector && menuTraslate) {
  selector.addEventListener('click', () => {
    menuTraslate.classList.toggle('hidden');
  });
}

const translationCache = {};

if (languageSelect) {
  languageSelect.addEventListener('change', () => {
    const selectedLang = languageSelect.value;

    const elements = document.querySelectorAll(
      '#linksLEFT a, #gender-tabs a, .menu-content li, #linksRIGHT a, #search-text, .box-text h1, .product-text, .text_wrapper a, .gtl-text-container p, .cta-button, .suggested-text h2, .suggested-product h3, .spam-conto h2, .spam-conto p, .spam-conto a, .footer-container h3, .footer-container #traslate, .footer-container .small-text, .footer-container a, .modal-title, #facebook-access, .privacy-text, .login-options .traslate, .login-submit .traslate, .signup-link, .cart-header h2, .favorites-btn .traslate, .cart-empty-content h3, .cart-empty-content p, .cart-empty-content .discover-btn, .nav-menu a, .top-search-tag .traslate, .top-search-suggest h3, .product-name, .search-input-page'
    );

    const translateSequentially = async () => {
      for (const el of elements) {
        const originalText = el.textContent.trim();
        if (!originalText) continue;

        if (!el.dataset.original) {
          el.dataset.original = originalText;
        }

        if (selectedLang === 'it') {
          el.textContent = el.dataset.original;
          continue;
        }

        // controllo se il testo è già tradotto, ed evito di fare una nuova richiesta
        if (translationCache[originalText]) {
          el.textContent = translationCache[originalText];
          continue;
        }

        try {
          const res = await fetch(`/translate?text=${encodeURIComponent(originalText)}&to=${selectedLang}`);
          const data = await res.json();

          if (data.translatedText) {
            el.textContent = data.translatedText;
            translationCache[originalText] = data.translatedText; 
          }
        } catch (err) {
          console.error('Errore nella traduzione:', err);
        }
      }

      if (menuTraslate) {
        menuTraslate.classList.add('hidden');
      }
    };

    translateSequentially();
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
        resultsContainer.replaceChildren();
        hideSuggestions();
  
        if (!data.shopping_results || data.shopping_results.length === 0) {
          const empty = document.createElement("p");
          empty.textContent = "Nessun risultato trovato.";
          resultsContainer.appendChild(empty);
          return;
        }
  
        Promise.all([
          fetch("/load-favorites").then(res => res.json()),
          fetch("/fetch-cart").then(res => res.json())
        ]).then(([favorites, cartItems]) => {
          for (const item of data.shopping_results) {
            const favoriteItem = favorites.find(fav => fav.title === item.title);
            const isFav = Boolean(favoriteItem);
            const isInCart = cartItems.some(cart => cart.title === item.title);
  
            if (isFav) item.id = favoriteItem.id;
  
            const card = createProductCard(item, isFav, isInCart);
            resultsContainer.appendChild(card);
          }
        });
      })
      .catch(() => {
        const error = document.createElement("p");
        error.textContent = "Errore nel caricamento dei risultati.";
        resultsContainer.replaceChildren(error);
      });
  }

  function createProductCard(item, isFav, isInCart, toCurrency = 'EUR') {
    const card = document.createElement("div");
    card.className = "product-card p-c-search";
    card.dataset.item = JSON.stringify(item);

    const img = document.createElement("img");
    img.className = "product-image";
    img.src = item.thumbnail;
    img.alt = item.title;

    const productInfo = document.createElement("div");
    productInfo.className = "product-info";

    const leftInfo = document.createElement("div");
    leftInfo.className = "left-info";

    const name = document.createElement("p");
    name.className = "product-name";
    name.textContent = item.title;

    const priceLine = document.createElement("div");
    priceLine.className = "price-line";

    const price = document.createElement("span");
    price.className = "product-price";
    if (item.extracted_price) price.textContent = item.extracted_price.toFixed(2) + " €";
    priceLine.appendChild(price);

    if (item.discount) {
      const discount = document.createElement("span");
      discount.className = "discount";
      discount.textContent = item.discount;
      priceLine.appendChild(discount);
    }

    leftInfo.appendChild(name);
    leftInfo.appendChild(priceLine);

    if (item.previous_price) {
      const oldPrice = document.createElement("p");
      oldPrice.className = "price-old";
      oldPrice.textContent = item.previous_price.toFixed(2) + " €";
      leftInfo.appendChild(oldPrice);
    }

    const rightIcon = document.createElement("div");
    rightIcon.className = "right-icon";

    const favIcon = document.createElement("img");
    favIcon.className = "fav-icon";
    favIcon.src = isFav ? 'img/filled-hearth-search-page.png' : 'img/hearth-search-page.png';
    favIcon.alt = "cuoricino";
    favIcon.title = isFav ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti";

    const cartBtn = document.createElement("a");
    cartBtn.className = "cart-btn";
    cartBtn.dataset.title = item.title;
    cartBtn.dataset.thumbnail = item.thumbnail;
    cartBtn.dataset.price = item.extracted_price || 0;

    const cartIcon = document.createElement("img");
    cartIcon.className = "cart-icon";
    cartIcon.src = isInCart ? 'img/remove-from-cart.png' : 'img/add-to-cart.png';
    cartIcon.alt = "carrello";
    cartIcon.title = isInCart ? "Rimuovi dal carrello" : "Aggiungi al carrello";

    cartBtn.appendChild(cartIcon);
    rightIcon.appendChild(favIcon);
    rightIcon.appendChild(cartBtn);

    productInfo.appendChild(leftInfo);
    productInfo.appendChild(rightIcon);
    card.appendChild(img);
    card.appendChild(productInfo);

    updateExchangeRates(toCurrency, card);  
    return card;
  }

  function showSuggestions() {
    resultsContainer.replaceChildren();
    if (suggestSection) suggestSection.style.display = "block";
    if (suggestTitle) suggestTitle.style.display = "block";
    if (topSearchTags) topSearchTags.style.display = "flex";
  }

  function hideSuggestions() {
    if (suggestSection) suggestSection.style.display = "none";
    if (suggestTitle) suggestTitle.style.display = "none";
    if (topSearchTags) topSearchTags.style.display = "none";
  }

  // === FUNZIONI WISHLIST ===
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
        delete item.id;
        card.dataset.item = JSON.stringify(item);
      }).catch(() => alert("Errore nella rimozione dai preferiti"));
      
    } else {
      saveFavorite(item).then((data) => {
        if (!data.ok) return Promise.reject(data.error || "Errore");

        icon.src = "img/filled-hearth-search-page.png";
        icon.title = "Rimuovi dai preferiti";

        if (data.id) {
          item.id = data.id;
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
        // Icona aggiornata direttamente qui
      }).catch(() => alert("Errore nella rimozione dal carrello"));
    } else {
      addToCart({ title, thumbnail, price }).then(() => {
        img.src = "img/remove-from-cart.png";
        img.title = "Rimuovi dal carrello";
        loadCartItems();
        // Icona aggiornata direttamente qui
      }).catch(() => alert("Errore nell'aggiunta al carrello"));
    }
  }

  function removeFromCart(title) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    return fetch("/remove-from-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken
      },
      body: JSON.stringify({ title }),
      credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(data => {
      if (!data.ok) return Promise.reject(data.error || "Errore");
      // Se vuoi aggiornare icona qui, va bene ma è meglio farlo in toggleCart
    });
  }

  function addToCart(product) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    return fetch("/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken
      },
      body: JSON.stringify({
        title: product.title,
        snippet: product.snippet || '',
        price: product.price,
        thumbnail: product.thumbnail
      }),
      credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(data => {
      if (!data.ok) return Promise.reject(data.error || "Errore");
      // Anche qui aggiorna l'icona in toggleCart
    });
  }
});

/*
come funziona cart-modal
dove carica gli elementi del carrello
utilizzare al meglio i models per ogni funzione
definire meglio cosa è asincrono e cosa no



*/
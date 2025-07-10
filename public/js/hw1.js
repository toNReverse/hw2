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

  elementsToToggle.forEach(el => {
      if (el) {
          el.style.display = isSearchOpen ? 'none' : '';
      }
  });

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
    currentCurrency = selectedCurrency; 
    console.log('Valuta selezionata:', selectedCurrency);
    menuValuta.classList.add('hidden');
    updateExchangeRates(selectedCurrency);
  });
}

function updateExchangeRates(toCurrency, container = document) {
  const priceSelectors = ['.price', '.price-red', '.price-old', '.wl-price', '.cart-item-price', '.product-price'];
  const priceElements = container.querySelectorAll(priceSelectors.join(', '));

  priceElements.forEach(priceElement => {
    const text = priceElement.textContent.trim();

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

    const amountText = text.slice(0, -symbolLength).trim().replace(',', '.');
    const amount = parseFloat(amountText);
    if (isNaN(amount)) return;

    const fromCurrency = reverseSymbols[matchedSymbol];
    if (fromCurrency === toCurrency) return;

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
// === Auto-conversione su nuovi elementi dinamici (es. dopo una ricerca) ===
let currentCurrency = 'EUR'; 
if (currencyDropdown) {
  currentCurrency = currencyDropdown.value;
}

// Controlla se il contenitore dei risultati dinamici esiste
const dynamicContainer = document.getElementById('results-container'); 

if (dynamicContainer) {
  const observer = new MutationObserver(() => {
    updateExchangeRates(currentCurrency);
  });

  observer.observe(dynamicContainer, { childList: true, subtree: true });
}
const selector = document.getElementById('language-selector');
const menuTraslate = document.getElementById('language-menu');
const languageSelect = document.getElementById('language');

if (selector && menuTraslate) {
  selector.addEventListener('click', () => {
    menuTraslate.classList.toggle('hidden');
  });
}

// Traduzione al cambio lingua
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

  function createProductCard(item, isFav, isInCart, toCurrency = 'EUR') {
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
  
    updateExchangeRates(toCurrency, card);  
  
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

        delete item.id;
        card.dataset.item = JSON.stringify(item);
      }).catch(() => alert("Errore nella rimozione"));
    } else {
      saveFavorite(item).then((data) => {
        if (data.ok) {
          icon.src = "img/filled-hearth-search-page.png";
          icon.title = "Rimuovi dai preferiti";

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
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
    return fetch("/remove-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfToken 
      },
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(data => {
        if (!data.ok) return Promise.reject(data.error || "Errore");
        return data;
      });
  }
  
  function saveFavorite(product) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
    const formData = new FormData();
    formData.append("title", product.title || "");
    formData.append("snippet", product.snippet || "");
    formData.append("price", product.extracted_price || "");
    formData.append("thumbnail", product.thumbnail || "");
  
    return fetch("/save-product", {
      method: "POST",
      headers: {
        "X-CSRF-TOKEN": csrfToken
      },
      body: formData
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
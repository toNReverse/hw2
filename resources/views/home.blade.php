
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="{{ url('css/hw1.css') }}">
  <script src="{{ url('js/hw1.js') }}" defer></script>
  <script src="{{ url('js/cart-modal.js') }}" defer></script>
  <script src="https://js.stripe.com/v3/"></script>
  <script src="{{ url('js/checkout.js') }}" defer></script>
  
  <title>Bershka Uomo | Novità e Tendenze 2025</title>
</head>
<body>
  <header>
    <nav class="navbar-container">
      <div id="linksLEFT">
        <a>Donna</a>
        <a>Uomo</a>
        <a>BSKTEEN</a>
    
        <div id="menu-mobile">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    
      <!-- MENU LATERALE -->
      <div id="side-menu">
        <button id="close-menu">✕</button>

        <div id="gender-tabs">
          <a href="#" class="tab" data-gender="donna">DONNA</a>
          <a href="#" class="tab active" data-gender="uomo">UOMO</a>
          <a href="#" class="tab" data-gender="bskteen">BSK TEEN</a>
        </div>

        <ul class="menu-content" id="menu-donna" style="display: none;">
          <li><strong>COMBO WINS %</strong><br><small>Fino al 10% di sconto</small></li>
          <li>NOVITÀ</li>
          <li>ABBIGLIAMENTO</li>
          <li>SCARPE</li>
          <li>ACCESSORI</li>
          <li>OUT OF CORE</li>
          <li>PERSONALIZZAZIONE 🌈</li>
          <li>THE BERSHKA PRINT SHOP</li>
          <li class="special">SPECIAL PRICES <span class="new">NEW ITEMS</span></li>
        </ul>
        
        <ul class="menu-content" id="menu-uomo">
          <li><strong>COMBO WINS %</strong><br><small>Fino al 10% di sconto</small></li>
          <li>NOVITÀ</li>
          <li>ABBIGLIAMENTO</li>
          <li>SCARPE</li>
          <li>ACCESSORI</li>
          <li>OUT OF CORE</li>
          <li>PERSONALIZZAZIONE 🌈</li>
          <li>THE BERSHKA PRINT SHOP</li>
          <li class="special">SPECIAL PRICES <span class="new">NEW ITEMS</span></li>
        </ul>
        
        <ul class="menu-content" id="menu-bskteen" style="display: none;">
          <li><strong>HELLO KITTY</strong> <span class="new" style="color: blue;">NEW</span></li>
          <li>NOVITÀ</li>
          <li>ABBIGLIAMENTO</li>
          <li>SCARPE</li>
          <li>ACCESSORI</li>
          <li>OUT OF CORE</li>
          <li>PERSONALIZZAZIONE 🌈</li>
          <li>THE BERSHKA PRINT SHOP</li>
          <li class="special">SPECIAL PRICES <span class="new">NEW ITEMS</span></li>
        </ul>
      </div>

      <div id="logo">
        <a href="{{ url('home') }}">BERSHKA</a>
      </div>
      <div id="linksRIGHT">
        <div class="search-container">
            <img src="{{ url('img/54481.png') }}" alt="Search" class="search-icon"><span id="search-text">CERCA</span>
        </div>
        @if(session('user_id'))
            <a href="{{ url('profile') }}" class="user-link">{{ session('_agora_name') }}</a>
        @else
            <a href="{{ url('login') }}" id="login">Accedi</a>
        @endif

        <a>Carrello</a>
      </div>
    </nav>
    <div id="cart-modal" class="modal hidden">
      <div class="model">
        <button class="close-btn-cart" aria-label="Chiudi carrello">&times;</button>

        <div class="cart-header">
          <h2>Carrello</h2>
          <div class="cart-actions">
            <a href="{{ url('wishlist') }}" class="favorites-btn">
              <span class="icon"><img src="./img/heart-icon.png" alt="cuoricino"></span> 
              <span class="traslate">Preferiti</span>
            </a>
          </div>
        </div>

        <!-- Contenitore prodotti -->
        <div class="cart-items hidden" id="cart-items-container">
          <div class="cart-item template hidden">
            <img src="" alt="" class="cart-item-image">
            <div class="cart-item-info">
              <p class="cart-item-title"></p>
              <p class="cart-item-price"></p>
            </div>
            <button class="remove-cart-item-btn" data-title="" aria-label="Rimuovi dal carrello">&times;</button>            
          </div>
        </div>
        
        <a href="#" id="checkout-button" class="checkout-button">PAGA ORA</a>

        <!-- Stato carrello vuoto -->
        <div class="cart-empty-content" id="cart-empty-content">
          <img src="img/nobg.png" alt="Cuore spezzato" class="broken-heart" />
          <h3>Carrello vuoto</h3>
          <p>Non hai ancora nessun articolo nel carrello: scopri tutto quello che abbiamo in serbo per te</p>
          <a href="{{ url('wishlist') }}" class="discover-btn">VAI AI PREFERITI</a>
        </div>
      </div>
    </div>
  <!-- MENU API CONVERSIONE VALUTA-->
  <div id="currency-selector">💱</div>
  <div id="currency-menu" class="hidden">
    <select id="currency">
      <option value="EUR">€ Euro</option>
      <option value="USD">$ US Dollar</option>
      <option value="GBP">£ Pound</option>
      <option value="JPY">Yen (¥)</option>
      <option value="CAD">Canadian Dollar (C$)</option>
      <option value="AUD">Australian Dollar (A$)</option>
      <option value="CHF">Swiss Franc (CHF)</option>
    </select>
  </div>

 <!-- MENU API TRADUZIONE -->
<div id="language-selector">🌐</div>
<div id="language-menu" class="hidden">
    <select id="language">
        <option value="it">Italiano 🇮🇹</option>
        <option value="en">English 🇬🇧</option>
        <option value="fr">Français 🇫🇷</option>
        <option value="de">Deutsch 🇩🇪</option>
    </select>
</div>
    <section>
      <div class="box-slideshow">
        <div class="slideshow-container"> <!-- Inserisci le altre immagini --> 
          <img src="./img/1D_slide_man_newin_-1.jpg" alt="Promo 3" class="box-image">
        </div>  
        <div class="box-text">
          <h1>novità</h1>
        </div>
      </div>
      <div class = "background-bianco">
        <div class="flex-container">
          <div class="product-grid">
            <div class="product-item">
                <img src="./img/1tshirt.jpg" alt="Prodotto 1">
                <div class="product-text">Magliette</div>
            </div>
            <div class="product-item">
                <img src="./img/2trouser.jpg" alt="Prodotto 2">
                <div class="product-text">Pantaloni</div>
            </div>
            <div class="product-item">
                <img src="./img/3knitwear.jpg" alt="Prodotto 3">
                <div class="product-text">Felpe</div>
            </div>
            <div class="product-item">    
                <img src="./img/4shorts.jpg" alt="Prodotto 4">
                <div class="product-text">Bermuda</div>
            </div>
            <div class="product-item">
                <img src="./img/5tracksuit.jpg" alt="Prodotto 5">
                <div class="product-text">Pantaloni</div>
            </div>
            <div class="product-item">
                <img src="./img/6shoes.jpg" alt="Prodotto 6">
                <div class="product-text">Scarpe</div>
            </div>
          </div>
          <div class="slide_container">
            <img src="./img/outofcore.jpg" alt="Out of Core" class="outofcore-img">
            <div class="text_wrapper">
              <p>NEW FOOTWEAR BRAND BY RAL7000STUDIO</p>
              <h2>Out of Core</h2>
              <a>Acquista</a>
            </div>
          </div>
          <div class="rett-nero">
            <div class="get-the-look">
              <div class="gtl-text-container">
                <h1>-> GET THE LOOK</h1>
                <p>FATTI ISPIRARE CON LA NOSTRA GALLERIA E CONDIVIDI I TUOI LOOK<br>
                  SUI SOCIAL CON @BERSHKA E #BERSHKASTYLE.</p>
              </div>
              <a href="#" class="cta-button">Vedi tutti i modelli</a>
            </div>
            <div class="look-gallery">
              <div class="look-card">
                <img src="./img/streetwear.webp" alt="Streetwear">
                <p>STREETWEAR</p>
              </div>
              <div class="look-card">
                <img src="./img/casual.webp" alt="Casual">
                <p>CASUAL</p>
             </div>
             <div class="look-card">
                <img src="./img/basic.webp" alt="Basic">
                <p>BASIC</p>
              </div>
              <div class="look-card">
                <img src="./img/trendy.webp" alt="Trendy">
                <p>TRENDY</p>
              </div>
            </div>
          </div>
          <div class="suggested-text">
            <h2>-> Potrebbe interessarti</h2>
          </div>
          <div class="products">
            <div class="suggested-product">
                <img src="img/1prodsuggested.jpg" alt="Jeans loose baggy">
                <h3>Jeans loose baggy</h3>
                <p class="price">35,99 €</p>
            </div>
    
            <div class="suggested-product">
                <img src="img/2prodsuggested.jpg" alt="Mocassini con frange e nappa">
                <h3>Mocassini con frange e nappa</h3>
                <p class="price">39,99 €</p>
            </div>
    
            <div class="suggested-product">
                <img src="img/3prodsuggested.jpg" alt="Jeans super baggy">
                <h3>Jeans super baggy</h3>
                <p class="price">39,99 €</p>
            </div>
    
            <div class="suggested-product">
                <img src="img/4prodsuggested.jpg" alt="Jeans baggy">
                <h3>Jeans baggy</h3>
                <p class="price">35,99 €</p>
            </div>
          </div>
          <div class="bershka-music">
            <img src="img/bershka-music.jpg">
          </div>
          <div class="spam-conto">
            <h2>APPROFITTA DEL 10% DI SCONTO</h2>
            <p>Iscriviti alla nostra newsletter e avrai uno sconto del 10% sul tuo prossimo acquisto, l’accesso a promozioni esclusive e molto altro!</p>
            <a>Iscriviti</a>
          </div>
        </div>
      </div>
      <footer>
        <div class="footer-container">
          <div class="footer-column">
            <h3>Ti serve una mano?</h3>
            <p><img class="wa-icon" src="img/whatsapp.png"><strong id = "traslate">WhatsApp</strong></p>
            <p>💻 <strong id = "traslate">Accedi alla chat</strong></p>
            <p class="small-text">Da lunedì a venerdì dalle 10:00 alle 16:00.</p>  
            <p>📞 <strong id = "traslate">Chiama 800 875 613</strong></p>
            <p class="small-text">Da lunedì a venerdì dalle 10:00 alle 16:00.</p>
          </div>
      
          <div class="footer-column">
            <h3>Aiuto</h3>
            <ul>
              <li><a href="#">Acquistare online</a></li>
              <li><a href="#">Pagamento</a></li>
              <li><a href="#">Invio</a></li>
              <li><a href="#">Resituzioni</a></li>
              <li><a href="#">Carta Regalo</a></li>
              <li><a href="#">Scontrino Regalo</a></li>
              <li><a href="#">Cerca scontrino</a></li>
              <li><a href="#">Acquista come ospite</a></li>
              <li><a href="#">Scontrino elettronico</a></li>
              <li><a href="#">Cancella la mia iscrizione</a></li>
            </ul>
          </div>
      
          <div class="footer-column">
            <h3>We are BERSHKA</h3>
            <ul>
              <li><a href="#">Guida all’imballaggio</a></li>
              <li><a href="#">Informazioni su BERSHKA</a></li>
              <li><a href="#">Sostenibilità</a></li>
              <li><a href="#">Lavora con noi</a></li>
              <li><a href="#">Stampa</a></li>
              <li><a href="#">I nostri negozi</a></li>
            </ul>
          </div>
      
          <div class="footer-column">
            <h3>Possiamo consigliarti</h3>
            <ul>
              <li><a href="#">Giubbotti donna</a></li>
              <li><a href="#">Vestiti donna</a></li>
              <li><a href="#">Top e body donna</a></li>
              <li><a href="#">Jeans donna</a></li>
              <li><a href="#">Pantaloni donna</a></li>
            </ul>
          </div>
          
          <div class="footer-column social">
            <h3>Seguici su</h3>
            <div class="social-icons">
              <a href="#"><img src="./img/instagram.svg"><i class="fab fa-instagram"></i></a>
              <a href="#"><img src="./img/facebook.svg"><i class="fab fa-facebook"></i></a>
              <a href="#"><img src="./img/twitter.svg"><i class="fab fa-twitter"></i></a>
              <a href="#"><img src="./img/tiktok.svg"><i class="fab fa-tiktok"></i></a>
              <a href="#"><img src="./img/snapchat.svg"><i class="fab fa-snapchat"></i></a>
              <a href="#"><img src="./img/youtube.svg"><i class="fab fa-youtube"></i></a>
              <a href="#"><img src="./img/pinterest.svg"><i class="fab fa-pinterest"></i></a>
              <a href="#"><img src="./img/spotify.svg"><i class="fab fa-spotify"></i></a>
            </div>
          </div>
        </div>
      
        <div class="footer-bottom">
          <p>🇮🇹 Italy | Italiano | © 2025 BERSHKA</p>
        </div>
      </footer>
    </section>
  </header>
  <!-- SIDE PAGE (ACCEDI, CARRELLO) **RIMOSSA**-->
  
  <div id="nav-donna" class="modal-nav hidden">  
    <div class="nav-content">
      <ul class="nav-menu">
        <li><a href="#">Combo wins % <span id = "off-txt">Fino al 10% di sconto</span></li></a>
        <li><a href="#">Novità</a></li>
        <li><a href="#">Abbigliamento <span class="arrow">→</span></a></li>
        <li><a href="#">Scarpe<span class="arrow">→</span></a></li>
        <li><a href="#">Accessori<span class="arrow">→</span></a></li>
        <li><a href="#">Out of core</a></li>
        <li><a href="#">Personalizzazione <span class="emoji">🎨</span></a></li>
        <li><a href="#">The BERSHKA Print Shop</a></li>
        <li><a href="#">Get the look<span id = "off-txt">#BERSHKASTYLE</span></li></a>
        <li><a href="#" class="special-link">Special prices <span class="badge badge-pink">New Items</span></a></li>
      </ul>
      <div class="get-the-look-nav">
        <h3>GET THE LOOK</h3>
        <div class="look-grid">
          <div class="look-item">
            <img src="./img/1donna-gtl-nav.webp" alt="Streetwear" />
            <p>Streetwear</p>
          </div>
          <div class="look-item">
            <img src="./img/2donna-gtl-nav.webp" alt="Casual" />
            <p>Casual</p>
          </div>
          <div class="look-item">
            <img src="./img/3donna-gtl-nav.webp" alt="Basic" />
            <p>Basic</p>
          </div>
          <div class="look-item">
            <img src="./img/4donna-gtl-nav.webp" alt="Trendy" />
            <p>Trendy</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="nav-uomo" class="modal-nav hidden">  
    <div class="nav-content">
      <ul class="nav-menu">
        <li><a href="#">Combo wins % <span id = "off-txt">Fino al 10% di sconto</span></li></a>
        <li><a href="#">Novità</a></li>
        <li><a href="#">Abbigliamento <span class="arrow">→</span></a></li>
        <li><a href="#">Scarpe<span class="arrow">→</span></a></li>
        <li><a href="#">Accessori<span class="arrow">→</span></a></li>
        <li><a href="#">Out of core</a></li>
        <li><a href="#">Personalizzazione <span class="emoji">🎨</span></a></li>
        <li><a href="#">The BERSHKA Print Shop</a></li>
        <li><a href="#">Get the look<span id = "off-txt">#BERSHKASTYLE</span></li></a>
        <li><a href="#" class="special-link">Special prices <span class="badge badge-pink">New Items</span></a></li>
      </ul>
      <div class="get-the-look-nav">
        <h3>GET THE LOOK</h3>
        <div class="look-grid">
          <div class="look-item">
            <img src="./img/1uomo-gtl-nav.webp" alt="Streetwear" />
            <p>Streetwear</p>
          </div>
          <div class="look-item">
            <img src="./img/2uomo-gtl-nav.webp" alt="Casual" />
            <p>Casual</p>
          </div>
          <div class="look-item">
            <img src="./img/3uomo-gtl-nav.webp" alt="Basic" />
            <p>Basic</p>
          </div>
          <div class="look-item">
            <img src="./img/4uomo-gtl-nav.webp" alt="Trendy" />
            <p>Trendy</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div id="nav-bskteen" class="modal-nav hidden"> 
    <div class="nav-content">
      <ul class="nav-menu">
        <li><a href="#">HELLO KITTY <span class="badge badge-blue">NEW</span></a></li>
        <li><a href="#">NOVITÀ</a></li>
        <li><a href="#">ABBIGLIAMENTO <span class="arrow">→</span></a></li>
        <li><a href="#">SCARPE</a></li>
        <li><a href="#">ACCESSORI</a></li>
        <li><a href="#">OUT OF CORE</a></li>
        <li><a href="#">PERSONALIZZAZIONE <span class="emoji">🎨</span></a></li>
        <li><a href="#">THE BERSHKA PRINT SHOP</a></li>
        <li><a href="#" class="special-link">SPECIAL PRICES <span class="badge badge-pink">NEW ITEMS</span></a></li>
      </ul>
    </div>
  </div>
<!-- SEARCH BAR -->
<div id="search-page">
  <div class="search-container-page">
    <img src="img/54481.png" alt="Search" class="search-icon">
    <input type="text" placeholder="CERCA" class="search-input-page">
  </div>

  <!-- Risultati dinamici della ricerca -->
  <div id="results" class="search-results product-container"></div>

  <!-- Tag di ricerca rapida -->
  <div class="top-search">
    <div class="top-search-tag">🔥 <span class="traslate">Body</span></div>
    <div class="top-search-tag">🔥 <span class="traslate">Top</span></div>
    <div class="top-search-tag">🔥 <span class="traslate">Felpe</span></div>
    <div class="top-search-tag">🔥 <span class="traslate">Camicia</span></div>
    <div class="top-search-tag">🔥 <span class="traslate">Borse</span></div>
  </div>

  <!-- Prodotti suggeriti statici -->
  <div class="top-search-suggest">
    <h3 class = "search-suggest-text">Possiamo consigliarti</h3>
    <div class="product-container static-products"> <!-- importante la classe -->
      <!-- I tuoi prodotti statici rimangono invariati -->
      <div class="product-card">
        <img src="img/top-s-1.jpg" alt="Jeans baggy">
        <div class="product-info">
          <div class="left-info">
            <p class="product-name">Jeans baggy</p>
            <div class="price-line">
              <span class="price-red">17,99 €</span>
              <span class="discount">-50%</span>
            </div>
            <p class="price-old">35,99 €</p>
          </div>
          <div class="right-icon">
            <img src="img/hearth-search-page.png" alt="cuoricino">
          </div>
        </div>
      </div>
        <div class="product-card">
          <img src="img/top-s-2.jpg" alt="Jeans baggy">
          <div class="product-info">
            <div class="left-info">
              <p class="product-name">Jeans baggy</p>
              <div class="price-line">
                <span class="price-red">17,99 €</span>
                <span class="discount">-50%</span>
              </div>
              <p class="price-old">35,99 €</p>
            </div>
            <div class="right-icon">
              <img src="img/hearth-search-page.png" alt="cuoricino">
            </div>
          </div>
        </div>
        <div class="product-card">
          <img src="img/top-s-3.jpg" alt="Jeans baggy">
          <div class="product-info">
            <div class="left-info">
              <p class="product-name">Jeans baggy</p>
              <div class="price-line">
                <span class="price-red">17,99 €</span>
                <span class="discount">-50%</span>
              </div>
              <p class="price-old">35,99 €</p>
            </div>
            <div class="right-icon">
              <img src="img/hearth-search-page.png" alt="cuoricino">
            </div>
          </div>
        </div>
        <div class="product-card">
          <img src="img/top-s-4.jpg" alt="Jeans baggy">
          <div class="product-info">
            <div class="left-info">
              <p class="product-name">Jeans baggy</p>
              <div class="price-line">
                <span class="price-red">17,99 €</span>
                <span class="discount">-50%</span>
              </div>
              <p class="price-old">35,99 €</p>
            </div>
            <div class="right-icon">
              <img src="img/hearth-search-page.png" alt="cuoricino">
            </div>
          </div>
        </div>
        <div class="product-card">
          <img src="img/top-s-5.jpg" alt="Jeans baggy">
          <div class="product-info">
            <div class="left-info">
              <p class="product-name">Jeans baggy</p>
              <div class="price-line">
                <span class="price-red">17,99 €</span>
                <span class="discount">-50%</span>
              </div>
              <p class="price-old">35,99 €</p>
            </div>
            <div class="right-icon">
              <img src="img/hearth-search-page.png" alt="cuoricino">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
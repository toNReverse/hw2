<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Profilo - Bershka Style</title>
    <link rel="stylesheet" href="{{ url('css/profile.css') }}">
    <link rel="stylesheet" href="{{ url('css/hw1.css') }}">
    <script src="{{ url('js/hw1.js') }}" defer></script>
    <script src="{{ url('js/cart-modal.js') }}" defer></script>
    <script src="https://js.stripe.com/v3/"></script>
    <script src="{{ url('js/checkout.js') }}" defer></script>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
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

    <!-- SIDE PAGE (ACCEDI, CARRELLO) **RIMOSSA**-->
  
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


  <section>
    <div class="profile-container">
        <aside class="sidebar">
            <h2>Ciao, {{ $userinfo['name'] }}!</h2>
            <p class="email">{{ $userinfo['email'] }}</p>
            <ul>
                <li>I miei acquisti</li>
                <li>Resi online</li>
                <li>Dati personali</li>
                <li>Indirizzi salvati</li>
                <li>I tuoi vantaggi MMBRS</li>
                <li>Saldo MMBRSS e movimenti</li>
            </ul>
            <a href="{{ url('logout') }}" class="logout">Chiudi la sessione</a>
        </aside>

        <main class="main-content">
            <h3>I miei acquisti</h3>

            <div class="order-box">
                <p class="status">Consegnato</p>
                <p class="date">Lo hai ricevuto giorno 24/01</p>
                <p class="price">45,98 €</p>
                <div class="order-images">
                    <img src="img/img-cart1.jpg" alt="Prodotto 1">
                    <img src="img/img-cart2.jpg" alt="Prodotto 2">
                </div>
            </div>

            <div class="guest-box">
                <h4>Hai effettuato l'acquisto come ospite?</h4>
                <p>Se non trovi il tuo ordine, probabilmente hai effettuato l'acquisto senza essere registrato.</p>
                <a href="#" class="find-order">Trovare un ordine &rarr;</a>
            </div>
        </main>
    </div>
  </section>

<!-- NAV -->
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
  <div class="search-container-page-log-sign">
    <img src="img/54481.png" alt="Search" class="search-icon">
    <input type="text" placeholder="CERCA" class="search-input-page">
  </div>

  <div class="product-card template hidden">
    <img class="product-image" />
    <div class="product-info">
      <div class="left-info">
        <p class="product-name"></p>
        <div class="price-line">
          <span class="product-price"></span>
          <span class="discount" style="display: none;"></span>
        </div>
        <p class="price-old" style="display: none;"></p>
      </div>
      <div class="right-icon">
        <img class="fav-icon" />
        <a class="cart-btn">
          <img class="cart-icon" />
        </a>
      </div>
    </div>
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


<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="{{ url('css/login.css') }}">
    <link rel="stylesheet" href="{{ url('css/hw1.css') }}">
    <script src="{{ url('js/signup.js') }}" defer></script>
    <script src="{{ url('js/hw1.js') }}" defer></script>
    <script src="{{ url('js/cart-modal.js') }}" defer></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="{{ url('favicon.png') }}">
    <meta charset="utf-8">
    <title>Iscriviti - BERSHKA</title>
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


      <div id="linksRIGHT">
        <div class="search-container">
            <img src="{{ url('img/54481.png') }}" alt="Search" class="search-icon"><span id="search-text">CERCA</span>
        </div>
        @auth
            <a href="{{ url('profile') }}" class="user-link">{{ Auth::user()->name }}</a>
        @else
            <a href="{{ url('login') }}" id="login">Accedi</a>
        @endauth

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
        <div class="cart-items hidden" id="cart-items-container"></div>

        <!-- Stato carrello vuoto -->
        <div class="cart-empty-content" id="cart-empty-content">
          <img src="img/nobg.png" alt="Cuore spezzato" class="broken-heart" />
          <h3>Carrello vuoto</h3>
          <p>Non hai ancora nessun articolo nel carrello: scopri tutto quello che abbiamo in serbo per te</p>
          <a href="{{ url('wishlist') }}" class="discover-btn">VAI AI PREFERITI</a>
        </div>
      </div>
    </div>

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
  <section class="signup-container">
    <div>
        <div id="logo-log"><a href="{{ url('/') }}">BERSHKA</a></div>
        <h5>Crea il tuo account BERSHKA.</h5>

        <form name="signup" method="post" enctype="multipart/form-data" autocomplete="off">
            @csrf

            <div class="name">
                <label for="name">Nome</label>
                <input type="text" name="name" value="{{ old('name') }}">
                <div><img src="{{ url('assets/close.svg') }}"/><span>Devi inserire il tuo nome</span></div>
            </div>

            <div class="email">
                <label for="email">Email</label>
                <input type="text" name="email" value="{{ old('email') }}">
                <div><img src="{{ url('assets/close.svg') }}"/><span>Indirizzo email non valido</span></div>
            </div>

            <div class="password">
                <label for="password">Password</label>
                <input type="password" name="password">
                <div><img src="{{ url('assets/close.svg') }}"/><span>Inserisci almeno 8 caratteri</span></div>
            </div>

            <div class="confirm_password">
                <label for="confirm_password">Conferma Password</label>
                <input type="password" name="confirm_password">
                <div><img src="{{ url('assets/close.svg') }}"/><span>Le password non coincidono</span></div>
            </div>

            <div class="allow"> 
                <input type="checkbox" name="allow" value="1" {{ old('allow') ? 'checked' : '' }}>
                <label for="allow">Accetto i termini e condizioni d'uso di BERSHKA.</label>
            </div>

            @if (isset($error))
                @foreach ($error as $err)
                    <div class="errorj"><span>{{ $err }}</span></div>
                @endforeach
            @endif

            @if ($errors->any())
                @foreach ($errors->all() as $err)
                    <div class="errorj"><span>{{ $err }}</span></div>
                @endforeach
            @endif

            <div class="submit-container">
                <div class="login-btn">
                    <input type="submit" value="ISCRIVITI">
                </div>
            </div>
        </form>

        <div class="signup">
            <h4>Hai già un account?</h4>
        </div>

        <div class="signup-btn-container">
            <a class="signup-btn" href="{{ url('login') }}">ACCEDI A BERSHKA</a>
        </div>
    </div>
</section>
<!-- SEARCH BAR -->
<div id="search-page">
    <div class="search-container-page-log-sign ">
    <img src="img/54481.png" alt="Search" class="search-icon">
      <input type="text" placeholder="CERCA" class="search-input-page">
    </div>
    <div class="top-search">
      <div class="top-search-tag">🔥 <span class="traslate">Body</span></div>
      <div class="top-search-tag">🔥 <span class="traslate">Top</span></div>
      <div class="top-search-tag">🔥 <span class="traslate">Felpe</span></div>
      <div class="top-search-tag">🔥 <span class="traslate">Camicia</span></div>
      <div class="top-search-tag">🔥 <span class="traslate">Borse</span></div>
    </div>
    <div class="top-search-suggest">
      <h3>Possiamo consigliarti</h3>
      <div class="product-container"> <!-- contenitore flex -->
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
</body>
</html>
// Funzione che carica gli articoli presenti nel carrello
function loadCartItems() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const emptyCartContainer = document.getElementById("cart-empty-content");

  // Chiedo al server la lista dei prodotti presenti nel carrello
  fetch("/fetch-cart")
    .then(res => res.json()) // Converto la risposta del server in un oggetto JavaScript
    .then(cartItems => {
      if (!cartItems || cartItems.length === 0) {
        cartItemsContainer.classList.add("hidden");
        emptyCartContainer.classList.remove("hidden");
        cartItemsContainer.innerHTML = "";
        return;
      }

      // Se ci sono articoli nel carrello, li mostro e nascondo il messaggio di carrello vuoto
      cartItemsContainer.innerHTML = "";
      cartItemsContainer.classList.remove("hidden");
      emptyCartContainer.classList.add("hidden");

      // Per ogni prodotto ricevuto dal server, creo un elemento HTML
      cartItems.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("cart-item");

        card.innerHTML = `
          <img src="${item.thumbnail}" alt="${item.title}" class="cart-item-image">
          <div class="cart-item-info">
            <p class="cart-item-title">${item.title}</p>
            <p class="cart-item-price">${parseFloat(item.price).toFixed(2)} €</p>
          </div>
          <button class="remove-cart-item-btn" data-title="${item.title}" aria-label="Rimuovi dal carrello">&times;</button>
        `;

        cartItemsContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Errore nel caricamento del carrello:", err);
      emptyCartContainer.classList.remove("hidden");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadCartItems();

  // Prendo il token CSRF dal meta tag
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  document.addEventListener("click", (e) => {
    // Rimuovo un articolo dal carrello
    if (e.target.classList.contains("remove-cart-item-btn")) {
      const title = e.target.dataset.title;

      // Invio una richiesta POST al server per rimuovere l'articolo dal carrello
      fetch("/remove-from-cart", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken
        },
        body: JSON.stringify({ title })
      })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          // Se la rimozione ha avuto successo, ricarico il carrello
          loadCartItems();

          const event = new CustomEvent("cart-item-removed", { detail: { title } });
          document.dispatchEvent(event);

        } else {
          alert("Errore nella rimozione dal carrello");
        }
      })
      .catch(() => alert("Errore nella comunicazione col server"));
    }
  });
});
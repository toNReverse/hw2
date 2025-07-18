function loadCartItems() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const emptyCartContainer = document.getElementById("cart-empty-content");
  const checkoutButton = document.getElementById("checkout-button");
  const template = cartItemsContainer.querySelector(".cart-item.template");

  fetch("/fetch-cart")
    .then(res => res.ok ? res.json() : [])
    .then(cartItems => {
      
      // rimuove tutti gli elementi del carrello tranne il template
      const cartElements = cartItemsContainer.children;
      for (let i = cartElements.length - 1; i >= 0; i--) {
        const cartElement = cartElements[i];
        if (!cartElement.classList.contains("template")) {
          cartElement.remove();
        }
      }

      // se il carrello è vuoto, mostra contenuto vuoto
      if (!cartItems || cartItems.length === 0) {
        cartItemsContainer.classList.add("hidden");
        emptyCartContainer.classList.remove("hidden");
        if (checkoutButton) checkoutButton.style.display = "none";
        return;
      }

      // se pieno, mostra il contenuto 
      cartItemsContainer.classList.remove("hidden");
      emptyCartContainer.classList.add("hidden");
      if (checkoutButton) checkoutButton.style.display = "";

      for (const item of cartItems) {
        const card = template.cloneNode(true); 
        card.classList.remove("template", "hidden");

        card.querySelector(".cart-item-image").src = item.thumbnail;
        card.querySelector(".cart-item-image").alt = item.title;
        card.querySelector(".cart-item-title").textContent = item.title;
        card.querySelector(".cart-item-price").textContent = `${parseFloat(item.price).toFixed(2)} €`;

        // Imposta id e titolo per il pulsante di rimozione 
        const removeBtn = card.querySelector(".remove-cart-item-btn");
        removeBtn.dataset.id = item.id;
        removeBtn.dataset.title = item.title;

        cartItemsContainer.appendChild(card);
      }
    })
    .catch(() => {
      cartItemsContainer.classList.add("hidden");
      emptyCartContainer.classList.remove("hidden");
      if (checkoutButton) checkoutButton.style.display = "none";
    });
}

// aggiorna l’icona del carrello usando il title come chiave per trovarlo nel DOM.
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

function refreshCartAndIcon(title) {
  loadCartItems();
  updateCartIcon(title);
}

document.addEventListener("DOMContentLoaded", () => {
  loadCartItems();

  const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
  const csrfToken = csrfTokenElement ? csrfTokenElement.getAttribute('content') : '';

  document.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-cart-item-btn")) {
      const productId = evento.target.dataset.id;
      const productTitle = evento.target.dataset.title;

      if (!productId) {
        alert("ID prodotto mancante. Impossibile rimuovere dal carrello.");
        return;
      }

      fetch("/remove-from-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken
        },
        body: JSON.stringify({ id: productId })
      })
        .then(response => response.json())
        .then(result => {
          if (result.ok) {
            refreshCartAndIcon(productTitle);
          } else {
            alert("Errore durante la rimozione dal carrello.");
          }
        })
        .catch(() => {
          alert("Errore nella comunicazione con il server.");
        });
    }
  });
});
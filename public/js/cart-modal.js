function loadCartItems() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const emptyCartContainer = document.getElementById("cart-empty-content");
  const checkoutButton = document.getElementById("checkout-button");
  const template = cartItemsContainer.querySelector(".cart-item.template");

  fetch("/fetch-cart")
    .then(res => res.ok ? res.json() : [])
    .then(cartItems => {
      // Pulisce il contenitore del carrello (escludendo il template)
      [...cartItemsContainer.children].forEach(child => {
        if (!child.classList.contains("template")) child.remove();
      });

      // Gestione carrello vuoto
      if (!cartItems || cartItems.length === 0) {
        cartItemsContainer.classList.add("hidden");
        emptyCartContainer.classList.remove("hidden");
        if (checkoutButton) checkoutButton.style.display = "none";
        return;
      }

      // Mostra contenuti carrello
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

        // Imposta id e title nel dataset del bottone rimuovi
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

  const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
  const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : '';

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-cart-item-btn")) {
      const id = e.target.dataset.id;
      const title = e.target.dataset.title;

      if (!id) {
        alert("ID mancante, impossibile rimuovere dal carrello.");
        return;
      }

      fetch("/remove-from-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken
        },
        body: JSON.stringify({ id })
      })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          refreshCartAndIcon(title);
        } else {
          alert("Errore nella rimozione dal carrello");
        }
      })
      .catch(() => {
        alert("Errore nella comunicazione col server");
      });
    }
  });
});
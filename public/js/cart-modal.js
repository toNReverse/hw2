function loadCartItems() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const emptyCartContainer = document.getElementById("cart-empty-content");
  const checkoutButton = document.getElementById("checkout-button");

  fetch("/fetch-cart")
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return res.json();
    })
    .then(cartItems => {
      if (!Array.isArray(cartItems)) {
        throw new Error("Formato dati non valido dal server");
      }

      if (cartItems.length === 0) {
        cartItemsContainer.classList.add("hidden");
        emptyCartContainer.classList.remove("hidden");
        cartItemsContainer.innerHTML = "";
        if (checkoutButton) checkoutButton.style.display = "none";  // Nascondi bottone se vuoto
        return;
      }

      cartItemsContainer.innerHTML = "";
      cartItemsContainer.classList.remove("hidden");
      emptyCartContainer.classList.add("hidden");
      if (checkoutButton) checkoutButton.style.display = "";  // Ripristina stile CSS originale (per centramento)

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
      console.error("Errore nel caricamento del carrello:", err.message);
      cartItemsContainer.innerHTML = "";
      cartItemsContainer.classList.add("hidden");
      emptyCartContainer.classList.remove("hidden");
      if (checkoutButton) checkoutButton.style.display = "none";  // Nascondi bottone in caso di errore
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadCartItems();

  const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
  const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : '';

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-cart-item-btn")) {
      const title = e.target.dataset.title;

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
            loadCartItems(); // Ricarica il carrello
            document.dispatchEvent(new CustomEvent("cart-item-removed", { detail: { title } }));
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
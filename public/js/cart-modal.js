function loadCartItems() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const emptyCartContainer = document.getElementById("cart-empty-content");
  const checkoutButton = document.getElementById("checkout-button");

  fetch("/fetch-cart")
    .then(res => res.ok ? res.json() : [])
    .then(cartItems => {
      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        cartItemsContainer.innerHTML = "";
        cartItemsContainer.classList.add("hidden");
        emptyCartContainer.classList.remove("hidden");
        if (checkoutButton) checkoutButton.style.display = "none";
        return;
      }

      // Se ci sono prodotti nel carrello
      cartItemsContainer.innerHTML = "";
      cartItemsContainer.classList.remove("hidden");
      emptyCartContainer.classList.add("hidden");
      if (checkoutButton) checkoutButton.style.display = "";

      cartItems.forEach(item => {
        const card = document.createElement("div");
        card.className = "cart-item";

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
      console.warn("Errore nel caricamento del carrello, mostro stato vuoto.");
      cartItemsContainer.innerHTML = "";
      cartItemsContainer.classList.add("hidden");
      emptyCartContainer.classList.remove("hidden");
      if (checkoutButton) checkoutButton.style.display = "none";
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
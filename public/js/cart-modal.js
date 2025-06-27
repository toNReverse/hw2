function loadCartItems() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const emptyCartContainer = document.getElementById("cart-empty-content");

  fetch("fetch-cart.php")
    .then(res => res.json())
    .then(cartItems => {
      if (!cartItems || cartItems.length === 0) {
        cartItemsContainer.classList.add("hidden");
        emptyCartContainer.classList.remove("hidden");
        cartItemsContainer.innerHTML = "";
        return;
      }

      cartItemsContainer.innerHTML = "";
      cartItemsContainer.classList.remove("hidden");
      emptyCartContainer.classList.add("hidden");

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

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-cart-item-btn")) {
      const title = e.target.dataset.title;

      fetch("remove-from-cart.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          // Ricarica il carrello dopo la rimozione
          loadCartItems();

          // Emetti evento custom per aggiornare icona nel search page
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
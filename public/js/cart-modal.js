function loadCartItems() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  const emptyCartContainer = document.getElementById("cart-empty-content");
  const checkoutButton = document.getElementById("checkout-button");
  const template = cartItemsContainer.querySelector(".cart-item.template");

  fetch("/fetch-cart")
    .then(res => res.ok ? res.json() : []) 
    .then(cartItems => {
      // Pulisce il contenitore del carrello
      const children = [...cartItemsContainer.children];
      for (let child of children) {
        if (!child.classList.contains("template")) {
          child.remove();
        }
      }

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

      for (let item of cartItems) {
        const card = template.cloneNode(true);  // Duplica un nodo del DOM per caricare ogni elemento del carrello (true per clonare anche i figli)
        card.classList.remove("template", "hidden");

        card.querySelector(".cart-item-image").src = item.thumbnail;
        card.querySelector(".cart-item-image").alt = item.title;
        card.querySelector(".cart-item-title").textContent = item.title;
        card.querySelector(".cart-item-price").textContent = `${parseFloat(item.price).toFixed(2)} €`;
        card.querySelector(".remove-cart-item-btn").dataset.title = item.title;

        cartItemsContainer.appendChild(card);
      }
    })
    .catch(() => {
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
            loadCartItems(); // Ricarica carrello
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
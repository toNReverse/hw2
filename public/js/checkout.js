document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".checkout-button");
  if (!button) return;

  button.addEventListener("click", function (e) {
    e.preventDefault();

    fetch("/checkout/session", {
      method: "POST",
      headers: {
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id && data.publicKey) {
          const stripe = Stripe(data.publicKey); // Chiave pubblica ricevuta dal controller
          stripe.redirectToCheckout({ sessionId: data.id });
        } else {
          console.error("Errore lato server:", data.error || "Session ID mancante");
        }
      })
      .catch((error) => {
        console.error("Errore durante il pagamento:", error);
      });
  });
});
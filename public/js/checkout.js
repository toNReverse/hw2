document.addEventListener("DOMContentLoaded", function () { // aspetto il DOM sia completamente caricato
  const button = document.querySelector(".checkout-button");
  if (!button) return;

  button.addEventListener("click", function (evento) {
    evento.preventDefault(); // Previene il comportamento predefinito

    fetch("/checkout/session", {
      method: "POST",
      headers: {
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
        "Content-Type": "application/json"
      }
    })  
    .then((response) => response.json())
    .then((data) => {
      if (data.id && data.publicKey) { 
        const stripe = Stripe(data.publicKey);  // Inizializza Stripe
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
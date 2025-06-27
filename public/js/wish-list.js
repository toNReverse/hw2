document.addEventListener('DOMContentLoaded', () => {
  
  // Recupera la lista dei preferiti dal server (file PHP)
  fetch('load-favorites.php')
    .then(response => response.json()) // Converte la risposta in formato JSON
    .then(json => {
      // Seleziona il contenitore dove verranno mostrati i preferiti
      const container = document.getElementById('wl-favorites-container');

      // Se non ci sono prodotti nei preferiti, mostra un messaggio
      if (json.length === 0) {
        container.innerHTML = "<p>Nessun prodotto nei preferiti.</p>";
        return;
      }

      // Per ogni prodotto ricevuto dal server...
      json.forEach(product => {
        // Crea un nuovo div per la card del prodotto
        const card = document.createElement('div');
        card.classList.add('wl-card'); // Aggiunge la classe CSS

        // Inserisce l'HTML del prodotto all'interno della card
        card.innerHTML = `
          <div class="wl-image-wrapper">
            <img src="${product.thumbnail}" alt="${product.title}" class="wl-product-image" />
          </div>
          <div class="wl-info">
            <div class="wl-name">${product.title}</div>
            <div class="wl-price-heart">
              <div class="wl-price">${parseFloat(product.price).toFixed(2)} €</div>
              <img src="img/filled-hearth-search-page.png" alt="Cuore" class="wl-heart" data-id="${product.id}" />
            </div>
          </div>
        `;

        // Aggiunge la card al contenitore
        container.appendChild(card);
      });

      // Aggiunge il listener a tutti i cuori presenti per gestire la rimozione
      const hearts = document.querySelectorAll('.wl-heart');
      hearts.forEach(heart => {
        heart.addEventListener('click', () => {
          const id = heart.getAttribute('data-id'); // Ottiene l'id del prodotto
          removeFavorite(id); // Rimuove il prodotto dal database

          // Rimuove la card visivamente dalla pagina
          heart.closest('.wl-card').remove();

          // Se non ci sono più preferiti, mostra il messaggio
          if (container.children.length === 0) {
            container.innerHTML = "<p>Non hai più preferiti.</p>";
          }
        });
      });

    })
    // In caso di errore nel recupero dei dati, lo mostra in console
    .catch(error => {
      console.error('Errore nel caricamento dei preferiti:', error);
    });
});

// Funzione che invia una richiesta POST per rimuovere un prodotto dai preferiti
function removeFavorite(id) {
  fetch("remove-product.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // Specifica il tipo di contenuto
    body: JSON.stringify({ id }), // Invia l'ID del prodotto in formato JSON
  })
  .then(r => r.json()) // Converte la risposta
  .then(data => {
    // Se il server risponde con un errore, mostra un alert
    if (!data.ok) alert("Errore nella rimozione: " + (data.error || "sconosciuto"));
  })
  // In caso di errore nella richiesta, mostra un alert
  .catch(() => alert("Errore nella rimozione"));
}
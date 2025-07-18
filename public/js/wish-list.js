document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('wl-favorites-container');
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const hearts = container.querySelectorAll('.wl-heart');
  for (let heart of hearts) {
    heart.addEventListener('click', () => {
      const id = heart.dataset.id;
      const card = heart.closest('.wl-card');

      fetch('/remove-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({ id })
      })
      .then(res => res.json())  // converto la risposta del server in JSON.
      .then(data => {
        if (data.ok) {
          card.remove();

          // se non ci sono più card, ricarica la pagina per far scattare @empty di Blade
          if (container.querySelectorAll('.wl-card').length === 0) {
            location.reload();
          }
        } else {
          alert('Errore nella rimozione: ' + (data.error || 'Errore sconosciuto'));
        }
      })
      .catch(() => alert('Errore nella rimozione'));
    });
  }
});
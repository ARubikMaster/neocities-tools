function loadVisitorCount() {
    const countEl = document.getElementById('stats-count');
    if (!countEl) return;

    // Replace 'epiccooldog' with your actual GoatCounter username
    fetch('https://api.cors.lol/?url=neocities.org/api/info?sitename=epiccooldog')
        .then(response => {
            if (!response.ok) throw new Error('CSP or Blocked');
            return response.json();
        })
        .then(data => {
            // padStart(6, '0') makes it look like 000042
            countEl.innerText = data.views.toString().padStart(6, '0');
        })
        .catch(err => {
            console.error('Counter Error:', err);
            countEl.innerText = "ACCESS_DENIED!"; 
            countEl.style.color = "red"; // Optional: show error in red
        });
}

// Run when the page is ready
window.addEventListener('load', loadVisitorCount);
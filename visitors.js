function loadVisitorCount() {
    const countEl = document.getElementById('stats-count');
    if (!countEl) return;

    // Cache-Busting: Append a unique timestamp (?t=...) to the URL
    // This tells the browser: "Do not use the old version of this data"
    const cacheBuster = new Date().getTime();
    const apiUrl = `https://epiccooldog.goatcounter.com/counter/TOTAL.json?t=${cacheBuster}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error('CSP_OR_BLOCKED');
            return response.json();
        })
        .then(data => {
            // Success: Format number with leading zeros (e.g., 000042)
            countEl.innerText = data.count.toString().padStart(6, '0');
            countEl.style.color = ""; // Reset to original terminal green
        })
        .catch(err => {
            console.error('Counter Error:', err);
            // Retro terminal error style
            countEl.innerText = "ACCESS_DENIED: CHECK_ADBLOCKER"; 
            countEl.style.color = "red";
        });
}

// Ensure it runs once the window is ready
window.addEventListener('load', loadVisitorCount);
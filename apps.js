function visit() {
    const inputUrl = document.getElementById('urlInput').value;
    const proxyUrl = `/service/${encodeURIComponent(inputUrl)}`;
    const proxyFrame = document.getElementById('proxyFrame');
    proxyFrame.src = proxyUrl;
}

fetch('/service/apps.json') // Assuming apps.json is in the /service/ directory
    .then(response => response.json())
    .then(data => {
        const apps = data;

        function displayApps() {
            const appsContainer = document.querySelector('.apps-section');

            apps.forEach(app => {
                const appLink = document.createElement('a');
                appLink.href = '#';
                appLink.textContent = app.name;
                appsContainer.appendChild(appLink);

                appLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    const proxyUrl = `/service/${encodeURIComponent(app.url)}`;
                    const proxyFrame = document.getElementById('proxyFrame');
                    proxyFrame.src = proxyUrl;
                });
            });
        }

        displayApps();
    })
    .catch(error => console.error('Error fetching apps data:', error));

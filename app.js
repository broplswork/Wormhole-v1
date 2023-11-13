const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const url = require('url'); // Import the 'url' module for URL validation

const app = express();

// Create a proxy middleware
const proxyMiddleware = createProxyMiddleware({
  changeOrigin: true, // Needed for virtual hosted sites
});

// Use the proxy middleware for all routes under /search
app.use('/search', (req, res) => {
  const targetUrl = req.query.url;

  // Validate the user-input URL
  if (!isValidUrl(targetUrl)) {
    res.status(400).send('Invalid URL');
    return;
  }

  // Proxy the request to the specified URL
  proxyMiddleware(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Proxy error');
    }
  });
});

// Serve static files from the public directory
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up the default route
app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Function to validate a URL
function isValidUrl(userInput) {
  try {
    const parsedUrl = new URL(userInput);
    // Add more validation if needed
    return true;
  } catch (error) {
    return false;
  }
}

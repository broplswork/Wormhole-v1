const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Define the target URL to proxy requests to
const targetUrl = 'http://www.example.com';

// Create a proxy middleware
const proxyMiddleware = createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true, // Needed for virtual hosted sites
  pathRewrite: {
    [`^/proxy`]: '', // Remove the /proxy prefix when forwarding requests
  },
});

// Use the proxy middleware
app.use('/proxy', proxyMiddleware);

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Set up the default route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

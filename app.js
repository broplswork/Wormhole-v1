const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// Replace the target URL with the new proxy link
const targetUrl = 'https://www.google.com/?safe=active&ssui=on';

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

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (e.g., CSS, JS)
app.use(express.static('public'));

// Set up the default route
app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


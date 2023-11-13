const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

const proxyMiddleware = createProxyMiddleware({
  changeOrigin: true,
});

app.use('/search', (req, res) => {
  const targetUrl = req.query.url;
  const searchEngine = req.query.engine || 'google';

  if (!isValidUrl(targetUrl)) {
    res.status(400).send('Invalid URL');
    return;
  }

  let target = '';
  if (searchEngine === 'bing') {
    target = 'https://www.bing.com/search?q=';
  } else {
    target = 'https://www.google.com/search?q=';
  }

  req.url = target + encodeURIComponent(targetUrl);
  proxyMiddleware(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Proxy error');
    }
  });
});

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  res.render('index');
});

function isValidUrl(userInput) {
  try {
    const parsedUrl = new URL(userInput);
    return true;
  } catch (error) {
    return false;
  }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

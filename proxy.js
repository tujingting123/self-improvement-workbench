// 微信读书 API 代理（解决 CORS）
const http = require('http');
const https = require('https');

const WEREAD_API_KEY = 'wrk-WCFUA3ijTlSB61zr90b04AAA';
const WEREAD_API_URL = 'https://i.weread.qq.com/api/agent/gateway';
const PROXY_PORT = 8001;

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/weread') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const parsedUrl = new URL(WEREAD_API_URL);
      const options = {
        hostname: parsedUrl.hostname,
        port: 443,
        path: parsedUrl.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WEREAD_API_KEY}`,
          'Content-Length': Buffer.byteLength(body)
        }
      };

      const proxyReq = https.request(options, proxyRes => {
        let data = '';
        proxyRes.on('data', chunk => data += chunk);
        proxyRes.on('end', () => {
          res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(data);
        });
      });

      proxyReq.on('error', err => {
        res.writeHead(502, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ errcode: -1, errmsg: '代理请求失败: ' + err.message }));
      });

      proxyReq.write(body);
      proxyReq.end();
    });
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PROXY_PORT, '0.0.0.0', () => {
  console.log(`WeRead proxy running on port ${PROXY_PORT}`);
});

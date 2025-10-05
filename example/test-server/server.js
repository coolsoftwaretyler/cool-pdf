const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log all requests
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  console.log('\n' + '='.repeat(60));
  console.log(`📨 Request received at ${timestamp}`);
  console.log(`🔧 Method: \x1b[1m\x1b[36m${method}\x1b[0m`);
  console.log(`🔗 URL: ${url}`);
  console.log(`📋 Headers:`, JSON.stringify(req.headers, null, 2));
  console.log('='.repeat(60) + '\n');

  next();
});

// Serve the PDF file
app.all('/sample.pdf', (req, res) => {
  const pdfPath = path.join(__dirname, 'sample.pdf');

  if (!fs.existsSync(pdfPath)) {
    console.error('❌ Error: sample.pdf not found at', pdfPath);
    return res.status(404).send('PDF file not found');
  }

  console.log('✅ Serving sample.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(pdfPath);
});

// Serve the password-protected PDF file
app.all('/password-protected.pdf', (req, res) => {
  const pdfPath = path.join(__dirname, 'password-protected.pdf');

  if (!fs.existsSync(pdfPath)) {
    console.error('❌ Error: password-protected.pdf not found at', pdfPath);
    return res.status(404).send('PDF file not found');
  }

  console.log('✅ Serving password-protected.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(pdfPath);
});

// Root endpoint
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>PDF Test Server</h1>
        <p>Server is running on port ${PORT}</p>
        <p>PDFs available:</p>
        <ul>
          <li><a href="/sample.pdf">/sample.pdf</a></li>
          <li><a href="/password-protected.pdf">/password-protected.pdf</a> (password: "test123")</li>
        </ul>
        <p>This server logs all HTTP methods and headers to the console.</p>
      </body>
    </html>
  `);
});

// Get local network IP address
const os = require('os');
function getLocalNetworkIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

app.listen(PORT, '0.0.0.0', () => {
  const localIP = getLocalNetworkIP();

  console.log('\n' + '🚀'.repeat(30));
  console.log(`🌟 PDF Test Server running`);
  console.log(`\n📱 Use these URLs in your app:\n`);
  console.log(`   Sample PDF:`);
  console.log(`     iOS Simulator:     http://localhost:${PORT}/sample.pdf`);
  console.log(`     Android Emulator:  http://10.0.2.2:${PORT}/sample.pdf`);
  console.log(`     Physical Device:   http://${localIP}:${PORT}/sample.pdf`);
  console.log(`\n   Password-Protected PDF (password: "test123"):`);
  console.log(`     iOS Simulator:     http://localhost:${PORT}/password-protected.pdf`);
  console.log(`     Android Emulator:  http://10.0.2.2:${PORT}/password-protected.pdf`);
  console.log(`     Physical Device:   http://${localIP}:${PORT}/password-protected.pdf`);
  console.log(`\n👀 Watching for HTTP requests...`);
  console.log('🚀'.repeat(30) + '\n');
});

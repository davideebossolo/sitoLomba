const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Middleware per il parsing del corpo delle richieste
app.use(express.json());

// Servire file statici dalla cartella public
app.use(express.static(path.join(__dirname, 'public')));

// Route principale
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Avvio del server
app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});

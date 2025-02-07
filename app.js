const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8080;

// Connessione a MongoDB
mongoose.connect('mongodb+srv://davideebossolo:ce3rKHjSClBxdx7u@cluster1.dgwrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1/sponsorsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connesso a MongoDB"))
  .catch(err => console.error("❌ Errore connessione MongoDB:", err));

// Definizione del modello Sponsor
const Sponsor = mongoose.model('Sponsor', new mongoose.Schema({
    nome: String,
    cognome: String,
    telefono: String,
    email: String
}));

// Middleware per il parsing JSON e per file statici
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint per servire la pagina principale
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint per ricevere i dati dal form
app.post('/sponsor', async (req, res) => {
    try {
        const { nome, cognome, telefono, email } = req.body;

        // Creazione e salvataggio del nuovo sponsor
        const nuovoSponsor = new Sponsor({ nome, cognome, telefono, email });
        await nuovoSponsor.save();

        res.status(201).json({ message: "✅ Sponsor registrato con successo!", sponsor: nuovoSponsor });
    } catch (error) {
        res.status(500).json({ message: "❌ Errore nel salvataggio", error });
    }
});

// Avvio del server
app.listen(port, () => {
    console.log(`🚀 Server in esecuzione su http://localhost:${port}`);
});

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Endpoint pour recevoir les URLs
app.post('/submit', (req, res) => {
    const url = req.body.url;

    // Simuler l'ajout à une base de données (ici, on écrit dans un fichier JSON)
    fs.readFile('data.json', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de lecture de la base de données.' });
        }

        let db = JSON.parse(data);
        db.urls.push(url);

        fs.writeFile('data.json', JSON.stringify(db), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur d\'écriture dans la base de données.' });
            }

            res.json({ message: 'URL reçue avec succès!' });
        });
    });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
})

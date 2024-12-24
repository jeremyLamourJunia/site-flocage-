import express from 'express';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Endpoint pour recevoir la commande
app.post('/api/order', upload.array('logos'), async (req, res) => {
  try {
    const { orderData } = req.body;
    const files = req.files;
    
    console.log('Données de la commande reçues:', JSON.parse(orderData));
    console.log('Fichiers reçus:', files);

    // Création du FormData pour l'envoi à l'API externe
    const formData = new FormData();
    formData.append('orderData', orderData);
    
    // Ajout des fichiers
    if (files) {
      files.forEach((file, index) => {
        formData.append('logos', fs.createReadStream(file.path), file.originalname);
      });
    }

    // Envoi à l'API externe
    const response = await axios.post('https://api-flocage.vercel.app/order', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Nettoyage des fichiers temporaires
    if (files) {
      files.forEach(file => {
        fs.unlinkSync(file.path);
      });
    }

    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors du traitement de la commande:', error);
    res.status(500).json({ error: 'Erreur lors du traitement de la commande' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
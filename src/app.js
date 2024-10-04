import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Trop de requêtes, réessayez plus tard."
});
app.use(limiter);

const corsOptions = {
  origin: 'http://localhost:3000', 
};
app.use(cors(corsOptions));

const API_KEY = 'votre-api-key-secrete'; 

function apiKeyMiddleware(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ message: 'Accès non autorisé, clé API manquante ou incorrecte.' });
  }

  next(); 
}

app.get('/api/private-data', apiKeyMiddleware, (req, res) => {
  res.json({ message: 'Voici vos données privées' });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello world' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

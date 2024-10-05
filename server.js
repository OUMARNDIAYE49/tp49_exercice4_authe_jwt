import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json()); // Pour analyser les données JSON dans les requêtes

const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: bcrypt.hashSync('password123', 8), // Mot de passe haché (pour simplification)
  }
];

const secretKey = 'votre-cle-secrete'; // Vous devriez stocker cela dans une variable d'environnement pour plus de sécurité

// Route POST /api/login pour l'authentification et génération de JWT
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'utilisateur existe
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }

  // Vérifier le mot de passe
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }

  // Générer un token JWT
  const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
  return res.json({ token });
});

// Middleware pour vérifier le JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extraire le token depuis les headers

  if (!token) {
    return res.status(403).json({ message: 'Accès interdit. Token manquant.' });
  }

  // Vérifier la validité du token
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide.' });
    }
    req.user = user;
    next();
  });
};

// Route GET /api/new-private-data pour les utilisateurs authentifiés
app.get('/api/new-private-data', authenticateJWT, (req, res) => {
  res.json({ message: 'Voici vos nouvelles données privées.' });
});

// Démarrage du serveur
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

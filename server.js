const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3030;
// Middleware per parsejar el cos de les sol·licituds a JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connecta't a MongoDB (modifica l'URI amb la teva pròpia cadena de connexió)
mongoose.connect('mongodb+srv://joelortizrivas:aa1234aa@castellet.uxh5e.mongodb.net/?retryWrites=true&w=majority&appName=Castellet', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

  const caracteristiquesSchema = new mongoose.Schema({
    longitud: String,
    pes: String,
    esperança_de_vida: String,
  });

// Definició del model de dades
const animalSchema = new mongoose.Schema({
  nom_comu: String,
  nom_cientific: String,
  descripcio: String,
  habitat: String,
  dieta: String,
  comportament: String,
  caracteristiques: caracteristiquesSchema,
  data_creacio: String,
});

const Animal = mongoose.model('animals', animalSchema);


app.post('/animals', async (req, res) => {
  /// res.status(200).json(req.body);
  // Check if request body is empty and fill with default values
  if (!req.body.nom_comu || !req.body.nom_cientific || !req.body.descripcio || !req.body.habitat || !req.body.dieta || !req.body.comportament || !req.body.caracteristiques || !req.body.data_creacio) {
    req.body.nom_comu = req.body.nom_comu || "err";
    req.body.nom_cientific = req.body.nom_cientific || "err";
    req.body.descripcio = req.body.descripcio || "err";
    req.body.habitat = req.body.habitat || "err";
    req.body.dieta = req.body.dieta || "err";
    req.body.comportament = req.body.comportament || "err";
    req.body.caracteristiques = req.body.caracteristiques || "err";
    req.body.data_creacio = req.body.data_creacio || "err";
  }

  try {
    const animal = new animal({ nom_comu: req.body.nom_comu, nom_cientific: req.body.nom_cientific, descripcio: req.body.descripcio, habitat: req.body.habitat, dieta: req.body.dieta, comportament: req.body.comportament, caracteristiques: req.body.caracteristiques, data_creacio: req.body.data_creacio });
    await animal.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error creating animal', error: err.message });
  }
});


// Ruta per obtenir tots els usuaris
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// Ruta per obtenir un usuari per ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
});

// Ruta per actualitzar un usuari per ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user', error: err.message });
  }
});

// Ruta per eliminar un usuari per ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
});

// Inicia el servidorxºxºz  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

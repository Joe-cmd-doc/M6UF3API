const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3030;
// Middleware per parsejar el cos de les sol·licituds a JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connecta't a MongoDB (modifica l'URI amb la teva pròpia cadena de connexió)
mongoose.connect('mongodb+srv://joelortizrivas:aa1234aa@castellet.uxh5e.mongodb.net/Fauna?retryWrites=true&w=majority&appName=Castellet', { useNewUrlParser: true, useUnifiedTopology: true })
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


app.post('/add', async (req, res) => {
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
    const animal = new Animal({ nom_comu: req.body.nom_comu, nom_cientific: req.body.nom_cientific, descripcio: req.body.descripcio, habitat: req.body.habitat, dieta: req.body.dieta, comportament: req.body.comportament, caracteristiques: req.body.caracteristiques, data_creacio: req.body.data_creacio });
    await animal.save();
    res.status(201).json(animal);
  } catch (err) {
    res.status(400).json({ message: 'Error creating animal', error: err.message });
  }
});


// Ruta per obtenir tots els animals
app.get('/list', async (req, res) => {
  try {
    const animal = await Animal.find();
    res.status(200).json(animal);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});



// Ruta per obtenir un usuari per ID
 app.get('/list/:datainici/:datafi', async (req, res) => {
  const { datainici, datafi} = req.params;
   try {
     const animals = await Animal.find({ data_creacio: { $gte: datainici, $lte: datafi } });
    if (!animals) {
      return res.status(404).json({ message: 'Animals not found' });
    }
     res.status(200).json(animals);
   } catch (err) {
     res.status(500).json({ message: 'Error fetching animals', error: err.message });
   }
 });

 app.get('/', async (req, res) => {
  res.send('API de fauna');
 });




// Inicia el servidorxºxºz  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

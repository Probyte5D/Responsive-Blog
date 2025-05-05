// importo express 
const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");

// importo il file delle rotte
const commentRoutes = require('../routes/commentRoutes');

// file statici cartella public
app.use(express.static('public'));


// CORS
app.use(cors());

// registro il body-parser
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server del mio blog")
})

// richiamo il file delle rotte
app.use("/routes", commentRoutes)

app.use('/api/comments', commentRoutes);

app.listen(port, () => {
    console.log(`Esempio di applicazione in ascolto sulla porta ${port}`)
})
const express = require('express');
const cors = require('cors');
const joyasRoutes = require('./routes/joyas');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/joyas', joyasRoutes);


// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
  });


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.Routes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en servidor!');
});

app.listen(3000, () => console.log("SERVIDOR ENCENDIDO"));

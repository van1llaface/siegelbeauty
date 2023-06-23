const mongoose = require("mongoose");
const app = require("./app");

const mongoURI =
  "mongodb+srv://arnoldas:student@arnoldascluster.lc6rosf.mongodb.net/foodApp?retryWrites=true&w=majority";

mongoose.connect(mongoURI).then(console.log("DB connection established."));

const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

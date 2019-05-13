const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors');
const db = require('./models/index');

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());

require("./routes/routes.index")(app);

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
  });
});

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors');
const db = require('./models/index');
const keys = require('./config/keys')
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${keys.storage}/`)
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date().getTime()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })
const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());

require("./routes/routes.index")({ app, upload });

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
  });
});

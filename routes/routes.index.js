const { authenticate } = require("../middlewares/auth.middleware");

module.exports = ({ app, upload }) => {
  app.use("/api/v1/u", upload.array(), require("./routes.unauth"));
  app.use("/api/v1/a", authenticate, require("./routes.auth"));
  app.use("/api/v1/admin", upload.single('image'), authenticate, require("./routes.admin"));
};

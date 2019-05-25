const { authenticate } = require("../middlewares/auth.middleware");

module.exports = ({ app, upload }) => {
  app.use("/api/v1/u", require("./routes.unauth"));
  app.use("/api/v1/a", authenticate, require("./routes.auth"));
  app.use("/api/v1/admin", require("./routes.admin")); //upload.single is image
};

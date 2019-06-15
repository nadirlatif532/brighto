const { authenticate, isAdmin } = require("../middlewares/auth.middleware");

module.exports = ({ app, upload }) => {
  app.use("/api/v1/u", upload.array(), require("./routes.unauth"));
  app.use("/api/v1/a", authenticate, upload.array(), require("./routes.auth"));
  app.use("/api/v1/admin", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]), authenticate, isAdmin, require("./routes.admin"));
};

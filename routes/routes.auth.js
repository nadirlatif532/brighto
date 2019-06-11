const express = require("express");
const auth = express.Router();

auth.use("/family", require("./routes.family"));
auth.use("/products", require("./routes.products"));
auth.use("/product", require("./routes.product"));
auth.use("/shades", require("./routes.shades"));
auth.use("/shade", require("./routes.shade"));
auth.use("/pallet", require("./routes.pallet"));
auth.use("/color-trends", require("./routes.colorTrend"));
auth.use("/city", require("./routes.city"));
auth.use("/country", require("./routes.country"));
auth.use("/category", require("./routes.category"));
auth.use("/project-type", require("./routes.projectType"));
auth.use("/surface", require("./routes.surface"));
auth.use("/finish-type", require("./routes.finishType"));
auth.use("/dealer", require("./routes.dealer"));
auth.use("/favourite", require("./routes.favourite"));
auth.use("/order", require("./routes.order"));

module.exports = auth;

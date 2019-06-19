const express = require("express");
const favorite = express.Router();
const FavouriteRoutes = require("../controllers/favorite.controller");

favorite
  .post("/pallets/like", FavouriteRoutes.likePallete)
  .post("/shade/like", FavouriteRoutes.likeShade)
  .post("/products/like", FavouriteRoutes.likeProduct)

  .post("/pallets/unlike", FavouriteRoutes.unlikePallete)
  .post("/shade/unlike", FavouriteRoutes.unlikeShade)
  .post("/products/unlike", FavouriteRoutes.unlikeProduct)

  .get("/products", FavouriteRoutes.getLikedProducts)
  .get("/shades", FavouriteRoutes.getLikedShades)
  .get("/pallets", FavouriteRoutes.getLikedPallets);
module.exports = favorite;

const express = require("express");
const favorite = express.Router();
const FavouriteRoutes = require("../controllers/favorite.controller");

favorite
  .post("/pallets/like", FavouriteRoutes.likePallete)
  .post("/shades/like",FavouriteRoutes.likeShade)
  .post("/products/like",FavouriteRoutes.likeProduct)

  .post("/pallets/unlike", FavouriteRoutes.unlikePallete)
  .post("/shades/unlike", FavouriteRoutes.unlikeShade)
  .post("/products/unlike", FavouriteRoutes.unlikeProduct)

  .post("/products",FavouriteRoutes.getLikedProducts)
  .post("/shades",FavouriteRoutes.getLikedShades)
  .post("/pallets",FavouriteRoutes.getLikedPallets);
module.exports = favorite;

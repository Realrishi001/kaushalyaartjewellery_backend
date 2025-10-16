import { sequelizeCon, DataTypes } from "../init/dbConnection.js";

const BestSeller = sequelizeCon.define(
  "bestsellers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bestSellerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bestSellerDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    bestSellerImage: {
      type: DataTypes.STRING,
      allowNull: true, // ✅ Optional main image for the bestseller category
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productImages: {
      type: DataTypes.JSON, // ✅ stores multiple image URLs
      allowNull: true,
    },
    realPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    discountPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    polishType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aboutProduct: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export { BestSeller };

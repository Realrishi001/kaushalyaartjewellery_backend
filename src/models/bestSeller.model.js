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
      allowNull: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productImages: {
      type: DataTypes.JSON,
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
    quantityAvailable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // ✅ New stock tracking column
    },
  },
  {
    timestamps: true,
  }
);

export { BestSeller };

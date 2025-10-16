import { sequelizeCon, DataTypes } from "../init/dbConnection.js";

const Accessory = sequelizeCon.define(
  "accessories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    accessoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessoryDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    accessoryImage: {
      type: DataTypes.STRING,
      allowNull: true, // ✅ new field for accessory category image
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    productImage: {
      type: DataTypes.STRING,
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

export { Accessory };

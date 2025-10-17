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
      allowNull: true,
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
    quantityAvailable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // ✅ Default stock count
    },
  },
  {
    timestamps: true,
  }
);

export { Accessory };

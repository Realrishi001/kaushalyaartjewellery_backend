import { sequelizeCon, DataTypes } from "../init/dbConnection.js";

const Catalog = sequelizeCon.define(
  "catalogs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    catalogName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    catalogDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    catalogImage: {
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
      defaultValue: 0, // ✅ New field for available quantity
    },
  },
  {
    timestamps: true,
  }
);

export { Catalog };

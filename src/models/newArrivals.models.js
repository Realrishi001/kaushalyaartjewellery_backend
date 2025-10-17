import { sequelizeCon, DataTypes } from "../init/dbConnection.js";

const NewArrival = sequelizeCon.define(
  "new_arrivals",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    quantityAvailable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // ✅ New field for stock tracking
    },
  },
  {
    timestamps: true,
  }
);

export { NewArrival };

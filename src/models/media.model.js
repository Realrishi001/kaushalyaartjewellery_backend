import { sequelizeCon, DataTypes } from "../init/dbConnection.js";

const Media = sequelizeCon.define(
  "media",
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
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, 
  }
);

export { Media };

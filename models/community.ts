import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/connection";
import { ICommunity } from "../types/interfaces";
import UnitSchema from "./unit";
import { User } from "@next-auth/sequelize-adapter/dist/models";

const CommunitySchema = sequelize.define<Model<ICommunity>>("community", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

CommunitySchema.hasMany(UnitSchema, { onDelete: "CASCADE" });

export default CommunitySchema;
